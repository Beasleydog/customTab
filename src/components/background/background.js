import React, { useEffect, useState } from 'react';
import './background.css';
import { getStoredValue, setStoredValue } from '../../helpers/functions/storage'
import UseBackground from '../../background/BackgroundAPI';
// import * as GeoPattern from "geopattern"
function Background(props) {
    const [background] = UseBackground()

    const [BackgroundElement, setBackgroundElement] = useState(<div />);


    useEffect(() => {
        (async () => {
            switch (background.pageBackgroundMode) {
                case "color":
                    setBackgroundElement(<div className="backgroundElement" style={{ background: background.pageBackgroundColorValue }} />);
                    break
                case "image":
                    setBackgroundElement(<UnsplashPhoto type="background" unsplashQuery={background.unsplashQuery} blur={background.blurImage} darken={background.darkenImage} />);
                    break;
                case "pattern":
                    setBackgroundElement(<Pattern patternType={background.patternType} patternColor={background.patternColor} />);
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
function Pattern(props) {
    const [pattern, setPattern] = useState(window.GeoPattern.generate(
        Math.random() + "",
        {
            ...(props.patternType !== "random" && { generator: props.patternType }),
            color: props.patternColor
        }
    ).toDataUrl());

    return (
        <>
            {/* GeoPattern colors the patterns with the theme color but also a lot of whiter colors
            Add a layer of the theme color with 80% opacity overtop to make it look better  */}
            <div style={{ width: "100vw", height: "100vh", background: props.patternColor + "CC" }} />

            <div className="backgroundElement backgroundPattern" style={{
                background: pattern
            }} />
        </>
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

    let imageFilter = `${props.blur ? "blur" : ""}`;
    return (
        <>
            <img alt=""
                className={`backgroundElement ${imageFilter}`}
                style={{
                    ...(props.darken ? { filter: "brightness(0.8)" } : {}),
                }}
                src={initialURL} />
            <img style={{ display: "none" }} src={preloadPhotoURL} alt="" />
        </>
    )
}

export default Background;