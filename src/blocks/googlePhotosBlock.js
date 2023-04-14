/*global chrome*/

import React, { useState, useEffect } from 'react';
import { getStoredValue, setStoredValue } from '../helpers/functions/storage';
import imageToDataUrl from '../helpers/functions/imageToDataUrl';
export default function GooglePhotosBlock(props) {
    const [imageURL, setImageURL] = useState('');
    useEffect(() => {
        (async () => {
            console.log(props);

            let storedPhotos = getStoredValue(`${props.id}.photos`);

            if (
                storedPhotos && storedPhotos.length !== 0
                &&
                JSON.stringify(getStoredValue(`${props.id}.albumUrls`)) === JSON.stringify(props.albumUrls.map((x) => x.value))
            ) {
                //We got images, and they are from the correct albums that are set in settings
                if (imageURL === '') {
                    //We don't already have an image being shown, so choose one to display.

                    if (getStoredValue(`${props.id}.nextPicture`)) {
                        //We already have a dataurl to display next
                        setImageURL(getStoredValue(`${props.id}.nextPicture`))
                    } else {
                        //No next photo in storage. This should never happen, maybe somebody messing with local storage? 🤔🤔🤔
                        setImageURL(storedPhotos[Math.floor(Math.random() * storedPhotos.length)]);
                    }
                }
                //Store a random picture from the album in storage, so we can display it next time
                setStoredValue(`${props.id}.nextPicture`, await imageToDataUrl(storedPhotos[Math.floor(Math.random() * storedPhotos.length)]));
            } else {
                //No photos have been stored for this block, do this now! (or its just from an old ablum)
                if (props.albumUrls.length != 0) {
                    //Only actually get photos if we have albums selected
                    getLatestPhotos();
                }
            }

        })();
    }, [props.albumUrls])


    function getLatestPhotos() {
        chrome.runtime.sendMessage({ type: "blockMessage", data: { blockType: "googlePhotosBlock", request: "getAlbumPhotos", albumUrls: props.albumUrls.map((x) => x.value) } }, async (response) => {
            setStoredValue(`${props.id}.photos`, JSON.stringify(response));
            setStoredValue(`${props.id}.albumUrls`, JSON.stringify(props.albumUrls.map((x) => x.value)));
            setImageURL(response[Math.floor(Math.random() * response.length)]);
            setStoredValue(`${props.id}.nextPicture`, await imageToDataUrl(response[Math.floor(Math.random() * response.length)]));
        })
    }

    return (
        <div style={{
            width: "100%", height: "100%", padding: "10px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center",
            ...(props.albumUrls.length == 0 && { background: `${window.themeColor}20`, color: "white" })
        }}>
            <div style={{
                fontWeight: "bold",
                ...(props.albumUrls.length > 0 && { display: "none" }),
                textShadow: "0px 0px 5px gray",
            }}>
                No Albums Added... <span role="img" aria-label='sad'>😢</span>
            </div>
            <img alt="" draggable={false} style={{ maxWidth: "100%", maxHeight: "100%", userSelect: "none", borderRadius: "10px" }} src={imageURL} />
        </div>
    )
}
