import React from 'react';
import "./button.css"
import UseBackground from '../../background/BackgroundAPI';
function Button(props) {
    let enabled = (props.enabled === undefined ? true : props.enabled);
    const [background] = UseBackground();
    return (
        <button className={props.type} id="button" onClick={() => { if (!enabled) { return }; if (props.onClick) { props.onClick(); } }}
            style={{
                ...props.style,

                width: (props.size || 30),
                height: (props.size || 30),
                ...(!enabled && {
                    opacity: 0.5,
                }),
                ...(props.type === "WHITE_BACK_THEME_BORDER" && {
                    border: `${props.size * (2 / 30)}px solid ${background.themeColor}`,
                }),
            }}>
            {props.icon ?
                <img draggable="false" style={{
                    width: (props.size * (12 / 30) * (props.subtext ? .9 : 1) || 12),
                    height: (props.size * (12 / 30) * (props.subtext ? .9 : 1) || 12),
                }} src={props.icon} alt="Icon" />
                : props.children}
            {props.subtext && <span className="subtext" style={{
                fontSize: (props.size * (12 / 30) * .9 || 12) / 2
            }}>{props.subtext}</span>}
        </button>
    )
}

export default Button;