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
                        type: "section",
                        settings: {
                            showAmPm: {
                                default: true,
                                type: "Boolean",
                                isValidValue: function (valueToCheck) { return validCheck(valueToCheck, this) },
                                humanName: "Show AM/PM",
                            },
                            showSeconds: {
                                default: false,
                                type: "Boolean",
                                isValidValue: function (valueToCheck) { return validCheck(valueToCheck, this) },
                                humanName: "Show Seconds"
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
                        type: "section",
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
                        type: "section",
                        settings: {
                            randomBoolean: {
                                default: true,
                                type: "Boolean",
                                isValidValue: function (valueToCheck) { return validCheck(valueToCheck, this) },
                                humanName: "Rand Boolean",
                            },
                        }
                    }
                ]
            }
        },
        humanName: "Time Block",
        lockAspectRatio: true,
    },
    'googlePhotosBlock': {
        block: Blocks.GooglePhotosBlock,
        humanName: "Google Photos Block",
        defaultSizes: { width: "200px", height: "200px" },
        settingPages: {
            albums: {
                icon: "/assets/pencil.svg",
                humanName: "Albums",
                sections: [
                    {
                        humanName: "Album URLs",
                        type: "section",
                        settings: {
                            albumUrls: {
                                default: [],
                                type: "List",
                                placeholder: "https://photos.app.goo.gl/...",
                                itemValidationFunction: function (listItem) {
                                    let validationRegex = /https:\/\/photos\.app\.goo\.gl\/.*/gm;
                                    if (validationRegex.test(listItem)) {
                                        return { valid: true }
                                    } else {
                                        return { valid: false, message: "Not a valid Google Photos URL" }
                                    }
                                },
                                itemTitleFunction: async function (listItem) {
                                    console.log("getting title for ", listItem)
                                    const titleRegex = /<title>(.*)<\/title>/;
                                    let itemTitle = await fetch(listItem);
                                    itemTitle = await itemTitle.text();
                                    itemTitle = itemTitle.match(titleRegex)[1];
                                    return itemTitle;
                                },
                                isValidValue: function (valueToCheck) { return validCheck(valueToCheck, this) },
                                humanName: "Album URL(s)",
                            }
                        }
                    }
                ]
            }
        }
    }
}

export default blocksMap;