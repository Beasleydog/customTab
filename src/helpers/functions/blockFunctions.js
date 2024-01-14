import React from 'react';
import blocksMap from "../../blocks/blocksMap";
import { getBlocks, updateBlocks, getBlockById, updateBlock } from './storage';
import { getSettingDefaultInfo } from "./settingFunctions";


function getBlockHumanName(blockName) {

    return blocksMap[blockName].humanName;
}

function getSettingValueType(blockName, setting) {
    return getSettingDefaultInfo(blockName, setting).type;
}

function getSettingHumanName(blockName, setting) {
    return getSettingDefaultInfo(blockName, setting).humanName;
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

function getSettingOptions(blockName, setting) {
    return getSettingDefaultInfo(blockName, setting).values;
}


function getSettingGroup(blockName, setting) {
    return getSettingDefaultInfo(blockName, setting).group;
}
function getSettingGroups(blockName) {
    return blocksMap[blockName].settings.settingGroups;
}
export { getSettingGroup, getBlockHumanName, getSettingValueType, blockKindToComponent, updateBlockSetting, getSettingHumanName, getSettingOptions, getSettingGroups };