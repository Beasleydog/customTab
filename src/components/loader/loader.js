import React from "react";
import "./loader.css";

function Loader(props) {
    return (
        <>
            {props.loaded
                &&
                <div style={{ ...(props.loaded ? { opacity: 1 } : { opacity: 0 }), transition: "opacity .1s", width: "100%", height: "100%" }}>
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