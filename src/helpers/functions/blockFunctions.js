import React from 'react';
import blocksMap from "../../blocks/blocksMap";
import { getBlocks, updateBlocks, getBlockById, updateBlock } from './storage';
function getBlockHumanName(blockName) {
    return blocksMap[blockName].humanName;
}

function getSettingValueType(blockName, setting) {
    return blocksMap[blockName].settings.blockSettings[setting].type;
}

function getSettingHumanName(blockName, setting) {
    return blocksMap[blockName].settings.blockSettings[setting].humanName;
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
    return blocksMap[blockName].settings.blockSettings[setting].values;
}

function validCheck(valueToCheck, obj) {
    switch (obj.type) {
        case Boolean:
            return typeof (valueToCheck) === "boolean";
        case "Dropdown":
            return obj.values.filter((x) => { return x.id === valueToCheck }).length > 0;
        default:
            break;
    }
}
function getSettingGroup(blockName, setting) {
    return blocksMap[blockName].settings.blockSettings[setting].group;
}
function getSettingGroups(blockName) {
    return blocksMap[blockName].settings.settingGroups;
}
export { getSettingGroup, validCheck, getBlockHumanName, getSettingValueType, blockKindToComponent, updateBlockSetting, getSettingHumanName, getSettingOptions, getSettingGroups };