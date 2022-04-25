import * as Blocks from './index.js';

const blocksMap = {
    'timeBlock': {
        block: Blocks.TimeBlock,
        defaultSizes: { width: "154px", height: "29px" },
        defaultProps: {
            showAmPm: {
                default: true,
                type: Boolean
            }
        },
        humanName: "Time Block"
    }
}

export default blocksMap;