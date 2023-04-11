import { useState, useEffect } from 'react';
import { getBackground, updateBackground } from '../helpers/functions/storage';
function UseBackground() {
    const [background, setBackground] = useState(getBackground());
    useEffect(() => {
        const bc = new BroadcastChannel('backgroundChange');
        bc.addEventListener("message", (e) => {
            setBackground(getBackground());
        });

        return () => {
            bc.close();
        };
    }, []);

    function setSetting(setting, value) {
        let updatedBackground = { ...background };
        updatedBackground[setting] = value;
        updateBackground(updatedBackground);

        const bc = new BroadcastChannel('backgroundChange');
        bc.postMessage("update");
        bc.close();
    }

    return [background, setSetting];
}
export default UseBackground;