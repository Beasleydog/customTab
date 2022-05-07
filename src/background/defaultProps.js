import { validCheck } from "../helpers/functions/blockFunctions"

const settings = {
    settingGroups: {
        "style": "Background Style"
    },
    blockSettings: {
        mode: {
            default: "color",
            type: "Dropdown",
            values: [
                {
                    value: "Color",
                    id: "color"
                },
                {
                    value: "Image",
                    id: "image"
                }
            ],
            isValidValue: function (valueToCheck) { return validCheck(valueToCheck, this) },
            humanName: "Background Mode",
            group: "style"
        },
        color: {
            displayConditional: { mode: "color" },
            default: "red",
            values: [{
                value: "Red",
                id: "red"
            },
            {
                value: "Blue",
                id: "blue"
            },
            {
                value: "Three",
                id: "green"
            }],
            isValidValue: function (valueToCheck) { validCheck(valueToCheck, this) },
            type: "Dropdown",
            humanName: "Background Color",
            group: "style"

        },
    }
}

export default settings;