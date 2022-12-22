import React, { useEffect, useState } from 'react';
import "./dropdown.css"
import useEventListener from '../../helpers/functions/useEventListener';
export default function Dropdown(props) {
    const [open, setOpen] = useState(false);

    useEventListener("click", () => {
        document.onclick = (e) => {
            if (!open) return true;

            if (e.target.className !== "dropdownItem") {
                setOpen(false);
            }
        }
    }, document);

    return (
        <div>
            {open && (
                <div id="dropdownItems">
                    {props.items.map((item) => {
                        return (<div className='dropdownItem' onClick={() => { setOpen(false); item.onClick(); }}>
                            <span>{item.text}</span>
                        </div>)
                    })}
                </div>)}
            <div style={{ float: "right" }} onClick={() => {
                setOpen(true);
            }}>
                {props.children}
            </div>
        </div>
    )
}