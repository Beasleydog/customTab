/*global chrome*/

import React, { useState, useEffect } from 'react';
import { ResponsiveText, ResponsiveTextContainer } from '../components/responsiveText/responsiveTextSize';
import useInterval from '../helpers/functions/useInterval';
import { getStoredValue, setStoredValue } from '../helpers/functions/storage';

export default function GooglePhotosBlock(props) {
    const [imageURL, setImageURL] = useState('');
    console.log("google photos block", props);
    useEffect(() => {
        if (
            getStoredValue(`${props.id}.photos`) && getStoredValue(`${props.id}.photos`).length !== 0
            &&
            JSON.stringify(getStoredValue(`${props.id}.albumUrls`)) === JSON.stringify(props.albumUrls.map((x) => x.value))
        ) {
            //We got images, and they are from the correct albums that are set in settings
            setImageURL(getStoredValue(`${props.id}.photos`)[Math.floor(Math.random() * getStoredValue(`${props.id}.photos`).length)]);
        } else {
            console.log("no photos in block", props.id, props.albumUrls)
            //No photos have been stored for this block, do this now! (or its just from an old ablum)
            chrome.runtime.sendMessage({ type: "blockMessage", data: { blockType: "googlePhotosBlock", request: "getAlbumPhotos", albumUrls: props.albumUrls.map((x) => x.value) } }, (response) => {
                setStoredValue(`${props.id}.photos`, JSON.stringify(response));
                setStoredValue(`${props.id}.albumUrls`, JSON.stringify(props.albumUrls.map((x) => x.value)));
                setImageURL(response[Math.floor(Math.random() * response.length)]);
            })
        }

    }, [props.albumUrls])


    return (
        <div style={{ width: "100%", height: "100%", padding: "10px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
                color: "white",
                fontWeight: "bold",
                ...(props.albumUrls.length > 0 && { display: "none" })
            }}>
                No Albums Added... <span role="img" aria-label='sad'>😢</span>
            </div>
            <img alt="" draggable={false} style={{ maxWidth: "100%", maxHeight: "100%", userSelect: "none", borderRadius: "10px", boxShadow: "rgb(0 0 0 / 40%) 0px 0px 6px" }} src={imageURL} />
        </div>
    )
}
