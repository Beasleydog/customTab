import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Rnd } from 'react-rnd';
import blocksMap from '../blocks/blocksMap';
import Dropdown from '../components/dropdown/dropdown';
import { getBlocks, updateBlocks } from '../helpers/storage';
import * as Blocks from '../blocks/index.js';


function NewTab() {

  const [userBlocks, setBlocks] = useState([]);
  const [editing, setEditing] = useState(true);

  useEffect(() => {
    //Run on page load to get user's blocks
    let blocks = getBlocks();
    setBlocks(blocks);
  }, [])

  function updateBlockSize(e, direction, ref, delta, position) {
    setBlocks(userBlocks.map((block) => {
      if (block.id === this.id) {
        //Found the block that was resized in storage!

        block.width = ref.style.width;
        block.height = ref.style.height;
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

        block.x = d.x;
        block.y = d.y;
      }
      return block;
    }));

    //Update new blocks in storage
    updateBlocks(userBlocks);
  }

  return (
    <div>
      {userBlocks.map(block => {
        let BlockContent;
        if (editing) {
          BlockContent = lazy(() => import(`../blocks/${block.kind}`));
        }


        return (editing ?
          <Rnd className='block'
            size={{ width: block.width, height: block.height }}
            position={{ x: block.x, y: block.y }}
            key={block.id}
            id={block.id}
            onResizeStop={updateBlockSize}
            onDragStop={updateBlockPosition}
            lockAspectRatio>

            {<Suspense fallback={<div>Loading...</div>}>
              <BlockContent />
            </Suspense>}
          </Rnd> :
          <div className='block'>

          </div>
        )
      })}
      <div id="addContainer">
        <Dropdown items={
          [
            { text: "Time Block" },
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

