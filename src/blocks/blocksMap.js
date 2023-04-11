import * as Blocks from './index.js';

function validCheck(valueToCheck, obj) {
    switch (obj.type) {
        case "Boolean":
            return typeof (valueToCheck) === "boolean";
        case "Dropdown":
            return obj.values.filter((x) => { return x.id === valueToCheck }).length > 0;
        case "TabSelect":
            return obj.values.filter((x) => { return x.id === valueToCheck }).length > 0;
        case "ColorSelect":
            return typeof (valueToCheck) === "string";
        case "String":
            return typeof (valueToCheck) === "string";
        case "List":
            return typeof (valueToCheck) == "object" && JSON.stringify(valueToCheck)[0] === "[";
        default:
            break;
    }
}

const hoverToLoadSettings = {
    blockSettings: {
        icon: "/assets/gear.svg",
        humanName: "Block Settings",
        sections: [
            {
                humanName: "Rendering",
                type: "section",
                settings: {
                    hoverToLoad: {
                        default: true,
                        isValidValue: function (valueToCheck) { return validCheck(valueToCheck, this) },
                        type: "Boolean",
                        humanName: "Hover to Load",
                    }
                }
            }
        ]
    }
}


const blocksMap = {
    'timeBlock': {
        block: Blocks.TimeBlock,
        defaultSizes: { width: 1100, height: 232 },
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
                        }
                    },
                ]
            },
        },
        humanName: "Time Block",
        lockAspectRatio: true,
    },
    'googlePhotosBlock': {
        block: Blocks.GooglePhotosBlock,
        humanName: "Google Photos Block",
        defaultSizes: { width: 200, height: 200 },
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
    },
    "remnoteQueueBlock": {
        block: Blocks.RemNoteQueueBlock,
        humanName: "RemNote Queue Block",
        defaultSizes: { width: 400, height: 400 },
        attributes: {
            hideContentWhileEdit: true,
        },
        settingPages: {
            main: {
                icon: "/assets/pencil.svg",
                humanName: "Main Page",
                sections: [
                    {
                        humanName: "RemNote Version",
                        type: "section",
                        settings: {
                            remnoteVersion: {
                                default: "prod",
                                values: [{
                                    value: "Main RemNote",
                                    id: "prod"
                                },
                                {
                                    value: "Alpha RemNote",
                                    id: "alpha"
                                },
                                {
                                    value: "Beta RemNote",
                                    id: "beta"
                                },
                                {
                                    value: "RemNote Staging",
                                    id: "staging"
                                }],
                                isValidValue: function (valueToCheck) { return validCheck(valueToCheck, this) },
                                type: "Dropdown",
                                humanName: "RemNote Version",
                            }
                        }
                    }
                ]
            },
            ...hoverToLoadSettings
        }
    },
    'googleCalendarBlock': {
        block: Blocks.GoogleCalendarBlock,
        humanName: "Google Calendar Block",
        defaultSizes: { width: 200, height: 400 },
        attributes: {
            hideContentWhileEdit: true,
        },
        settingPages: {
            calendarSettings: {
                icon: "/assets/pencil.svg",
                humanName: "Calendar Settings",
                sections: [
                    {
                        humanName: "Calendar Account",
                        type: "section",
                        settings: {
                            calendarAccount: {
                                default: "",
                                placeholder: "example@gmail.com",
                                isValidValue: function (valueToCheck) { return validCheck(valueToCheck, this) },
                                type: "String",
                                humanName: "Calendar Account",
                            }
                        }
                    },

                ]
            },
            ...hoverToLoadSettings
        }
    },
    "textAreaBlock": {
        block: Blocks.TextAreaBlock,
        humanName: "Text Block",
        defaultSizes: { width: 200, height: 200 },
        settingPages: {
            display: {
                icon: "/assets/pencil.svg",
                humanName: "Display Settings",
                sections: [
                    {
                        humanName: "Theme Coloring",
                        type: "section",
                        settings: {
                            themeColoring: {
                                default: "back",
                                values: [{
                                    value: "Background",
                                    id: "back"
                                }, {
                                    value: "Text",
                                    id: "text"
                                }],
                                isValidValue: function (valueToCheck) { return validCheck(valueToCheck, this) },
                                type: "Dropdown",
                                humanName: "Display theme in"
                            }
                        }
                    }
                ]
            },
            ...hoverToLoadSettings
        }
    },
    "weatherBlock": {
        block: Blocks.WeatherBlock,
        humanName: "Weather Block",
        defaultSizes: { width: 150, height: 90 },
        lockAspectRatio: true,
        settingPages: {}
    }
}


export default blocksMap;