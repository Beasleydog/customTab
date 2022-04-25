import React, { useState, useEffect } from 'react';
import { getBlockById } from '../../helpers/functions/storage';
import { getBlockHumanName, getSettingValueType, blockKindToComponent, updateBlockSetting } from '../../helpers/functions/blockFunctions';
import pxToInt from '../../helpers/functions/pxToInt';
import "./blockSettings.css"

function BlockSettings(props) {
    const [block, setBlock] = useState(getBlockById(props.id));

    let ref = React.createRef();
    const [displayBlockWidth, setDisplayBlockWidth] = useState(0);

    useEffect(() => {
        //Set width to width of parent element
        setDisplayBlockWidth(ref.current.offsetWidth)
    }, [ref]);

    console.log(block);
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
            <div id="settingsHeader">
                {getBlockHumanName(block.kind)} Settings
            </div>
            <div id="settingsContent">
                <div className="section" id="settings">
                    {Object.keys(block.blockProps).map((setting, i) => {
                        //For each stored setting value that the block has, render:
                        switch (getSettingValueType(block.kind, setting)) {

                            case Boolean:
                                //A checkbox if its a boolean value
                                return (
                                    <div key={i} className="booleanInput">
                                        <label >{setting}</label>
                                        <input onChange={(e) => {
                                            setBlock(updateBlockSetting(block.id, setting, e.target.checked))
                                        }} type="checkbox" checked={block.blockProps[setting]} />

                                    </div>
                                )
                            default:
                                return undefined
                        }
                    })}
                </div>
                <div className="section" id="blockViewer">
                    <div ref={ref} id="blockDisplay" style={{
                        height: `${displayBlockWidth / pxToInt(block.dragProps.width) * pxToInt(block.dragProps.height)}px`
                    }}>
                        {blockKindToComponent(block.kind, { setting: true, ...block.blockProps })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export { BlockSettings };