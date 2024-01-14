import React, { useState } from "react";
import './settingsTemplate.css';
import BlockSelectInput from "../settingOptions/blockSelectInput/blockSelectInput";
import TabSelectInput from "../settingOptions/tabSelectInput/tabSelectInput";
import ColorInput from "../settingOptions/colorInput/colorInput";
import ListInput from "../settingOptions/listInput/listInput";
import Background from '../background/background';
import SliderInput from "../settingOptions/sliderInput/sliderInput";
import useDebounce from "../../helpers/functions/useDebounce";
function SettingsTemplate(props) {
    let [currentPage, setCurrentPage] = useState(Object.keys(props.pages)[0]);
    console.log("settings template", props.pages);

    const settingChanged = (setting, value) => {
        //If the setting has a cssVariable attatched, we must update that too 🤑
        if (setting.cssVariable) {
            document.documentElement.style.setProperty(setting.cssVariable, value);
        }

        props.settingChanged(setting, value);
    }

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
                    <div className="section" style={{ zIndex: "10" }}>
                        <div className="settingsContainer">
                            <div className="pageHeader">
                                {props.pages[currentPage].humanName}
                            </div>
                            <div className="sectionsContainer">
                                {
                                    props.pages[currentPage].sections.map((section) => {

                                        switch (section.type) {
                                            case "section":
                                                return (
                                                    <div className="settingSection">
                                                        {section.humanName && <div className="sectionHeader">
                                                            {section.humanName}
                                                        </div>}
                                                        <div className="sectionSettings">
                                                            {section.settings.map((setting, i) => {

                                                                //For each stored setting value that the block has, render:
                                                                switch (setting.type) {
                                                                    case "Boolean":
                                                                        //A checkbox if its a boolean value
                                                                        return (
                                                                            <div key={i} className="booleanInput horizontalSettingLayout">
                                                                                <div class="settingTitle">{setting.humanName}</div>
                                                                                <input onChange={(e) => {
                                                                                    settingChanged(setting.setting, e.target.checked);
                                                                                }} type="checkbox" checked={setting.value} />

                                                                            </div>
                                                                        )
                                                                    case "String":
                                                                        //A text input if its a string value
                                                                        return (
                                                                            <StringInput key={i} settingChanged={settingChanged} setting={setting} />

                                                                        )
                                                                    case "List":

                                                                        //A list where the user can input values if its a list value
                                                                        return <ListInput itemTitleFunction={setting.itemTitleFunction} itemValidationFunction={setting.itemValidationFunction} placeholder={setting.placeholder} values={setting.value} onChange={(value) => { settingChanged(setting.setting, value) }} />
                                                                    case "Dropdown":
                                                                        //A dropdown if its a dropdown value
                                                                        return (
                                                                            <div key={i} className="horizontalSettingLayout dropdownInput">
                                                                                <label>{setting.humanName}</label>
                                                                                <select defaultValue={setting.value} onChange={(e) => {
                                                                                    settingChanged(setting.setting, e.target.value);
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
                                                                            <div key={i} className="verticalSettingLayout">                                                                                {setting.humanName}
                                                                                <div class="settingTitle">{setting.humanName}</div>
                                                                                <BlockSelectInput value={setting.value} values={setting.values} onChange={(value) => {
                                                                                    settingChanged(setting.setting, value);
                                                                                }} />
                                                                            </div>
                                                                        )
                                                                    case "TabSelect":
                                                                        //Tabs component if its a tab select value
                                                                        return (
                                                                            <div key={i} className="verticalSettingLayout tabInput">
                                                                                <div class="settingTitle">{setting.humanName}</div>
                                                                                <TabSelectInput value={setting.value} values={setting.values} onChange={(value) => {
                                                                                    settingChanged(setting.setting, value);
                                                                                }} />
                                                                            </div>
                                                                        )
                                                                    case "ColorSelect":
                                                                        //Color picker component if its a color select value
                                                                        return (
                                                                            <div key={i} className="verticalSettingLayout">
                                                                                <div class="settingTitle">{setting.humanName}</div>
                                                                                <ColorInput value={setting.value} onChange={(value) => {
                                                                                    settingChanged(setting.setting, value);
                                                                                }} />
                                                                            </div>
                                                                        )
                                                                    case "Slider":
                                                                        return (
                                                                            <div key={i} className="verticalSettingLayout">
                                                                                <div class="settingTitle">{setting.humanName}</div>
                                                                                <SliderInput setting={setting} onChange={settingChanged} />
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
                        <div className="section" id="blockViewer">
                            <div className="insetWhiteShadow" style={{ width: "100%", height: "100%", borderRadius: "5px", overflow: 'hidden' }}>
                                <div style={{ position: "relative", top: 0, left: 0, width: "100%", height: "100%" }}>
                                    <Background />
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", top: "-100%", left: 0, width: "100%", height: "100%", zIndex: 4 }}>
                                    {props.displayComponent}
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </>
    )
}
function StringInput({ setting, settingChanged }) {
    const [value, setValue] = useState(setting.value);
    const debouncedValue = useDebounce(value, 500);

    React.useEffect(() => {
        console.log("debounced updated");
        settingChanged(setting.setting, debouncedValue);
    }, [debouncedValue]);

    return (
        <div className="horizontalSettingLayout">
            <label >{setting.humanName}</label>
            <input placeholder={setting.placeholder} onChange={
                (e) => {
                    setValue(e.target.value);
                }
            } value={value} />
        </div>)
}
export default SettingsTemplate;