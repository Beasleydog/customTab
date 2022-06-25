function updateToLatestSettings(correctSettings, blockSettings) {

    //Add new settins
    Object.keys(correctSettings).forEach((setting) => {
        //If the block already has a value, don't overwrite it
        if (Object.keys(blockSettings).includes(setting)) return

        blockSettings[setting] = correctSettings[setting].default;
    });

    //Remove old settings
    Object.keys(blockSettings).forEach((setting) => {
        //If the setting exists in the default list, leave it
        if (Object.keys(correctSettings).includes(setting)) return

        delete blockSettings[setting];
    });

    //Confirm the value is still valid (Options may have changed, type may have changed, etc)
    Object.keys(blockSettings).forEach((setting) => {
        if (!correctSettings[setting].isValidValue(blockSettings[setting])) {
            //Value is not valid, reset it to the default
            blockSettings[setting] = correctSettings[setting].default;
        }
    });

    return blockSettings
}

export default updateToLatestSettings;