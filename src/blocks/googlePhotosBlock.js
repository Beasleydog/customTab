/*global chrome*/

import React, { useState, useEffect, useRef } from 'react';
import { getStoredValue, setStoredValue, useStoredValue, deleteStoredValue } from '../helpers/functions/storage';
import imageToDataUrl from '../helpers/functions/imageToDataUrl';
import { getAlbumContents, getAllAlbums, idToPhotoUrl } from '../helpers/functions/googlePhotos';
import { useAuthToken, requestAuthToken } from '../helpers/functions/identityAuthToken';
import useHover from '../helpers/functions/useHover';
import textColorFromBackground from '../helpers/functions/textColorFromBackground';
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function GooglePhotosBlock(props) {
    const googlePhotosToken = useAuthToken();
    const selectedAlbums = useStoredValue(`${props.id}.selectedAlbums`, []);
    const [nextPhoto, setNextPhoto] = useState();
    const [albums, setAlbums] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState();
    const [noPhotos, setNoPhotos] = useState(false);
    const [state, setState] = useState(selectedAlbums.length > 0 ? "photo" : "albums");
    const hoverRef = useRef(null);
    const hovering = useHover(hoverRef);
    useEffect(() => {
        (async () => {
            if (googlePhotosToken) setAlbums(await getAllAlbums());
        })();
    }, [googlePhotosToken]);
    useEffect(() => {
        (async () => {
            if (state == "photo") {
                if (!googlePhotosToken) return;

                const photos = [];

                for (let album of selectedAlbums) {
                    const albumPhotos = await getAlbumContents(album.id);
                    photos.push(...albumPhotos);
                }

                if (photos.length == 0) { setNoPhotos(true); return; }

                setSelectedPhoto(photos[Math.floor(Math.random() * photos.length)]);
                setStoredValue(`${props.id}.nextPhoto`, await imageToDataUrl(await idToPhotoUrl(photos[Math.floor(Math.random() * photos.length)].id, true)));
            }
        })();
    }, [state, googlePhotosToken]);
    useEffect(() => {
        setNextPhoto(getStoredValue(`${props.id}.nextPhoto`));
    }, []);
    const FULL_SIZE = {
        height: `${props.height}px`,
        width: `${props.width}px`
    }

    const changeAlbumButton = <div style={{ paddingTop: "4px", opacity: "0", cursor: "pointer", ...(hovering && { opacity: ".5" }) }} onClick={() => { setNoPhotos(false); setNextPhoto(undefined); setSelectedPhoto(undefined); setState("albums"); }}>Change Albums</div>
    return (<div>
        {!googlePhotosToken ?
            <AuthState block={props} />
            :
            <div>
                {state === "photo" ?
                    <div ref={hoverRef} style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", ...FULL_SIZE }}>
                        {noPhotos ? <div>No photos in albums 😓</div> : ((selectedPhoto || nextPhoto) && <PhotoDisplay
                            photoUrl={nextPhoto}
                            maxHeight={props.height}
                            maxWidth={props.width}
                            id={selectedPhoto && selectedPhoto.id} />)}
                        {!noPhotos && !(selectedPhoto || nextPhoto) && <div>Loading album content 📂</div>}
                        {changeAlbumButton}
                    </div>
                    :
                    <AlbumSelectGrid selectedAlbums={selectedAlbums} albums={albums} block={props} id={props.id} onDone={() => { setState("photo") }} />
                }
            </div>
        }
    </div>
    )
}
function AuthState({ block }) {
    return (
        <div style={{
            height: `${block.height}px`,
            width: `${block.width}px`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <button style={{ height: "min-content" }} onClick={requestAuthToken}>Sync Albums</button>
        </div>
    )
}
function AlbumSelectGrid({ albums, block, id, onDone, selectedAlbums }) {
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", width: `${block.width - 19}px`, height: "25px", paddingBottom: "5px" }}>
                <div onClick={selectedAlbums.length > 0 ? onDone : () => { }}
                    style={{
                        cursor: (selectedAlbums.length > 0 ? "pointer" : "no-access"),
                        padding: "5px",
                        borderRadius: "3px",
                        background: `${window.themeColor}BF`,
                        color: textColorFromBackground(window.themeColor),
                        ...(selectedAlbums.length == 0 && { opacity: ".5" }),
                        width: "min-content",
                    }}
                >Done</div>
            </div>
            <div style={{
                maxHeight: `${block.height - 30}px`,
                overflow: "scroll",
                overflowX: "hidden",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            }}>
                {albums.length == 0 && <div style={{ textAlign: "center" }}>Loading albums 📃</div>}
                {
                    albums.map((x) => {
                        return <AlbumDisplay key={x.id} blockId={id} album={x} block={block} selected={
                            selectedAlbums.find(selectedAlbum => selectedAlbum.id == x.id)
                        } />
                    })
                }
            </div>
        </div>
    )
}
function AlbumDisplay({ album, blockId, block, selected }) {
    const [coverUrl, setCoverUrl] = useState();
    const coverPicSize = 150;

    useEffect(() => {
        (async () => {
            if (album.coverPhotoMediaItemId) setCoverUrl(`${await idToPhotoUrl(album.coverPhotoMediaItemId, true)}=w${coverPicSize}-h${coverPicSize}-c`);
        })()
    }, []);

    const toggleSelection = () => {
        let selectedAlbums = getStoredValue(`${blockId}.selectedAlbums`) || [];
        if (selected) {
            selectedAlbums = selectedAlbums.filter((x) => x.id != album.id);
        } else {
            selectedAlbums.push(album);
        }
        console.log(selectedAlbums);

        setStoredValue(`${blockId}.selectedAlbums`, JSON.stringify(selectedAlbums));

    }

    return (
        <div
            style={{
                margin: "5px",
                padding: "5px",
                borderRadius: "3px",
                cursor: "pointer",
                display: "flex",
                gap: "5px",
                justifyContent: "center",
            }}
        >
            <div style={{ width: `${coverPicSize}px`, minHeight: `${coverPicSize}px`, position: "relative" }} onClick={toggleSelection}>
                {selected && <div style={{ position: "absolute", top: "0", left: "0", width: `${coverPicSize}px`, height: `${coverPicSize}px`, borderRadius: "10px", background: `${window.themeColor}BF` }}>
                    <img alt="check" src="/assets/check.svg" style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: `${Math.floor(coverPicSize / 3)}px`,
                        height: `${Math.floor(coverPicSize / 3)}px`,
                        ...(textColorFromBackground(window.themeColor) == "white" && { filter: "invert(1)" })
                    }}></img>
                </div>}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: `${coverPicSize}px` }}>
                    <LazyLoadImage loading="lazy" style={{ width: `${coverPicSize}px`, height: `${coverPicSize}px`, borderRadius: "10px", background: `${window.themeColor}50`, border: "none", outline: "none" }} src={coverUrl}></LazyLoadImage>
                    {album.title}
                </div>
            </div>
        </div>)
}

function PhotoDisplay({ id, photoUrl, styles, maxHeight, maxWidth }) {
    const [url, setUrl] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            if (photoUrl) return;
            setUrl(await idToPhotoUrl(id));
        })();
    }, []);

    const ADJUSTMENT = 30;

    return (
        <div style={{
            ...(maxHeight && { maxHeight: `${maxHeight - ADJUSTMENT}px` }),
            ...(maxWidth && { maxWidth: `${maxWidth - ADJUSTMENT}px` }),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ...styles
        }} >
            {!loaded && <div>Loading picture 📷</div>}
            <img onLoad={() => { setLoaded(true) }} alt="" draggable={false} style={{
                ...(maxHeight && { maxHeight: `${maxHeight - ADJUSTMENT}px` }),
                ...(maxWidth && { maxWidth: `${maxWidth - ADJUSTMENT}px` }),
                userSelect: "none", borderRadius: "10px"
            }} src={photoUrl || url} />
        </div>
    )
}