import React, { useState, useEffect } from 'react';
import { getStoredValue, setStoredValue } from '../helpers/functions/storage';
import textColorFromBackground from '../helpers/functions/textColorFromBackground';

export default function TextAreaBlock(props) {
    const [text, setText] = useState(getStoredValue(`${props.id}.text`));
    function updateText(e) {
        setText(e.target.value);
        setStoredValue(`${props.id}.text`, e.target.value);
    }
    return (
        <div style={{
            width: "100%",
            height: "100%",
            background: "white",
            borderRadius: "10px",
            overflow: "hidden"
        }} >
            <textarea value={text} onInput={updateText} style={{
                width: '100%',
                height: '100%',
                backdropFilter: "brightness(1.5) blur(2px)",
                padding: "10px",
                boxSizing: "border-box",
                outline: "none",
                border: "none",
                fontSize: "17px",
                resize: 'none',
                ...(props.themeColoring == "back" && {
                    color: textColorFromBackground(window.themeColor),
                    background: window.themeColor,
                }),
                ...(props.themeColoring == "text" && {
                    background: textColorFromBackground(window.themeColor),
                    color: window.themeColor,
                })

            }}>

            </textarea >
        </div>
    )
}
