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
import pxToInt from '../helpers/functions/pxToInt';
import useEventListener from '../helpers/functions/useEventListener';
import { createNewBlock, useAllBlocks } from '../helpers/functions/BlockAPI';
const FIRST_RUN = localStorage.getItem("firstRun") == undefined;
if (FIRST_RUN) {
  setDefaultBackgroundSettings();
}

function NewTab() {
  const [background, setBackground] = useState(getBackground());
  const [editing, setEditing] = useState(false);

  const userBlocks = useAllBlocks();

  window.background = background;


  useEffect(() => {
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

  useEventListener("mouseup", () => {
    setActiveBlock(null, activeBlock);
  });

  if (background) {
    window.themeColor = background.themeColor;
  }

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      {activeBlock}
      {userBlocks.map((block, i) => {
        return (<RenderBlock id={block.id} setActiveBlock={setActiveBlock} activeBlock={activeBlock} background={background} editing={editing} />)
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
}



function RenderBlock({ id, setActiveBlock, activeBlock, editing }) {
  return (
    <>
      <BlockContainer editing={editing} id={id}
        onMouseOver={() => {
          setActiveBlock(id)
        }}
        onDelete={() => {
          setActiveBlock(null, id)
        }}
        // onMouseLeave={() => {
        //   setActiveBlock(null, id)
        // }} 
        focusedAndEditing={editing && activeBlock === id}>

      </BlockContainer>
    </>
  )
}

export default NewTab;

