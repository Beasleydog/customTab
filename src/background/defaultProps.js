import { validCheck } from "../helpers/functions/blockFunctions"

const rainbowColor = ` background: linear-gradient(90deg,rgba(255, 0, 0, 1) 0%,rgba(255, 154, 0, 1) 10%,rgba(208, 222, 33, 1) 20%,rgba(79, 220, 74, 1) 30%,rgba(63, 218, 216, 1) 40%,rgba(47, 201, 226, 1) 50%,rgba(28, 127, 238, 1) 60%,rgba(95, 21, 242, 1) 70%,rgba(186, 12, 248, 1) 80%,rgba(251, 7, 217, 1) 90%,rgba(255, 0, 0, 1) 100%)`

const settingPages = {
    background: {
        icon: "/assets/pencil.svg",
        humanName: "Background Settings",
        sections: [

            {
                type: "section",
                humanName: "Background Mode",
                settings: {
                    mode: {
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
                            {
                                value: "Ambient",
                                id: "ambient",
                            }
                        ],
                        isValidValue: function (valueToCheck) { return validCheck(valueToCheck, this) },
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
                    mode: "color"
                },
                settings: {
                    colorValue: {
                        condition: { mode: "color" },
                        default: "#FF0000",
                        isValidValue: function (valueToCheck) { validCheck(valueToCheck, this) },
                        type: "ColorSelect",
                        humanName: "Background Color"

                    }
                }
            },
            {
                type: "section",
                humanName: "Image Details",
                condition: {
                    mode: "image"
                },
                settings: {
                    unsplashQuery: {
                        condition: { mode: "image" },
                        default: "nature",
                        isValidValue: function (valueToCheck) { validCheck(valueToCheck, this) },
                        type: "String",
                        humanName: "Image Type"

                    },
                    blurImage: {
                        condition: { mode: "image" },
                        default: true,
                        isValidValue: function (valueToCheck) { validCheck(valueToCheck, this) },
                        type: "Boolean",
                        humanName: "Blur Image"
                    },
                    darkenImage: {
                        condition: { mode: "image" },
                        default: false,
                        isValidValue: function (valueToCheck) { validCheck(valueToCheck, this) },
                        type: "Boolean",
                        humanName: "Darken Image"
                    },
                }
            }
        ]
    },


    blocks: {
        icon: "/assets/pencil.svg",
        humanName: "Block Settings",
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
                        isValidValue: function (valueToCheck) { return validCheck(valueToCheck, this) },
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
                        isValidValue: function (valueToCheck) { validCheck(valueToCheck, this) },
                        type: "ColorSelect",
                        humanName: "Background Color"

                    }
                }
            },
        ]
    }
};

export default settingPages;
