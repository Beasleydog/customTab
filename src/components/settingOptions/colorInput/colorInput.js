import React, { useEffect, useState } from "react"
import { HexColorPicker } from "react-colorful";
import useDebounce from "../../../helpers/functions/useDebounce";
import "./colorInput.css";
export default function ColorInput(props) {
    const [color, setColor] = useState(props.value);

    const debouncedColor = useDebounce(color, 500);

    useEffect(() => {
        props.onChange(debouncedColor);
    }, [debouncedColor])


    useEffect(() => {
        setColor(props.value);
    }, [props])

    return (
        <div className="colorInputContainer">
            <div className="colorSelectorContainer small">
                <HexColorPicker color={color} onChange={setColor} />
            </div>
            <div className="colorInputDisplayColor" style={{ background: color }}></div>
        </div>
    )
}