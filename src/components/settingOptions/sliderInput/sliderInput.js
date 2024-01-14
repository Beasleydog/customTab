import React, { useEffect, useState, Suspense } from "react";
import useDebounce from "../../../helpers/functions/useDebounce";

import "./sliderInput.css";
export default function SliderInput({ setting, onChange }) {
    const [value, setValue] = useState(setting.value);
    const debouncedValue = useDebounce(value, 500);
    useEffect(() => {
        onChange(setting.setting, debouncedValue);
    }, [debouncedValue])

    console.log(setting);

    let displayValueText = setting.valueDisplayText ? setting.valueDisplayText(value) : value;

    return (
        <div class="sliderInputContainer">
            <div class="sliderInputValueDisplay">{displayValueText}</div>

            <input class="sliderInput" type="range" min={setting.limits[0]} max={setting.limits[1]} value={value} onChange={(e) => {
                setValue(e.target.value);
            }} />

        </div>
    );
}
