/*global chrome*/
import { getCachedValue, setCachedValue, CACHED_KEYS } from "./CacheAPI";
import { getAuthToken } from './identityAuthToken';
export async function idToPhotoUrl(id, mustBeFresh) {
    //TODO: Double check any url that we have cached. Fetch and if we get 403 then google photos is awful and we need to refetch despite the fact that it hasnt even been an hour???????

    if (!id) return "";
    const cachedUrl = await getCachedValue(`CACHED_URL_${id}`, true);
    let url = cachedUrl.value;
    if (cachedUrl.expired || !cachedUrl.value) {
        const updatePromise = new Promise(async (res) => {
            const token = await getAuthToken();
            let req = await fetch(`https://photoslibrary.googleapis.com/v1/mediaItems/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            req = await req.json();
            url = req.baseUrl;
            setCachedValue(`CACHED_URL_${id}`, url, .5);
            res();
        });
        if (!cachedUrl.value || mustBeFresh) {
            await updatePromise;
        }
    }
    return url;
}
export async function getAllAlbums() {
    const cachedAlbum = await getCachedValue(CACHED_KEYS.GOOGLE_ALBUMS, true);
    if (cachedAlbum.expired || !cachedAlbum.value) {
        const token = await getAuthToken();
        const getSharedAlbumPromise = new Promise(async (res) => {
            let req;
            let nextPageToken = "";

            do {
                req = await fetch(
                    `https://photoslibrary.googleapis.com/v1/albums?pageSize=50&pageToken=${nextPageToken}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                        method: "GET"
                    }
                );

                req = await req.json();
                if (!cachedAlbum.value) cachedAlbum.value = [];
                cachedAlbum.value = cachedAlbum.value.concat(req.albums);
                nextPageToken = req.nextPageToken;
            } while (nextPageToken);
            res();
        });
        const getAlbumPromise = new Promise(async (res) => {
            let req;
            let nextPageToken = "";

            do {
                req = await fetch(
                    `https://photoslibrary.googleapis.com/v1/sharedAlbums?pageSize=50&pageToken=${nextPageToken}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                        method: "GET"
                    }
                );

                req = await req.json();
                if (!cachedAlbum.value) cachedAlbum.value = [];
                cachedAlbum.value = cachedAlbum.value.concat(req.sharedAlbums);
                nextPageToken = req.nextPageToken;
            } while (nextPageToken);
            res();
        });
        const allAlbumsPromise = new Promise((res) => {
            Promise.all([getSharedAlbumPromise, getAlbumPromise]).then(() => {
                //Remove any duplicate id's
                cachedAlbum.value = cachedAlbum.value.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
                //Remove any blank titles
                cachedAlbum.value = cachedAlbum.value.filter((v, i, a) => v.title);


                setCachedValue(CACHED_KEYS.GOOGLE_ALBUMS, cachedAlbum.value, 1);
                res();
            })
        })
        if (!cachedAlbum.value) {
            await allAlbumsPromise;
        };
    }
    return cachedAlbum.value;
}

export async function getAlbumContents(albumId) {
    const CACHE_KEY = `CACHED_ALBUM_${albumId}}`;
    const cachedAlbum = await getCachedValue(CACHE_KEY, true);
    if (cachedAlbum.expired || !cachedAlbum.value) {
        const token = await getAuthToken();
        const getAlbumContentsPromise = new Promise(async (res) => {
            let req;
            let nextPageToken = "";

            do {
                req = await fetch(
                    `https://photoslibrary.googleapis.com/v1/mediaItems:search?pageSize=100&pageToken=${nextPageToken}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                        method: "POST",
                        body: JSON.stringify({
                            albumId: albumId
                        })
                    }
                );

                req = await req.json();
                if (!cachedAlbum.value) cachedAlbum.value = [];
                cachedAlbum.value = cachedAlbum.value.concat(req.mediaItems);
                nextPageToken = req.nextPageToken;
            } while (nextPageToken);
            cachedAlbum.value = cachedAlbum.value.filter(x => x).map((x) => {
                console.log(x);
                return {
                    id: x.id
                }
            });
            res();
        });
        if (!cachedAlbum.value) {
            await getAlbumContentsPromise;
        };
        setCachedValue(CACHE_KEY, cachedAlbum.value, 1);
    }
    return cachedAlbum.value;
}
