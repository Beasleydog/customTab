import React from 'react';
import "./renderBlocker.css"

import { ResponsiveText } from '../responsiveText/responsiveTextSize';

function RenderBlocker(props) {
    console.log(props);
    return (
        props.block && (!props.hovered || props.editing)
            ?
            <div className="RenderBlocker" style={{
                background: `${window.themeColor}20`
            }}>
                <div className='blockHumanName'>

                    <ResponsiveText width={props.width} height={props.height}>
                        {props.humanName}
                    </ResponsiveText>
                </div>
                <div className='blockMessage' style={{ color: window.themeColor }}>

                    <ResponsiveText width={props.width} height={props.height}>
                        {props.editing ? "Editing, not rendering..." : "Hover to load..."}
                    </ResponsiveText>
                </div>

            </div>
            :
            props.children
    )
}

export default RenderBlocker;