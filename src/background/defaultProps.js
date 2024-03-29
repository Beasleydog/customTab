import settingValidCheck from "../helpers/functions/settingValidCheck.js"
import PATTERN_OPTIONS from "./patternOptions.js";
const rainbowColor = ` background: linear-gradient(90deg,rgba(255, 0, 0, 1) 0%,rgba(255, 154, 0, 1) 10%,rgba(208, 222, 33, 1) 20%,rgba(79, 220, 74, 1) 30%,rgba(63, 218, 216, 1) 40%,rgba(47, 201, 226, 1) 50%,rgba(28, 127, 238, 1) 60%,rgba(95, 21, 242, 1) 70%,rgba(186, 12, 248, 1) 80%,rgba(251, 7, 217, 1) 90%,rgba(255, 0, 0, 1) 100%)`

//cssVariable is only supported for background/theme stuff due to the fact that these settings apply to the entire page


const settingPages = {
    theme: {
        icon: "/assets/paint.svg",
        humanName: "Theme",
        sections: [

            {
                type: "section",
                settings: {
                    themeColor: {
                        default: "#181818",
                        isValidValue: function (valueToCheck) { settingValidCheck(valueToCheck, this) },
                        type: "ColorSelect",
                        humanName: "Theme Color"
                    },
                    themeShadow: {
                        default: 2,
                        isValidValue: function (valueToCheck) { settingValidCheck(valueToCheck, this) },
                        type: "Slider",
                        cssVariables: [
                            {
                                name: "--theme-box-shadow",
                                valueText: (value) => {
                                    return `${value}px ${value}px ${value}px rgba(0,0,0,0.2)`
                                }
                            },
                            {
                                name: "--theme-drop-shadow",
                                valueText: (value) => {
                                    return `drop-shadow(${value}px ${value}px ${value}px rgba(0,0,0,0.2)})`
                                }
                            }
                        ],
                        humanName: "Theme Shadow",
                        limits: [0, 10],
                        valueDisplayText: (value) => {
                            return `${value}px`;
                        }
                    }
                }
            },


        ]
    },
    background: {
        icon: "/assets/pencil.svg",
        humanName: "Background",
        sections: [

            {
                type: "section",
                humanName: "Background Mode",
                settings: {
                    pageBackgroundMode: {
                        default: "color",
                        type: "TabSelect",
                        values: [
                            {
                                value: "Color",
                                id: "color",
                            },
                            {
                                value: "Image",
                                id: "image",
                            },
                            {
                                value: "Pattern",
                                id: "pattern",
                            },
                        ],
                        isValidValue: function (valueToCheck) { return settingValidCheck(valueToCheck, this) },
                        humanName: ""
                    }
                }
            },

            {
                type: "divider",
            },
            {
                type: "section",
                humanName: "Color Details",
                condition: {
                    pageBackgroundMode: "color"
                },
                settings: {
                    pageBackgroundColorValue: {
                        condition: { pageBackgroundMode: "color" },
                        default: "#f7f7f7",
                        isValidValue: function (valueToCheck) { settingValidCheck(valueToCheck, this) },
                        type: "ColorSelect",
                        humanName: "Background Color"

                    }
                }
            },
            {
                type: "section",
                humanName: "Image Details",
                condition: {
                    pageBackgroundMode: "image"
                },
                settings: {
                    unsplashQuery: {
                        condition: { pageBackgroundMode: "image" },
                        default: "nature",
                        isValidValue: function (valueToCheck) { settingValidCheck(valueToCheck, this) },
                        type: "String",
                        humanName: "Image Type"

                    },
                    blurImage: {
                        condition: { pageBackgroundMode: "image" },
                        default: true,
                        isValidValue: function (valueToCheck) { settingValidCheck(valueToCheck, this) },
                        type: "Boolean",
                        humanName: "Blur Image"
                    },
                    darkenImage: {
                        condition: { pageBackgroundMode: "image" },
                        default: false,
                        isValidValue: function (valueToCheck) { settingValidCheck(valueToCheck, this) },
                        type: "Boolean",
                        humanName: "Darken Image"
                    },
                }
            },
            {
                type: "section",
                humanName: "Pattern Details",
                condition: {
                    pageBackgroundMode: "pattern"
                },
                settings: {
                    patternType: {
                        condition: { pageBackgroundMode: "pattern" },
                        humanName: "Pattern Type",
                        default: "random",
                        type: "Dropdown",
                        values: [
                            {
                                value: "Random",
                                id: "random"
                            },
                            ...(PATTERN_OPTIONS.map((pattern) => {
                                return {
                                    value: pattern.name,
                                    id: pattern.id
                                }
                            }))
                        ],
                        isValidValue: function (valueToCheck) { settingValidCheck(valueToCheck, this) },

                    },
                    patternColor: {
                        condition: { pageBackgroundMode: "pattern" },
                        default: "#000000",
                        isValidValue: function (valueToCheck) { settingValidCheck(valueToCheck, this) },
                        type: "ColorSelect",
                        humanName: "Pattern Color"

                    }
                }
            },
        ]
    },
    blocks: {
        icon: "/assets/pencil.svg",
        humanName: "Blocks",
        sections: [
            {
                humanName: "Block Background",
                type: "section",
                settings: {
                    blockBackgroundStyle: {
                        default: "glass",
                        type: "TabSelect",
                        values: [
                            {
                                value: "Glass",
                                id: "glass",
                            },
                            {
                                value: "Transparent",
                                id: "transparent",
                            },
                            {
                                value: "Color",
                                id: "color",
                            }
                        ],
                        isValidValue: function (valueToCheck) { return settingValidCheck(valueToCheck, this) },
                        humanName: ""
                    },
                }
            },
            {
                type: "section",
                humanName: "Color Details",
                condition: {
                    blockBackgroundStyle: "color"
                },
                settings: {
                    blockBackgroundColor: {
                        default: "#FF0000",
                        isValidValue: function (valueToCheck) { settingValidCheck(valueToCheck, this) },
                        type: "ColorSelect",
                        humanName: "Background Color"

                    }
                }
            },
            {
                type: "divider",
            },
            {
                type: "section",
                humanName: "Dragging",
                settings: {
                    useGridForDrag: {
                        default: true,
                        isValidValue: function (valueToCheck) { settingValidCheck(valueToCheck, this) },
                        type: "Boolean",
                        humanName: "Snap To Grid"

                    }
                }
            },
        ]
    }
};

export default settingPages;
