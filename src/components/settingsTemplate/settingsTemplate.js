import React from "react";
import './settingsTemplate.css';

function settingsTemplate(props) {
    let organizedSettings = {};
    props.settings.forEach((setting) => {
        if (!organizedSettings[setting.group]) organizedSettings[setting.group] = [];

        organizedSettings[setting.group].push(setting);
    });
    console.log(props.groups);
    return (
        <>
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                <div id="settingsHeader">
                    {props.header}
                </div>
                <div id="settingsContent">
                    <div className="section">
                        <div className="settingsContainer">
                            {
                                Object.keys(organizedSettings).map((group) => {
                                    return (
                                        <div className="settingsGroupContainer">
                                            <div className="settingsGroupName">{group}</div>
                                            <div className="groupContent">
                                                {
                                                    props.settings.map((setting, i, allSetttings) => {

                                                        //If the setting isn't a part of the curernt group, don't render
                                                        if (setting.group !== group) return null;

                                                        if (setting.condition) {
                                                            console.log(allSetttings)
                                                            if (Object.keys(setting.condition).filter((condition) => {
                                                                return (setting.condition[condition] !== allSetttings.filter((x) => { return x.setting == condition })[0].value);
                                                            }).length > 0) {
                                                                //If not all conditions are matched, don't render
                                                                return
                                                            }
                                                        }

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
                                                            case "Dropdown":
                                                                //A dropdown if its a dropdown value
                                                                return (
                                                                    <div className="settingContainer dropdownInput">
                                                                        <label>{setting.humanName}</label>
                                                                        <select selected={setting.value} onChange={(e) => {
                                                                            props.settingChanged(setting.setting, e.target.value);
                                                                        }}>
                                                                            {
                                                                                setting.values.map((option) => {
                                                                                    return <option value={option.id}>{option.value}</option>
                                                                                })
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                )
                                                            default:
                                                                return undefined
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
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