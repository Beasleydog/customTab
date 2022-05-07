import React, { useState, useEffect } from 'react';
import SettingsTemplate from '../settingsTemplate/settingsTemplate';
import "./backgroundSettings.css";
import { getBackground, updateBackground } from '../../helpers/functions/storage';
import settings from '../../background/defaultProps';

function BackgroundSettings(props) {
    const [background, setBackground] = useState(getBackground());
    return (
        <>
            <SettingsTemplate
                header={`Theme Settings`}
                settings={Object.keys(background).map((setting) => {
                    //Add more detail to the list of settings to they can be rendered
                    return {
                        setting: setting,
                        value: background[setting],
                        valueType: settings.blockSettings[setting].type,
                        humanName: settings.blockSettings[setting].humanName,
                        values: settings.blockSettings[setting].values,
                        condition: settings.blockSettings[setting].displayConditional,
                        group: settings.blockSettings[setting].group
                    }
                })}

                settingChanged={(setting, value) => {
                    let updatedBackground = { ...background };
                    updatedBackground[setting] = value;
                    setBackground(updatedBackground);
                    updateBackground(updatedBackground);
                    console.log("updated background!", updatedBackground, background)
                }}
            />
        </>
    )
}



export { BackgroundSettings };