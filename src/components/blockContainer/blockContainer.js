import React, { useEffect, useInsertionEffect, useState } from 'react';
import "./blockContainer.css"
import openPopup from '../../helpers/functions/openPopup';
import { BlockSettings } from '../blockSettings/blockSettings';
import Button from "../button/button";
import { Rnd } from 'react-rnd';
import { blockKindToComponent } from '../../helpers/functions/blockFunctions';
import RenderBlocker from '../renderBlocker/renderBlocker';
import { getSpecificBlock, realBlockFromJSON } from "../../helpers/functions/BlockAPI";
import UseBackground from '../../background/BackgroundAPI';
function BlockContainer({ id, focusedAndEditing, onMouseDown, editing, onDelete }) {
    const block = getSpecificBlock(id);
    const [background] = UseBackground()
    return (
        <>
            {
                block
                    ?
                    <Rnd
                        bounds="window"
                        onMouseDown={onMouseDown}

                        className={`block ${editing && "block--editing"} ${focusedAndEditing && "block--focused"} ${background.blockBackgroundStyle === "glass" && "block--glass"} ${background.blockBackgroundStyle === "transparent" && "block--transparent"}`}
                        style={{
                            ...background.blockBackgroundStyle === "color" && { background: background.blockBackgroundColor },
                            color: background.themeColor,
                        }}

                        default={{ x: block.dragProps.x, y: block.dragProps.y, width: block.dragProps.width, height: block.dragProps.height }}
                        minHeight={block.blockProps.minimumSizes?.height || 50}
                        minWidth={block.blockProps.minimumSizes?.width || 50}

                        key={id}
                        id={id}

                        onResizeStop={(e, dir, ref, delta, position) => {
                            block.resizeTo(block.dragProps.width + delta.width, block.dragProps.height + delta.height);
                            block.moveTo(position.x, position.y);
                            block.sync();
                        }}

                        onDragStop={(e, d) => {
                            block.moveTo(d.x, d.y);
                            block.sync();
                        }}

                        lockAspectRatio={block.getAspectRatioLocked()}
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


                        resizeGrid={background.useGridForDrag && [10, 10]}
                        dragGrid={background.useGridForDrag && [10, 10]}
                    >
                        <RenderBlocker width={block.dragProps.width} height={block.dragProps.height} editing={editing} block={block.blockProps.hoverToLoad || (block.blockProps.hideContentWhileEdit && editing)} humanName={realBlockFromJSON(block).getBlockHumanName()}>
                            {
                                blockKindToComponent(block.kind, { width: block.dragProps.width, height: block.dragProps.height, id: block.id, editing: editing, backgroundTheme: background.themeColor, ...block.blockProps })
                            }
                        </RenderBlocker>

                        {
                            focusedAndEditing && <div id="blockButtonContainer">
                                {block.hasSettings()
                                    &&
                                    <Button type="WHITE_BACK_BLACK_BORDER" onClick={() => {
                                        openPopup(<BlockSettings id={block.id} />)
                                    }} icon="/assets/gear.svg" />
                                }
                                <Button type="WHITE_BACK_BLACK_BORDER" onClick={() => {
                                    onDelete();
                                    block.delete();
                                }} icon="/assets/close.svg" />
                            </div>
                        }
                    </Rnd >
                    :
                    <>Block not found {id}</>
            }
        </>
    )
}

function Handle() {
    return (<div className='resizeBox'>
    </div>)
}

export { BlockContainer };