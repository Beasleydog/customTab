import * as Blocks from './index.js';
import { validCheck } from '../helpers/functions/blockFunctions';

const blocksMap = {
    'timeBlock': {
        block: Blocks.TimeBlock,
        defaultSizes: { width: "154px", height: "29px" },
        settingPages: {
            main: {
                icon: "/assets/pencil.svg",
                humanName: "Main Page",
                sections: [
                    {
                        humanName: "First Section",
                        settings: {
                            showAmPm: {
                                default: true,
                                type: Boolean,
                                isValidValue: function (valueToCheck) { return validCheck(valueToCheck, this) },
                                humanName: "Show AM/PM",
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
                            },
                        }
                    },
                    {
                        humanName: "Second Section",
                        condition: {
                            showAmPm: true
                        },
                        settings: {
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
                            },
                        }
                    }
                ]
            },
            other: {
                icon: "/assets/pencil.svg",
                humanName: "Other Settings",
                sections: [
                    {
                        humanName: "Other First Section",
                        settings: {
                            randomBoolean: {
                                default: true,
                                type: Boolean,
                                isValidValue: function (valueToCheck) { return validCheck(valueToCheck, this) },
                                humanName: "Rand Boolean",
                            },
                        }
                    }
                ]
            }
        },
        humanName: "Time Block"
    }
}

export default blocksMap;