import React, { useState, useEffect } from "react";
import "./loader.css";
import UseBackground from "../../background/BackgroundAPI";
function Loader(props) {
    const [background] = UseBackground();
    const [opacity, setOpacity] = useState(0);
    useEffect(() => {
        if (props.loaded) {
            setTimeout(() => {
                setOpacity(1);
            }, 0);
        }
    }, [props.loaded]);

    return (
        <>
            {props.loaded
                &&
                <div style={{ ...(opacity ? { opacity: 1 } : { opacity: 0 }), transition: "opacity .2s", width: "100%", height: "100%" }}>
                    {props.children}
                </div>
            }
            <div className={`loadContainer ${props.loaded && "loaderHidden"}`} >
                <div className="lds-ring" style={{ "--loader-color": background.themeColor }}><div></div><div></div><div></div><div></div></div>
            </div>
        </>
    )
}
export default Loader;