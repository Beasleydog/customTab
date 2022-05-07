import { updateBackground } from "./storage";
import settings from "../../background/defaultProps";

export function setDefaultBackgroundSettings() {
    let background = {};
    Object.keys(settings.blockSettings).forEach((key) => {
        console.log(settings, key)
        background[key] = settings.blockSettings[key].default;
    });
    console.log(background)
    updateBackground(background);
}