import React, { useState } from 'react';
import './background.css';
import { getBackground } from '../../helpers/functions/storage';
import useInterval from '../../helpers/functions/useInterval';
function Background(props) {
    const [background, setBackground] = useState(getBackground());

    useInterval(() => {
        setBackground(getBackground());
    }, 1000);
    return (
        <div id='background'
            style={{
                backgroundColor: (background.mode === "color" ? background.color : "unset"),
                backgroundImage: (background.mode === "image" ? `url(https://source.unsplash.com/random/${window.innerWidth}x${window.innerHeight}/?nature)` : "unset"),
            }}>

        </div>
    )
}

export default Background;