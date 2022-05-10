import React, { useState } from "react";
import './settingsTemplate.css';
import BlockSelectInput from "../blockSelectInput/blockSelectInput";
function SettingsTemplate(props) {
    // let organizedSettings = {};
    // props.settings.forEach((setting) => {
    //     if (!organizedSettings[setting.group]) organizedSettings[setting.group] = [];

    //     organizedSettings[setting.group].push(setting);
    // });
    // console.log(organizedSettings, props.groups);

    let [currentPage, setCurrentPage] = useState(Object.keys(props.pages)[0]);

    console.log(props.pages);

    return (
        <>
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row" }}>
                <div id="settingsSideBar">
                    <div id="settingsBarHeader">
                        {props.header}
                    </div>
                    <div id="settingGroups">
                        {Object.keys(props.pages).map((page) => {
                            console.log("RENDERING", page, props.pages[page])
                            return (
                                <div className={`groupButton ${currentPage === page && "groupButton-selected"}`} onClick={() => { setCurrentPage(page) }}>
                                    <img className="groupIcon" src={props.pages[page].icon} />
                                    {props.pages[page].humanName}
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
                <div id="settingsContent">
                    <div className="section" style={{ zIndex: "10", boxShadow: "rgb(0 0 0 / 6%) 2px 0px 8px" }}>
                        <div className="settingsContainer">
                            <div className="pageHeader">
                                {props.pages[currentPage].humanName}
                            </div>
                            <div className="sectionsContainer">
                                {
                                    props.pages[currentPage].sections.map((section) => {
                                        return (
                                            <div className="settingSection">
                                                <div className="sectionHeader">{section.humanName}</div>
                                                <div className="sectionSettings">
                                                    {section.settings.map((setting, i) => {

                                                        //For each stored setting value that the block has, render:
                                                        switch (setting.valueType) {
                                                            case Boolean:
                                                                //A checkbox if its a boolean value
                                                                return (
                                                                    <div key={i} className="booleanInput horizontalSettingLayout">
                                                                        <label >{setting.humanName}</label>
                                                                        <input onChange={(e) => {
                                                                            props.settingChanged(setting.setting, e.target.checked);
                                                                        }} type="checkbox" checked={setting.value} />

                                                                    </div>
                                                                )
                                                            case "Dropdown":
                                                                //A dropdown if its a dropdown value
                                                                return (
                                                                    <div className="horizontalSettingLayout dropdownInput">
                                                                        <label>{setting.humanName}</label>
                                                                        <select defaultValue={setting.value} onChange={(e) => {
                                                                            props.settingChanged(setting.setting, e.target.value);
                                                                        }}>
                                                                            {
                                                                                setting.values.map((option) => {
                                                                                    return <option selected={option.id === setting.value} value={option.id}>{option.value}</option>
                                                                                })
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                )
                                                            case "BlockSelect":
                                                                //Block select component if its a block select value
                                                                return (
                                                                    <div key={i} className="verticalSettingLayout">
                                                                        {setting.humanName}
                                                                        <BlockSelectInput value={setting.value} values={setting.values} onChange={(value) => {
                                                                            props.settingChanged(setting.setting, value);
                                                                        }} />
                                                                    </div>
                                                                )
                                                            default:
                                                                return undefined
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
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

export default SettingsTemplate;