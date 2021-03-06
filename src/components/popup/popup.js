import React from 'react';
import "./popup.css"
import Button from '../button/button';
export function Popup(props) {
    return (
        <div id="popupBack" onClick={(e) => {
            if (e.target.id !== "popupBack") return;
            props.close();
        }} >
            <div id="popupBody" style={{ ...(props.style && props.style) }}>
                <div id="popupContent">
                    {props.children}
                </div>
                {/* <div id="popupClose">
                    <Button onClick={props.close}>
                        Close
                    </Button>
                </div> */}
            </div>
        </div >
    )
}
