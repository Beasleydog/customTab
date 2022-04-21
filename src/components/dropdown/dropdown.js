import React, { useState } from 'react';
import "./dropdown.css"
export default function Dropdown(props) {
    const [open, setOpen] = useState(false);
    return (
        <div>
            {open && (
                <div id="dropdownItems">
                    {props.items.map((item) => {
                        return (<div className='item' onClick={item.onClick}>
                            <span>{item.text}</span>
                        </div>)
                    })}
                </div>)}
            <div style={{ float: "right" }} onClick={() => {
                setOpen(!open);
            }}>
                {props.children}
            </div>
        </div>
    )
}