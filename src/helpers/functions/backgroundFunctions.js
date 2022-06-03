import { updateBackground } from "./storage";
import settingPages from "../../background/defaultProps";
import { getAllSettings } from "./settingFunctions";
export function setDefaultBackgroundSettings() {
    let background = {};
    let allSettings = getAllSettings(settingPages);
    Object.keys(allSettings).forEach((key) => {
        background[key] = allSettings[key].default;
    });
    updateBackground(background);
}