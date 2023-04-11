import React, { useState, useEffect } from 'react';
import SettingsTemplate from '../settingsTemplate/settingsTemplate';
import "./backgroundSettings.css";
import settingPages from '../../background/defaultProps';
import { settingCleanRenderList } from '../../helpers/functions/settingFunctions';
import useBackground from "../../background/BackgroundAPI";
function BackgroundSettings(props) {
    const [background, setSetting] = useBackground();

    return (
        <>
            <SettingsTemplate
                header={`Theme Settings`}
                pages={settingCleanRenderList(settingPages, background)}
                settingChanged={(setting, value) => {
                    setSetting(setting, value)
                }}
            />
        </>
    )
}



export { BackgroundSettings };