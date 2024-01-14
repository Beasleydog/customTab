import React, { useEffect, useState } from 'react';
import './background.css';
import { getStoredValue, setStoredValue } from '../../helpers/functions/storage'
import UseBackground from '../../background/BackgroundAPI';
import useGlobalState from '../../helpers/functions/globalState';
import { setCssVariables } from '../../helpers/functions/backgroundFunctions';
// import * as GeoPattern from "geopattern"
function Background(props) {
    const [background] = UseBackground()

    useEffect(() => {
        setCssVariables();

    }, [background]);

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
    console.log(props);
    const [pattern, setPattern] = useState(window.GeoPattern.generate(
        Math.random() + "",
        {
            ...(props.patternType !== "random" && { generator: props.patternType }),
            color: props.patternColor.slice(0, 7)
        }
    ).toDataUrl());

    return (
        <>
            {/* GeoPattern colors the patterns with the theme color but also a lot of whiter colors
            Add a layer of the theme color with slight opacity overtop to make it look better  */}

            <div style={{ width: "100%", height: "100%", background: props.patternColor, opacity: ".85", position: "relative", zIndex: 2 }} />

            <div className="backgroundElement backgroundPattern" style={{
                background: pattern
            }} />
        </>
    )
}
function UnsplashPhoto(props) {
    const [preloadPhotoURL, setPreloadPhotoURL] = useState(undefined);
    const [initialURL, setInitialURL] = useGlobalState("background.unsplashPhoto");
    useEffect(() => {
        if (initialURL) return;

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
                    width: "100vw",
                    height: "100vh",
                }}
                src={initialURL} />
            <img style={{ display: "none" }} src={preloadPhotoURL} alt="" />
        </>
    )
}

export default Background;