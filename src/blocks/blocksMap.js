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
        attributes: {
            hideContentWhileEdit: true,
            minimumSizes: { width: 200, height: 200 },
        },
        settingPages: {

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
    },
    "todoBlock": {
        block: Blocks.TodoBlock,
        attributes: {
            hideContentWhileEdit: true,
            minimumSizes: { width: 225, height: 150 },

        },
        humanName: "Todo Block",
        defaultSizes: { width: 300, height: 200 },
        lockAspectRatio: true,
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
        }
    }
}


export default blocksMap;