import React from "react";
import './settingsTemplate.css';

function settingsTemplate(props) {
    return (
        <>
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                <div id="settingsHeader">
                    {props.header}
                </div>
                <div id="settingsContent">
                    <div className="section">
                        {
                            (props.settings.map((setting, i) => {
                                //For each stored setting value that the block has, render:
                                switch (setting.valueType) {
                                    case Boolean:
                                        //A checkbox if its a boolean value
                                        return (
                                            <div key={i} className="booleanInput settingContainer">
                                                <label >{setting.humanName}</label>
                                                <input onChange={(e) => {
                                                    props.settingChanged(setting.setting, e.target.checked);
                                                }} type="checkbox" checked={setting.value} />

                                            </div>
                                        )
                                    default:
                                        return undefined
                                }
                            }))
                        }
                    </div>
                    {props.displayComponent &&
                        <div className="section" id="blockViewer">{props.displayComponent}</div>
                    }

                </div>
            </div>
        </>
    )
}

export default settingsTemplate;