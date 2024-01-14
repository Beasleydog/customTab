import React, { useState, useEffect } from 'react';
import { getBlockById } from '../../helpers/functions/storage';
import { getBlockHumanName, blockKindToComponent, updateBlockSetting } from '../../helpers/functions/blockFunctions';
import SettingsTemplate from '../settingsTemplate/settingsTemplate';
import { settingCleanRenderList } from '../../helpers/functions/settingFunctions';
import blocksMap from '../../blocks/blocksMap';
import { useSpecificBlock } from '../../helpers/functions/BlockAPI';

function BlockSettings(props) {
    const block = useSpecificBlock(props.id);
    console.log("settings block", block)
    let ref = React.createRef();
    const [displayBlockWidth, setDisplayBlockWidth] = useState(0);

    const scaler = .9;

    useEffect(() => {
        if (displayBlockWidth != 0) return;
        //Set width to width of parent element
        setDisplayBlockWidth(ref.current.offsetWidth)
    }, [ref]);


    return (
        <SettingsTemplate header={`${getBlockHumanName(block.kind)}`}
            pages={settingCleanRenderList(blocksMap[block.kind].settingPages, block.blockProps)}


            settingChanged={(setting, value) => {
                block.updateBlockSetting(setting, value);
            }}

            displayComponent={
                <div ref={ref} id="blockDisplay" className="block" style={{
                    height: `${displayBlockWidth * scaler / (block.dragProps.width) * (block.dragProps.height)}px`,
                    ...(displayBlockWidth != 0 ? { width: `${displayBlockWidth * scaler}px` } : {})
                }}>
                    {blockKindToComponent(block.kind, { setting: true, second: (new Date()).getSeconds(), ...block.blockProps, id: block.id })}
                </div>
            }
        />
    )
}

export { BlockSettings };