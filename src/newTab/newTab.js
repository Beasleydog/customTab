/* global chrome */

import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import blocksMap from '../blocks/blocksMap';
import Dropdown from '../components/dropdown/dropdown';
import { getBlocks, updateBlocks, getBackground, deleteStoredValues } from '../helpers/functions/storage';
import openPopup from '../helpers/functions/openPopup';
import { BlockContainer } from '../components/blockContainer/blockContainer';
import { blockKindToComponent, getBlockHumanName } from '../helpers/functions/blockFunctions';
import useInterval from '../helpers/functions/useInterval';
import { BackgroundSettings } from '../components/backgroundSettings/backgroundSettings';
import updateToLatestSettings from '../helpers/functions/updateSettings';
import Background from '../components/background/background';
import { getAllSettings } from '../helpers/functions/settingFunctions';
import { setDefaultBackgroundSettings } from '../helpers/functions/backgroundFunctions';
import Button from '../components/button/button';
import RenderBlocker from '../components/renderBlocker/renderBlocker';
import pxToInt from '../helpers/functions/pxToInt';
import useEventListener from '../helpers/functions/useEventListener';
import { createNewBlock } from '../helpers/functions/BlockAPI';
import rerenderTab from '../helpers/functions/rerenderTab';
const FIRST_RUN = localStorage.getItem("firstRun") == undefined;
if (FIRST_RUN) {
  setDefaultBackgroundSettings();
}

function NewTab() {
  const [userBlocks, setBlocks] = useState(getBlocks());
  const [background, setBackground] = useState(getBackground());
  const [editing, setEditing] = useState(false);
  window.background = background;

  useEventListener("rerenderTab", () => {
    //Update blocks if they were changed in another tab or a change has occured in settings
    setBlocks(getBlocks());
  }, document);

  useEffect(() => {
    //Run on page load to get user's blocks
    setBlocks(getBlocks());


    //Ensure the background is set to atleast the default values
    if (!background) {
      //Background has never been set before
    }

    //If this is the first run, update storage to make sure we don't run first time code again in future
    if (FIRST_RUN) {
      localStorage.setItem("firstRun", false);
      setTimeout(() => {
        addNewBlock("timeBlock");
      }, 10);
    }
  }, []);

  useEffect(() => {
    //Update all blocks to make sure they have their newest version of settings
    let newBlocks = userBlocks;
    newBlocks = newBlocks.map((block) => {
      block.blockProps = updateToLatestSettings(getAllSettings(blocksMap[block.kind].settingPages), block.blockProps);
      return block;
    });
    setBlocks(newBlocks);
    updateBlocks(newBlocks);
  }, []);

  function updateBlockSize(e, direction, ref, delta, position) {
    setBlocks(userBlocks.map((block) => {
      if (block.id === this.id) {
        //Found the block that was resized in storage!

        block.dragProps.width = ref.style.width;
        block.dragProps.height = ref.style.height;
        block.dragProps.x = position.x;
        block.dragProps.y = position.y;
      }
      return block;
    }));

    //Update new blocks in storage
    updateBlocks(userBlocks);
  }

  function updateBlockPosition(e, d) {
    setBlocks(userBlocks.map((block) => {
      if (block.id === this.id) {
        //Found the block that was resized in storage!

        block.dragProps.x = d.x;
        block.dragProps.y = d.y;
      }
      return block;
    }));

    //Update new blocks in storage
    updateBlocks(userBlocks);
  }

  function deleteBlock(id) {
    //Selected block was deleted, make sure to remove selected
    setActiveBlock(null, id);

    let newList = userBlocks.filter((block) => {
      return block.id !== id;
    });

    //Update new blocks in storage
    updateBlocks(newList);

    //Delete all stored values for the block
    deleteStoredValues(id);

    setBlocks(newList);
  }

  const [interactingWithBlock, setInteractState] = useState(false);
  const [activeBlock, updateActiveBlock] = useState(null);

  function setActiveBlock(id, callerBlock) {
    if (!editing) return;

    if (id) {
      //Setting a new active block

      if (interactingWithBlock) return

      setInteractState(true);
      updateActiveBlock(id);
    } else {
      //Removing active block

      //Only the current active block can make itself not active
      if (callerBlock !== activeBlock) return

      setInteractState(false);
      updateActiveBlock(null);
    }
  }

  if (background) {
    window.themeColor = background.themeColor;
  }

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      {userBlocks.map((block, i) => {
        return (<RenderBlock key={i} block={block} updateBlockSize={updateBlockSize} updateBlockPosition={updateBlockPosition} deleteBlock={deleteBlock} setActiveBlock={setActiveBlock} activeBlock={activeBlock} background={background} editing={editing} />)
      })}

      <div id="addContainer">
        {/* If in editing mode, render the dropdown to add a new block */}
        {editing ? (
          <>
            <Button onClick={() => { openPopup(<BackgroundSettings />, { width: "40%" }) }} type="WHITE_BACK_BLACK_BORDER" size={50} >
              Theme
            </Button>
            <Dropdown items={
              [
                {
                  text: "Time Block",
                  onClick: () => { addNewBlock("timeBlock") }
                },
                {
                  text: "Google Photos Block",
                  onClick: () => { addNewBlock("googlePhotosBlock") }
                },
                {
                  text: "RemNote Queue Block",
                  onClick: () => { addNewBlock("remnoteQueueBlock") }
                },
                {
                  text: "Google Calendar Block",
                  onClick: () => { addNewBlock("googleCalendarBlock") }
                },
                {
                  text: "Text Area Block",
                  onClick: () => { addNewBlock("textAreaBlock") }
                },
                {
                  text: "Weather Block",
                  onClick: () => { addNewBlock("weatherBlock") }
                },
              ]
            } >
              <Button type="WHITE_BACK_BLACK_BORDER" size={50} >
                Add
              </Button>

            </Dropdown>

            <Button type="WHITE_BACK_BLACK_BORDER" size={50} onClick={() => { setEditing(!editing) }} icon="/assets/close.svg" />
          </>) : (
          // Otherwise render the button to start editing
          <Button type="WHITE_BACK_BLACK_BORDER" size={50} onClick={() => { setEditing(!editing) }} icon="/assets/edit.svg" />
        )
        }

      </div>

      <Background />
    </div >
  );
}

function addNewBlock(kind, props) {
  createNewBlock(kind, props);
  rerenderTab();
}



function RenderBlock({ block, updateBlockSize, updateBlockPosition, deleteBlock, setActiveBlock, activeBlock, background, editing }) {
  const [hovered, setHovered] = useState(false);
  return (
    <BlockContainer editing={editing} block={block} id={block.id}
      onMouseOver={() => {
        setHovered(true); setActiveBlock(block.id)
      }} onMouseLeave={() => {
        setActiveBlock(null, block.id)
      }} deleteBlock={() => {
        deleteBlock(block.id)
      }} focusedAndEditing={editing && activeBlock === block.id}>

    </BlockContainer>

  )
}

export default NewTab;

