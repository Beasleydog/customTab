import { useEffect, useState } from "react";

export default function useGlobalState(stateName) {
    if (!window.globalState) window.globalState = {};

    const [stateValue, setStateValue] = useState(window.globalState[stateName] ? window.globalState[stateName] : undefined);

    function listner() {
        setStateValue(window.globalState[stateName]);
    }

    useEffect(() => {
        window.addEventListener(`globalStateChange:${stateName}`, listner);

        return () => {
            window.removeEventListener(`globalStateChange:${stateName}`, listner);
        }
    }, []);
    function updateValue(value) {
        window.globalState[stateName] = value;
        window.dispatchEvent(new CustomEvent(`globalStateChange:${stateName}`));
        setStateValue(value);
    }
    return [stateValue, updateValue];
}