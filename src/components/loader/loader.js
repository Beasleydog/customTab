import React, { useState, useEffect } from "react";
import "./loader.css";
function Loader(props) {
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
                <div className="lds-ring" style={{ "--loader-color": window.themeColor }}><div></div><div></div><div></div><div></div></div>
            </div>
        </>
    )
}
export default Loader;