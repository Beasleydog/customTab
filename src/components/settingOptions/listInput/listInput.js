import React, { useEffect, useState, Suspense } from "react";
import useDebounce from "../../../helpers/functions/useDebounce";
import Button from "../../button/button";

import "./listInput.css";
export default function ListInput(props) {
    const [values, setValues] = useState(props.values);
    const [newValue, setNewValue] = useState("");
    function addValue(value) {
        props.onChange([...values, value]);
        setValues(
            [...values, value]
        )
    }
    function removeValue(id) {
        props.onChange(values.filter(v => v.id !== id));
        setValues(
            values.filter(v => v.id !== id)
        )
    }

    return (
        <div className="listInputContainer">
            <div className="listInputInputSection">
                <input placeholder={props.placeholder} value={newValue} onChange={(e) => { setNewValue(e.target.value) }} />
                <Button
                    onClick={
                        () => {
                            if (props.itemValidationFunction(newValue).valid) {
                                addValue({
                                    value: newValue,
                                    id: Math.random().toString().slice(2)
                                });
                                setNewValue("");
                            } else {
                                //Todo: change from alert
                                alert(props.itemValidationFunction(newValue).message);
                            }
                        }
                    }
                    type="WHITE_BACK_BLACK_SHADOW"
                    icon="/assets/plus.svg"
                    size={25}
                />
            </div>
            <div className="listInputItems">
                {values.map((value, index) =>
                    <ListItem key={index} index={index} value={value} itemTitleFunction={props.itemTitleFunction} onRemove={() => { removeValue(value.id) }} />
                )}
            </div>
        </div>
    );
}

function ListItem(props) {
    const [title, setTitle] = useState("...");
    useEffect(() => {
        (async () => {
            let title = await props.itemTitleFunction(props.value.value);
            setTitle(title);
        })();
    }, [])
    return (
        <>
            {title}
            <div className="listInputItem" key={props.index}>
                {props.value.value}
                <Button type="WHITE_BACK_BLACK_SHADOW_ON_HOVER" icon="/assets/close.svg" size={15} onClick={() => props.onRemove()} />
            </div>
        </>

    );
}