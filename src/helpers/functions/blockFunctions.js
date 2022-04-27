import React from 'react';
import blocksMap from "../../blocks/blocksMap";
import { getBlocks, updateBlocks } from './storage';
function getBlockHumanName(blockName) {
    return blocksMap[blockName].humanName;
}

function getSettingValueType(blockName, setting) {
    return blocksMap[blockName].defaultProps[setting].type;
}

function getSettingHumanName(blockName, setting) {
    return blocksMap[blockName].defaultProps[setting].humanName;
}

function blockKindToComponent(kind, props) {
    return React.createElement(blocksMap[kind].block, { ...props })
}

function updateBlockSetting(id, setting, newValue) {
    let blocks = getBlocks();
    let changedBlock;
    blocks.forEach((block) => {
        if (block.id === id) {
            block.blockProps[setting] = newValue;
            changedBlock = block;
        }
    });
    updateBlocks(blocks);

    return changedBlock;
}

export { getBlockHumanName, getSettingValueType, blockKindToComponent, updateBlockSetting, getSettingHumanName };