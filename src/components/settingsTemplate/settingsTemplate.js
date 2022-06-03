import React, { useState } from "react";
import './settingsTemplate.css';
import BlockSelectInput from "../settingOptions/blockSelectInput/blockSelectInput";
import TabSelectInput from "../settingOptions/tabSelectInput/tabSelectInput";
import ColorInput from "../settingOptions/colorInput/colorInput";
import ListInput from "../settingOptions/listInput/listInput";
function SettingsTemplate(props) {
    let [currentPage, setCurrentPage] = useState(Object.keys(props.pages)[0]);

    return (
        <>
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row" }}>
                <div id="settingsSideBar">
                    <div id="settingsBarHeader">
                        {props.header}
                    </div>
                    <div id="settingGroups">
                        {Object.keys(props.pages).map((page) => {
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
                                        console.log(section);
                                        switch (section.type) {
                                            case "section":
                                                return (
                                                    <div className="settingSection">
                                                        <div className="sectionHeader">{section.humanName}</div>
                                                        <div className="sectionSettings">
                                                            {section.settings.map((setting, i) => {

                                                                //For each stored setting value that the block has, render:
                                                                switch (setting.valueType) {
                                                                    case "Boolean":
                                                                        //A checkbox if its a boolean value
                                                                        return (
                                                                            <div key={i} className="booleanInput horizontalSettingLayout">
                                                                                <label >{setting.humanName}</label>
                                                                                <input onChange={(e) => {
                                                                                    props.settingChanged(setting.setting, e.target.checked);
                                                                                }} type="checkbox" checked={setting.value} />

                                                                            </div>
                                                                        )
                                                                    case "String":
                                                                        //A text input if its a string value
                                                                        return (
                                                                            <div key={i} className="horizontalSettingLayout">
                                                                                <label >{setting.humanName}</label>
                                                                                <input onChange={(e) => {
                                                                                    props.settingChanged(setting.setting, e.target.value);
                                                                                }} value={setting.value} />
                                                                            </div>
                                                                        )
                                                                    case "List":
                                                                        //A list where the user can input values if its a list value
                                                                        return <ListInput value={setting.value} onChange={(value) => { props.settingChanged(setting.setting, value) }} />
                                                                    case "Dropdown":
                                                                        //A dropdown if its a dropdown value
                                                                        return (
                                                                            <div key={i} className="horizontalSettingLayout dropdownInput">
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
                                                                    case "TabSelect":
                                                                        //Tabs component if its a tab select value
                                                                        return (
                                                                            <div key={i} className="verticalSettingLayout tabInput">
                                                                                {setting.humanName}
                                                                                <TabSelectInput value={setting.value} values={setting.values} onChange={(value) => {
                                                                                    props.settingChanged(setting.setting, value);
                                                                                }} />
                                                                            </div>
                                                                        )
                                                                    case "ColorSelect":
                                                                        //Color picker component if its a color select value
                                                                        return (
                                                                            <div key={i} className="verticalSettingLayout">
                                                                                {setting.humanName}
                                                                                <ColorInput value={setting.value} onChange={(value) => {
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
                                            case "divider":
                                                return (
                                                    <div className="settingsDivider" />
                                                )
                                            default:
                                                return null
                                        }
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