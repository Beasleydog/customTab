import React, { useState, useEffect } from 'react';
import { getStoredValue, setStoredValue } from '../helpers/functions/storage';
import textColorFromBackground from '../helpers/functions/textColorFromBackground';
import UseBackground from "../background/BackgroundAPI";

export default function TextAreaBlock(props) {
    const [background] = UseBackground()

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
                padding: "25px",
                boxSizing: "border-box",
                outline: "none",
                border: "none",
                fontSize: "17px",
                resize: 'none',
                ...(props.themeColoring == "back" && {
                    color: textColorFromBackground(background.themeColor),
                    background: background.themeColor,
                }),
                ...(props.themeColoring == "text" && {
                    background: (background.blockBackgroundStyle == "color" ? background.blockBackgroundColor : textColorFromBackground(background.themeColor)),
                    color: background.themeColor,
                })

            }}>

            </textarea >
        </div>
    )
}
