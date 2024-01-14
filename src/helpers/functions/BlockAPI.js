import { getBlocks, updateBlocks, getBlockById, deleteStoredValues } from "./storage";
import { getAllSettings, getSettingDefaultInfo } from "./settingFunctions";
import React, { useEffect, useState, useRef, useCallback } from "react";
import updateToLatestSettings from "./updateSettings";
import blocksMap from "../../blocks/blocksMap";
function createNewBlock(kind, props) {
    let newBlock = new Block(kind, props);
    console.log(JSON.stringify(newBlock));
    //Update new blocks in storage
    updateBlocks([...getBlocks(), newBlock]);
    triggerBlockUpdate(newBlock.id);
}
function realBlockFromJSON(json) {
    try {
        let newBlock = new Block();
        return newBlock.importFromJSON(json);
    } catch (e) {
        console.error("Error importing block from JSON");
        console.log(e);
    }
}
function triggerBlockUpdate(id) {
    const bc = new BroadcastChannel('blockChange');
    bc.postMessage(id);
    bc.close();
}

function useAllBlocks() {
    const [latestBlocks, setLatestBLocks] = useState(getBlocks());

    useEffect(() => {
        function handleBlockChange() {
            setLatestBLocks(getBlocks());
            console.log("block was changed somehwere so now we gettin latest");
        }
        const bc = new BroadcastChannel('blockChange');

        bc.addEventListener("message", (e) => {
            handleBlockChange();
        });

        return () => {
            bc.close();
        };
    }, []);

    return latestBlocks;
}



function getSpecificBlock(id) {
    let allBlocks = getBlocks();
    let block = allBlocks.filter((block) => {
        return block.id === id;
    })[0];
    if (block) block = realBlockFromJSON(block);
    return block;
}

function useSpecificBlock(id, staySynced) {
    const getBlockToSet = () => {
        let temp = (getBlockById(id) ? realBlockFromJSON(getBlockById(id)) : null);
        if (temp) temp.setStateChangeCallback(stateChange);
        console.log("getting block to set", temp);

        return temp;
    }

    const [latestBlock, setLatestBlock] = useState(getBlockToSet());
    const [_, tick] = useState(0);

    function stateChange(newBlock) {
        tick(u => u + 1);
        console.log("setting new block", newBlock, "for id", id);
        setLatestBlock(newBlock);
    }


    useEffect(() => {
        if (staySynced === false) return;

        const bc = new BroadcastChannel('blockChange');
        bc.addEventListener("message", (e) => {
            if (e.data == id) {
                setLatestBlock(getBlockToSet());
            }
        });

        return () => {
            bc.close();
        };
    }, [id, staySynced]);

    console.log("returning latest block for id ", id, latestBlock);
    return latestBlock;
}

function Block(kind, props) {
    if (kind) {
        this.kind = kind;
        this.dragProps = {
            x: window.innerWidth / 2 - (blocksMap[kind].defaultSizes.width) / 2,
            y: window.innerHeight / 2 - (blocksMap[kind].defaultSizes.height) / 2,
            width: blocksMap[kind].defaultSizes.width,
            height: blocksMap[kind].defaultSizes.height,
            ...blocksMap[kind].defaultSizes
        }
        this.blockProps = {
            ...props,
            ...blocksMap[kind].attributes
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

        if (this.stateChangeCallback) {
            this.stateChangeCallback(this);
        }

        return this;
    }
    this.resizeTo = function resizeTo(width, height) {
        this.dragProps.width = width;
        this.dragProps.height = height;

        if (this.stateChangeCallback) {
            this.stateChangeCallback(this);
        }

        return this;
    }
    this.getBlockHumanName = function getBlockHumanName() {
        return blocksMap[this.kind].humanName;
    }
    this.getAspectRatioLocked = function getAspectRatioLocked() {
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
    this.hasSettings = function hasSettings() {
        return Object.keys(blocksMap[this.kind].settingPages).length > 0;
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

        triggerBlockUpdate(this.id);
    }

    this.importFromJSON = function importFromJSON(json) {
        Object.keys(json).forEach((key) => {
            this[key] = json[key];
        });

        //Note that attributes are not stored in storage. 
        //Attributes are facts about the blocks that cannot be changed by the user.
        this.blockProps = {
            ...this.blockProps,
            ...blocksMap[this.kind].attributes
        }

        return this;
    }

    this.delete = function deleteBlock() {
        let blocks = getBlocks();
        console.log("blocks before", blocks);
        let updatedBlocks = blocks.filter((x) => {
            console.log("removing block", x.id, this.id, x.id !== this.id);
            return x.id !== this.id;
        });
        console.log("blocked after", updatedBlocks);
        updateBlocks(updatedBlocks);
        // deleteStoredValues(this.id);
        triggerBlockUpdate();
    }

    this.sync = function sync() {
        this.updateBlockInStorage();
    }
    this.syncSettingOptions = function syncSettingOptions() {
        //Ensure that the setting options for this block are the latest options.
        //If a new update has been pushed that adds new functionality and new settings, we need to make sure we update the existing blocks with default values
        let updatedSettings = updateToLatestSettings(getAllSettings(blocksMap[this.kind].settingPages), this.blockProps);
        this.blockProps = updatedSettings;
        this.updateBlockInStorage();
    }

    this.setStateChangeCallback = function setStateChangeCallback(callback) {
        this.stateChangeCallback = callback;
    }
}
export { Block, createNewBlock, realBlockFromJSON, useAllBlocks, useSpecificBlock, getSpecificBlock };
