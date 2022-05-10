import React, { useState } from "react";
import "./blockSelectInput.css";

function BlockSelectInput(props) {
    const [selectedBlock, setSelectedBlock] = useState(props.value);

    return (
        <div className="blockSelectContainer">
            {props.values.map((value) => {
                return (
                    <div className={`blockOption ${(selectedBlock === value.id && "blockOption-selected")}`}
                        onClick={() => {
                            setSelectedBlock(value.id);
                            props.onChange(value.id);
                        }}
                        style={{
                            background: value.background
                        }}
                    >
                        <span className={`blockOptionText ${(selectedBlock === value.id && "blockOptionText-selected")}`}>
                            {value.value}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}

export default BlockSelectInput;