import React, { useState, useEffect } from 'react';
import { getBlockById } from '../../helpers/functions/storage';
import { getSettingGroups, getSettingGroup, getBlockHumanName, getSettingValueType, blockKindToComponent, updateBlockSetting, getSettingHumanName, getSettingOptions } from '../../helpers/functions/blockFunctions';
import pxToInt from '../../helpers/functions/pxToInt';
import SettingsTemplate from '../settingsTemplate/settingsTemplate';
import "./blockSettings.css"

function BlockSettings(props) {
    const [block, setBlock] = useState(getBlockById(props.id));

    let ref = React.createRef();
    const [displayBlockWidth, setDisplayBlockWidth] = useState(0);

    useEffect(() => {
        //Set width to width of parent element
        setDisplayBlockWidth(ref.current.offsetWidth)
    }, [ref]);
    console.log(block, getSettingGroups(block.kind));
    return (
        <SettingsTemplate header={`${getBlockHumanName(block.kind)} Settings`}

            settings={Object.keys(block.blockProps).map((setting) => {
                //Add more detail to the list of settings to they can be rendered
                return {
                    setting: setting,
                    value: block.blockProps[setting],
                    valueType: getSettingValueType(block.kind, setting),
                    humanName: getSettingHumanName(block.kind, setting),
                    values: getSettingOptions(block.kind, setting),
                    group: getSettingGroup(block.kind, setting)
                }
            })}
            groups={getSettingGroups(block.kind)}
            settingChanged={(setting, value) => {
                let updatedBlock = updateBlockSetting(block.id, setting, value);
                setBlock(updatedBlock);
            }}

            displayComponent={
                <div ref={ref} id="blockDisplay" style={{
                    height: `${displayBlockWidth / pxToInt(block.dragProps.width) * pxToInt(block.dragProps.height)}px`
                }}>
                    {blockKindToComponent(block.kind, { setting: true, second: (new Date()).getSeconds(), ...block.blockProps })}
                </div>
            }
        />
    )
}

export { BlockSettings };