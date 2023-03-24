function settingValidCheck(valueToCheck, obj) {
    switch (obj.type) {
        case "Boolean":
            return typeof (valueToCheck) === "boolean";
        case "Dropdown":
            return obj.values.filter((x) => { return x.id === valueToCheck }).length > 0;
        case "TabSelect":
            return obj.values.filter((x) => { return x.id === valueToCheck }).length > 0;
        case "ColorSelect":
            return typeof (valueToCheck) === "string";
        case "String":
            return typeof (valueToCheck) === "string";
        case "List":
            return typeof (valueToCheck) == "object" && JSON.stringify(valueToCheck)[0] === "[";
        default:
            break;
    }
}
export default settingValidCheck;