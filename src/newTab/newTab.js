import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import blocksMap from '../blocks/blocksMap';
import Dropdown from '../components/dropdown/dropdown';
import { getBlocks, updateBlocks, getBackground } from '../helpers/functions/storage';
import openPopup from '../helpers/functions/openPopup';
import { BlockContainer } from '../components/blockContainer/blockContainer';
import { blockKindToComponent } from '../helpers/functions/blockFunctions';
import useInterval from '../helpers/functions/useInterval';
import { BackgroundSettings } from '../components/backgroundSettings/backgroundSettings';
import updateToLatestSettings from '../helpers/functions/updateSettings';
import Background from '../components/background/background';
import { setDefaultBackgroundSettings } from '../helpers/functions/backgroundFunctions';
function NewTab() {

  const [userBlocks, setBlocks] = useState(getBlocks());
  const [background, setBackground] = useState(getBackground());
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    //Run on page load to get user's blocks
    setBlocks(getBlocks());


    //Ensure the background is set to atleast the default values
    if (!background) {
      //Background has never been set before
      setDefaultBackgroundSettings();
    }
  }, []);

  useEffect(() => {
    //Update all blocks to make sure they have their newest version of settings
    let newBlocks = userBlocks;
    console.log(newBlocks);
    newBlocks = newBlocks.map((block) => {
      block.blockProps = updateToLatestSettings(block.kind, block.blockProps);
      return block;
    });
    setBlocks(newBlocks);
    updateBlocks(newBlocks);
  }, [])

  useInterval(() => {
    //Check for updates from other tabs or settings, etc
    if (JSON.stringify(getBlocks()) !== JSON.stringify(userBlocks)) {
      setBlocks(getBlocks());
    }
  }, 1000);

  function updateBlockSize(e, direction, ref, delta, position) {
    setBlocks(userBlocks.map((block) => {
      if (block.id === this.id) {
        //Found the block that was resized in storage!

        block.dragProps.width = ref.style.width;
        block.dragProps.height = ref.style.height;
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

  function createNewBlock(kind) {
    let block = {
      kind: kind,
      dragProps: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        ...blocksMap[kind].defaultSizes
      },
      blockProps: {},
      id: Date.now()
    }
    Object.keys(blocksMap[kind].settings.blockSettings).forEach((key) => {
      block.blockProps[key] = blocksMap[kind].settings.blockSettings[key].default;
    });

    //Update new blocks in storage
    updateBlocks([...userBlocks, block]);

    setBlocks([...userBlocks, block]);
  }

  function deleteBlock(id) {
    //Selected block was deleted, make sure to remove selected
    setActiveBlock(null, id);

    let newList = userBlocks.filter((block) => {
      return block.id !== id;
    });

    //Update new blocks in storage
    updateBlocks(newList);

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

  return (
    <div>
      {userBlocks.map(block => {
        return (
          <span className="" onMouseOver={() => { setActiveBlock(block.id) }} onMouseLeave={() => { setActiveBlock(null, block.id) }}>
            <Rnd
              className={`block ${editing && "block--editing"} ${activeBlock === block.id && "block--focused"}`}
              bounds="window"

              size={{ width: block.dragProps.width, height: block.dragProps.height }}
              position={{ x: block.dragProps.x, y: block.dragProps.y }}
              minHeight={35}

              key={block.id}
              id={block.id}

              onResizeStop={updateBlockSize}
              onDragStop={updateBlockPosition}

              lockAspectRatio
              disableDragging={!editing}
              enableResizing={editing}

              cancel=".blockButton"

              resizeHandleComponent={editing && activeBlock === block.id && {
                bottomRight: <Handle />,
                bottomLeft: <Handle />,
                topRight: <Handle />,
                topLeft: <Handle />
              }}
            >
              <BlockContainer id={block.id} deleteBlock={() => { deleteBlock(block.id) }} focusedAndEditing={editing && activeBlock === block.id}>
                {
                  blockKindToComponent(block.kind, { width: block.dragProps.width, ...block.blockProps })
                }
              </BlockContainer>
            </Rnd>
          </span>
        )
      })}

      <div id="addContainer">
        {/* If in editing mode, render the dropdown to add a new block */}
        {editing ? (
          <>
            <button id="addBlockButton" onClick={() => { openPopup(<BackgroundSettings />, { width: "40%" }) }}>
              Theme
            </button>

            <Dropdown items={
              [
                {
                  text: "Time Block",
                  onClick: () => { createNewBlock("timeBlock") }
                },
                { text: "OK" }
              ]
            } >
              <div id="addBlockButton">
                Add
              </div>

            </Dropdown>

            <button id="addBlockButton" onClick={() => { setEditing(!editing) }}>
              <img style={{ width: "20px" }} src="/assets/close.svg" alt="Stop editing" />
            </button>
          </>) : (
          // Otherwise render the button to start editing
          <button id="addBlockButton" onClick={() => { setEditing(!editing) }}>
            <img style={{ width: "20px" }} src="/assets/edit.svg" alt="Enable editing" />
          </button>
        )
        }

      </div>

      <Background />
    </div >
  );
}

function Handle() {
  return (<div className='resizeBox'>
  </div>)
}

export default NewTab;

