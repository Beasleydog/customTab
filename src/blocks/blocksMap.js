import * as Blocks from './index.js';
import { validCheck } from '../helpers/functions/blockFunctions';

const blocksMap = {
    'timeBlock': {
        block: Blocks.TimeBlock,
        defaultSizes: { width: "154px", height: "29px" },
        settings: {
            settingGroups: {
                "main": "Main Group",
                "other": "Other Group"
            },
            blockSettings: {
                showAmPm: {
                    default: true,
                    type: Boolean,
                    isValidValue: function (valueToCheck) { return validCheck(valueToCheck, this) },
                    humanName: "Show AM/PM",
                    group: "main"
                },
                test: {
                    default: "one",
                    values: [{
                        value: "One",
                        id: "one"
                    },
                    {
                        value: "Two",
                        id: "two"
                    },
                    {
                        value: "Three",
                        id: "three"
                    }],
                    isValidValue: function (valueToCheck) { return validCheck(valueToCheck, this) },
                    type: "Dropdown",
                    humanName: "Test",
                    group: "main"
                },
                test2: {
                    default: "one",
                    values: [{
                        value: "One",
                        id: "one"
                    },
                    {
                        value: "Two",
                        id: "two"
                    },
                    {
                        value: "Three",
                        id: "three"
                    }],
                    isValidValue: function (valueToCheck) { return validCheck(valueToCheck, this) },
                    type: "Dropdown",
                    humanName: "Test2",
                    group: "other"
                },
            },
        },
        humanName: "Time Block"
    }
}

export default blocksMap;