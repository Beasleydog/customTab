import React, { useEffect, useState } from 'react';
import './background.css';
import { getBackground } from '../../helpers/functions/storage';
import useInterval from '../../helpers/functions/useInterval';
import { getStoredValue, setStoredValue } from '../../helpers/functions/storage'

function Background(props) {
    const [background, setBackground] = useState(getBackground());
    const [BackgroundElement, setBackgroundElement] = useState(<div />);

    useInterval(() => {
        setBackground(getBackground());
    }, 1000);

    useEffect(() => {
        (async () => {
            switch (background.mode) {
                case "color":
                    setBackgroundElement(<div className="backgroundElement" style={{ background: background.colorValue }} />);
                    break
                case "image":
                    setBackgroundElement(<UnsplashPhoto type="background" unsplashQuery={background.unsplashQuery} blur={background.blurImage} darken={background.darkenImage} />);
                    break;
                default:
                    break;
            }
        })();
    }, [background])

    return (
        <div id='background'>
            {BackgroundElement}
        </div>
    )
}

function UnsplashPhoto(props) {
    const [preloadPhotoURL, setPreloadPhotoURL] = useState(undefined);
    const [initialURL, setInitialURL] = useState("");
    useEffect(() => {
        async function preloadNextImage() {
            //Preload the next image to show
            let id = await fetch(
                `https://source.unsplash.com/random/${window.innerWidth}x${window.innerHeight}/?${props.unsplashQuery}`
            );
            setPreloadPhotoURL(id.url);
            setStoredValue("background.nextUnsplashPhoto", id.url);
        }
        preloadNextImage();


        setInitialURL(getStoredValue("background.nextUnsplashPhoto") || `https://source.unsplash.com/random/${window.innerWidth}x${window.innerHeight}/?${props.unsplashQuery}`)
    }, []);

    let imageFilter = `${props.blur ? "blur(5px)" : ""} ${props.darken ? "brightness(0.8)" : ""}`;
    return (
        <>
            <img alt="" style={{
                filter: imageFilter
            }}
                className="backgroundElement" src={initialURL} />
            <img style={{ display: "none" }} src={preloadPhotoURL} alt="" />
        </>
    )
}

export default Background;