import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Rnd } from 'react-rnd';
import blocksMap from '../blocks/blocksMap';
import Dropdown from '../components/dropdown/dropdown';
import { getBlocks, updateBlocks } from '../helpers/storage';

console.log(blocksMap)

function NewTab() {

  const [userBlocks, setBlocks] = useState([]);
  const [editing, setEditing] = useState(true);

  useEffect(() => {
    //Run on page load to get user's blocks
    setBlocks(getBlocks());
  }, [])

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
      blockProps: blocksMap[kind].defaultProps,
      id: Date.now()
    }
    setBlocks([...userBlocks, block]);

    //Update new blocks in storage
    updateBlocks(userBlocks);
  }

  return (
    <div>
      {userBlocks.map(block => {
        return (editing ?
          <Rnd className='block'
            size={{ width: block.dragProps.width, height: block.dragProps.height }}
            position={{ x: block.dragProps.x, y: block.dragProps.y }}
            key={block.id}
            id={block.id}
            onResizeStop={updateBlockSize}
            onDragStop={updateBlockPosition}
            lockAspectRatio>

            {
              React.createElement(blocksMap[block.kind].block)
            }
          </Rnd> :
          <div className='block'>

          </div>
        )
      })}
      <div id="addContainer">
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
      </div>
    </div >
  );
}

export default NewTab;

