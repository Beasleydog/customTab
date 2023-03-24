import blocksMap from "../../blocks/blocksMap";
import pxToInt from "./pxToInt";
import { getBlocks, updateBlocks } from "./storage";
import { getAllSettings, getSettingDefaultInfo } from "./settingFunctions";
import React from "react";
import rerenderTab from "./rerenderTab";
function createNewBlock(kind, props) {
    let newBlock = new Block(kind, props);
    console.log(JSON.stringify(newBlock));
    //Update new blocks in storage
    updateBlocks([...getBlocks(), newBlock]);
}
function realBlockFromJSON(json) {
    let newBlock = new Block();
    return newBlock.importFromJSON(json);
}

function Block(kind, props) {
    if (kind) {
        this.kind = kind;
        this.dragProps = {
            x: window.innerWidth / 2 - pxToInt(blocksMap[kind].defaultSizes.width) / 2,
            y: window.innerHeight / 2 - pxToInt(blocksMap[kind].defaultSizes.height) / 2,
            width: blocksMap[kind].defaultSizes.width,
            height: blocksMap[kind].defaultSizes.height,
            ...blocksMap[kind].defaultSizes
        }
        this.blockProps = {
            ...props
        }
        this.id = Date.now();
        this.blockVersion = 1;

        let allSettings = getAllSettings(blocksMap[kind].settingPages);
        Object.keys(allSettings).forEach((key) => {
            this.blockProps[key] = allSettings[key].default;
        });
    }
    this.moveTo = function moveTo(x, y) {
        this.dragProps.x = x;
        this.dragProps.y = y;
        console.log(this);
        this.updateBlockInStorage();
        return this;
    }
    this.resizeTo = function resizeTo(width, height) {
        this.dragProps.width = width;
        this.dragProps.height = height;

        this.updateBlockInStorage();
        return this;
    }
    this.getBlockHumanName = function getBlockHumanName() {
        return blocksMap[this.kind].humanName;
    }
    this.getAspectRatioLocked = function getAspectRatioLocked() {
        console.log(this);
        return blocksMap[this.kind].lockAspectRatio || false;
    }
    this.getSettingValueType = function getSettingValueType(setting) {
        return getSettingDefaultInfo(this.kind, setting).type;
    }

    this.getSettingHumanName = function getSettingHumanName(setting) {
        return getSettingDefaultInfo(this.kind, setting).humanName;
    }

    this.blockKindToComponent = function blockKindToComponent(props) {
        return React.createElement(blocksMap[this.kind].block, { ...props })
    }

    this.updateBlockSetting = function updateBlockSetting(setting, newValue) {
        this.blockProps[setting] = newValue;

        this.updateBlockInStorage();
    }

    this.getSettingOptions = function getSettingOptions(setting) {
        return getSettingDefaultInfo(this.kind, setting).values;
    }

    this.getSettingGroup = function getSettingGroup(setting) {
        return getSettingDefaultInfo(this.kind, setting).group;
    }
    this.getSettingGroups = function getSettingGroups() {
        return blocksMap[this.kind].settings.settingGroups;
    }

    this.updateBlockInStorage = function updateBlockInStorage(block) {
        let blocks = getBlocks();
        updateBlocks(blocks.map((x) => {
            if (x.id === this.id) {
                return this;
            } else {
                return x;
            }
        }));
        rerenderTab();
    }

    this.importFromJSON = function importFromJSON(json) {
        Object.keys(json).forEach((key) => {
            this[key] = json[key];
        });
        return this;
    }

}
export { Block, createNewBlock, realBlockFromJSON };
