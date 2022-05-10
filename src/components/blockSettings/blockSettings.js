import React, { useState, useEffect } from 'react';
import { getBlockById } from '../../helpers/functions/storage';
import { getSettingGroups, getSettingGroup, getBlockHumanName, getSettingValueType, blockKindToComponent, updateBlockSetting, getSettingHumanName, getSettingOptions } from '../../helpers/functions/blockFunctions';
import pxToInt from '../../helpers/functions/pxToInt';
import SettingsTemplate from '../settingsTemplate/settingsTemplate';
import { settingCleanRenderList } from '../../helpers/functions/settingFunctions';
import blocksMap from '../../blocks/blocksMap';

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
        <SettingsTemplate header={`${getBlockHumanName(block.kind)}`}
            pages={settingCleanRenderList(blocksMap[block.kind].settingPages, block.blockProps)}


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