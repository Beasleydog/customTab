/* global chrome */

import React, { useState, useEffect } from 'react';
import Dropdown from '../components/dropdown/dropdown';
import { getBackground } from '../helpers/functions/storage';
import openPopup from '../helpers/functions/openPopup';
import { BlockContainer } from '../components/blockContainer/blockContainer';
import { BackgroundSettings } from '../components/backgroundSettings/backgroundSettings';
import Background from '../components/background/background';
import { setDefaultBackgroundSettings } from '../helpers/functions/backgroundFunctions';
import Button from '../components/button/button';
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

  const [focusedBlock, setFocusedBlock] = useState(null);

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

  useEventListener("mousedown", (e) => {
    if (e.target.classList.contains("backgroundElement")) {
      setFocusedBlock(null);
    }
  });

  if (background) {
    window.themeColor = background.themeColor;
  }

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>

      {userBlocks.map((block, i) => {
        return (<RenderBlock id={block.id} setFocusedBlock={setFocusedBlock} editing={editing} focused={block.id == focusedBlock} background={background} />)
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



function RenderBlock({ id, setFocusedBlock, focused, editing }) {
  return (
    <>
      <BlockContainer editing={editing} id={id}
        onMouseDown={() => {
          setFocusedBlock(id);
        }}
        onDelete={() => {
          setFocusedBlock(null)
        }}
        focusedAndEditing={focused && editing}>

      </BlockContainer>
    </>
  )
}

export default NewTab;

