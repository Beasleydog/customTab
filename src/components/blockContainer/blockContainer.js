import React from 'react';
import "./blockContainer.css"
import openPopup from '../../helpers/functions/openPopup';
import { BlockSettings } from '../blockSettings/blockSettings';

function BlockContainer(props) {
    return (
        <div id="blockContainer">
            {props.children}
            {props.focusedAndEditing && <div id="blockButtonContainer">
                <div className="blockButton" onClick={() => {
                    openPopup(<BlockSettings id={props.id} />)
                }}>
                    <img draggable="false" style={{ width: "13px" }} src="/assets/gear.svg" alt="Settings" />
                </div>
                <div className="blockButton" onClick={props.deleteBlock}>
                    <img draggable="false" style={{ width: "13px" }} src="/assets/close.svg" alt="Delete" />
                </div>
            </div>
            }
        </div >
    )
}


export { BlockContainer };