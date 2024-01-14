import { updateBackground } from "./storage";
import settingPages from "../../background/defaultProps";
import { getAllSettings } from "./settingFunctions";
import { getBackground } from "./storage";
export function setDefaultBackgroundSettings() {
    let background = {};
    let allSettings = getAllSettings(settingPages);
    Object.keys(allSettings).forEach((key) => {
        background[key] = allSettings[key].default;
    });
    updateBackground(background);
}
export function setCssVariables() {
    let background = getBackground();
    let allSettings = getAllSettings(settingPages);
    Object.keys(allSettings).forEach((key) => {
        if (allSettings[key].cssVariables === undefined) return;

        allSettings[key].cssVariables.forEach((cssVariable) => {
            let cssVariableValue = cssVariable.valueText(background[key]);
            document.documentElement.style.setProperty(cssVariable.name, cssVariableValue);
            console.log(`Set ${cssVariable.name} to ${cssVariableValue}`)
        });
    });
    console.log(allSettings);
}