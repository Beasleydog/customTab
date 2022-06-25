import React from 'react';
import "./blockContainer.css"
import openPopup from '../../helpers/functions/openPopup';
import { BlockSettings } from '../blockSettings/blockSettings';
import Button from "../button/button";
function BlockContainer(props) {
    return (
        <div id="blockContainer">
            {props.children}
            {props.focusedAndEditing && <div id="blockButtonContainer">
                <Button type="WHITE_BACK_BLACK_BORDER" onClick={() => {
                    openPopup(<BlockSettings id={props.id} />)
                }} icon="/assets/gear.svg" />
                <Button type="WHITE_BACK_BLACK_BORDER" onClick={props.deleteBlock} icon="/assets/close.svg" />
            </div>
            }
        </div >
    )
}


export { BlockContainer };