import React, { useState, useEffect } from 'react';
import { getBlockById } from '../../helpers/functions/storage';
import { getBlockHumanName, getSettingValueType, blockKindToComponent, updateBlockSetting, getSettingHumanName } from '../../helpers/functions/blockFunctions';
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
                                    <div key={i} className="booleanInput settingContainer">
                                        <label >{getSettingHumanName(block.kind, setting)}</label>
                                        <input onChange={(e) => {
                                            let updatedBlock = updateBlockSetting(block.id, setting, e.target.checked);
                                            setBlock(updatedBlock);
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
                        {blockKindToComponent(block.kind, { setting: true, second: (new Date()).getSeconds(), ...block.blockProps })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export { BlockSettings };