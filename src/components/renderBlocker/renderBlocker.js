import React, { useState } from 'react';
import "./renderBlocker.css"
import UseBackground from '../../background/BackgroundAPI';
import { ResponsiveText } from '../responsiveText/responsiveTextSize';
function RenderBlocker(props) {
    const [hovered, setHovered] = useState(false);
    const [background] = UseBackground();
    return (
        props.block && (!hovered || props.editing)
            ?
            <div onMouseEnter={() => setHovered(true)} className="RenderBlocker" style={{
                background: `${background.themeColor}20`
            }}>
                <div className='blockHumanName'>

                    <ResponsiveText width={props.width} height={props.height}>
                        {props.humanName}
                    </ResponsiveText>
                </div>
                <div className='blockMessage' style={{ color: background.themeColor }}>

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