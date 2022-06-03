import React, { useEffect, useState } from "react"
import useDebounce from "../../../helpers/functions/useDebounce";
import "./listInput.css";
export default function ListInput(props) {
    const [color, setColor] = useState(props.value);

    return (
        <div className="listInputContainer">
            <div className="listInputInputSection">
                <input />
                <div className="listInputSubmitInput" />
            </div>
            <div className="colorInputDisplayColor" style={{ background: color }}></div>
        </div>
    )
}