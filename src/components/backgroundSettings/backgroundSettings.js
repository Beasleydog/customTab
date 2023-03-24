import React, { useState, useEffect } from 'react';
import SettingsTemplate from '../settingsTemplate/settingsTemplate';
import "./backgroundSettings.css";
import { getBackground, updateBackground } from '../../helpers/functions/storage';
import settingPages from '../../background/defaultProps';
import { settingCleanRenderList } from '../../helpers/functions/settingFunctions';
import rerenderTab from '../../helpers/functions/rerenderTab';
function BackgroundSettings(props) {
    const [background, setBackground] = useState(getBackground());
    return (
        <>
            <SettingsTemplate
                header={`Theme Settings`}
                pages={settingCleanRenderList(settingPages, background)}
                settingChanged={(setting, value) => {
                    let updatedBackground = { ...background };
                    updatedBackground[setting] = value;
                    setBackground(updatedBackground);
                    updateBackground(updatedBackground);
                    rerenderTab();
                }}
            />
        </>
    )
}



export { BackgroundSettings };