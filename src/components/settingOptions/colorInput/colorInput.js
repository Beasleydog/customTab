import React, { useEffect, useState } from "react"
import { HexColorPicker } from "react-colorful";
import useDebounce from "../../../helpers/functions/useDebounce";
import "./colorInput.css";
import textColorFromBackground from "../../../helpers/functions/textColorFromBackground";
export default function ColorInput(props) {
    const [color, setColor] = useState(props.value);
    const colorOptions = ["#ffbe0b", "#fb5607", "#e70e02", "#ff006e", "#8338ec", "#00a1e4", "#04e762", "#89fc00"];
    const blackOptions = ["#ffffff", "#eeeeee", "#bcbcbc", "#999999", "#5b5b5b", "#444444", "#101010"];
    const allOptions = [...colorOptions, ...blackOptions].map(x => x + "FF");


    const debouncedColor = useDebounce(color, 500);

    useEffect(() => {
        props.onChange(debouncedColor);
    }, [debouncedColor])


    useEffect(() => {
        setColor(props.value);
    }, [props])

    let customColorSelected = allOptions.indexOf(color) === -1;

    let backgroundColor = textColorFromBackground(color);
    let stripeAccent = backgroundColor === "white" ? "#f7f7f7" : "#0a0a0a";

    console.log(textColorFromBackground(color));
    return (
        <div className="colorInputContainer">
            {allOptions.map((colorOption, i) => {
                return (
                    <div key={i} onClick={() => { setColor(colorOption) }} className={`colorOption ${color === colorOption ? "colorOption-selected" : ""}`} style={{
                        backgroundColor: colorOption,
                    }}></div>
                )
            })}
            <div className="colorOption" style={{
                // ...(customColorSelected ? {
                //     background: `repeating-linear-gradient(
                //     45deg,
                //     ${backgroundColor},
                //     ${backgroundColor} 5px,
                //     ${stripeAccent} 5px,
                //     ${stripeAccent} 10px
                //   )`} : { background: "white" })
                ...(customColorSelected ? {
                    background: color
                } : { background: "white" })
            }}>
                <div className="colorPickerIcon" style={{
                    background: backgroundColor,
                    ...(customColorSelected ? { maskImage: "url(/assets/check.svg)" } : { background: "black" })
                }} />
                <input type="color" value={color} onChange={(e) => { setColor(e.target.value) }} />
            </div>
            {/* <div className="colorSelectorContainer small fullwidth">
                <HexColorPicker color={color} onChange={setColor} />
            </div>
            <div className="colorInputDisplayColor" style={{ background: color }}></div> */}
        </div>
    )
}