import { validCheck } from "../helpers/functions/blockFunctions"

const rainbowColor = ` background: linear-gradient(90deg,rgba(255, 0, 0, 1) 0%,rgba(255, 154, 0, 1) 10%,rgba(208, 222, 33, 1) 20%,rgba(79, 220, 74, 1) 30%,rgba(63, 218, 216, 1) 40%,rgba(47, 201, 226, 1) 50%,rgba(28, 127, 238, 1) 60%,rgba(95, 21, 242, 1) 70%,rgba(186, 12, 248, 1) 80%,rgba(251, 7, 217, 1) 90%,rgba(255, 0, 0, 1) 100%)`

const settingPages = {
    background: {
        icon: "/assets/pencil.svg",
        humanName: "Background Settings",
        sections: [

            {
                humanName: "Background Mode",
                settings: {
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
                        humanName: "Background Mode"
                    },
                    colorValue: {
                        condition: { mode: "color" },
                        default: "red",
                        values: [{
                            value: "Red",
                            id: "red",
                            background: "url(https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg)"
                        },
                        {
                            value: "Blue",
                            id: "blue",
                            background: "blue"
                        },
                        {
                            value: "Three",
                            id: "green",
                            background: "green",
                        },
                        {
                            value: "Rainbow",
                            id: "rainbow",
                            background: "red"
                        }],
                        isValidValue: function (valueToCheck) { validCheck(valueToCheck, this) },
                        type: "BlockSelect",
                        humanName: "Background Color"

                    }
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


    blocks: {
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
};

export default settingPages;
