import React, { useState } from 'react';
import "./blockContainer.css"
import openPopup from '../../helpers/functions/openPopup';
import { BlockSettings } from '../blockSettings/blockSettings';
import Button from "../button/button";
import { Rnd } from 'react-rnd';
import { blockKindToComponent } from '../../helpers/functions/blockFunctions';
import RenderBlocker from '../renderBlocker/renderBlocker';
import { getBlockHumanName } from '../../helpers/functions/blockFunctions';
import { realBlockFromJSON } from "../../helpers/functions/BlockAPI";
function BlockContainer({ block, focusedAndEditing, deleteBlock, onMouseOver, onMouseLeave,
    editing }) {
    const [realBlock, setRealBlock] = useState(realBlockFromJSON(block));
    console.log(block, realBlock);
    return (

        <Rnd
            onMouseEnter={onMouseOver}
            onMouseLeave={onMouseLeave}

            className={`block ${editing && "block--editing"} ${focusedAndEditing && "block--focused"} ${window.background.blockBackgroundStyle === "glass" && "block--glass"} ${window.background.blockBackgroundStyle === "transparent" && "block--transparent"}`}
            bounds="window"
            style={{
                ...window.background.blockBackgroundStyle === "color" && { background: window.background.blockBackgroundColor },
                color: window.background.themeColor
            }}

            position={{ x: block.dragProps.x, y: block.dragProps.y }}
            size={{ width: block.dragProps.width, height: block.dragProps.height }}
            minHeight={50}

            key={block.id}
            id={block.id}

            onResizeStop={(e, dir, ref) => {
                const newNumericWidth = parseInt(ref.style.width.slice(0, -2));
                const newNumericHeight = parseInt(ref.style.width.slice(0, -2));

                const widthChange = newNumericWidth - block.dragProps.width;
                const heightChange = newNumericHeight - block.dragProps.height;

                console.log("width changed by " + widthChange + " and height changed by " + heightChange + "");
                switch (dir) {
                    case "bottomRight":
                        break;
                    case "bottomLeft":
                        setRealBlock(realBlock.moveTo(block.dragProps.x - widthChange, block.dragProps.y));
                        break;
                    case "topRight":
                        setRealBlock(realBlock.moveTo(block.dragProps.x, block.dragProps.y - heightChange))
                        break;
                    case "topLeft":
                        setRealBlock(realBlock.moveTo(block.dragProps.x - widthChange, block.dragProps.y - heightChange));
                        break;
                    default:
                        break;
                }

                realBlock.resizeTo(newNumericWidth, newNumericHeight);

                console.log(dir);
            }}
            onDragStop={(e, d) => {
                realBlock.moveTo(d.x, d.y);
            }}

            lockAspectRatio={realBlock.getAspectRatioLocked()}
            disableDragging={!editing}
            enableResizing={editing ? {
                bottom: false,
                bottomLeft: true,
                bottomRight: true,
                left: false,
                right: false,
                top: false,
                topLeft: true,
                topRight: true
            } : false}

            cancel=".blockButton"

            resizeHandleWrapperClass="blockResizeHandleWrapper"
            resizeHandleComponent={focusedAndEditing && {
                bottomRight: <Handle />,
                bottomLeft: <Handle />,
                topRight: <Handle />,
                topLeft: <Handle />
            }}
        >

            <RenderBlocker editing={editing} block={block.blockProps.hoverToLoad} humanName={realBlockFromJSON(block).getBlockHumanName()}>
                {
                    blockKindToComponent(block.kind, { width: block.dragProps.width, height: block.dragProps.width, id: block.id, editMode: true, backgroundTheme: window.background.themeColor, ...block.blockProps })
                }
            </RenderBlocker>

            {
                focusedAndEditing && <div id="blockButtonContainer">
                    <Button type="WHITE_BACK_BLACK_BORDER" onClick={() => {
                        openPopup(<BlockSettings id={block.id} />)
                    }} icon="/assets/gear.svg" />
                    <Button type="WHITE_BACK_BLACK_BORDER" onClick={deleteBlock} icon="/assets/close.svg" />
                </div>
            }
        </Rnd >

    )
}

function Handle() {
    return (<div className='resizeBox'>
    </div>)
}

export { BlockContainer };