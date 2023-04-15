import React from 'react';
import "./button.css"

function Button(props) {
    let enabled = (props.enabled === undefined ? true : props.enabled);
    return (
        <button className={props.type} id="button" onClick={() => { if (!enabled) { return }; if (props.onClick) { props.onClick(); } }}
            style={{
                width: (props.size || 30),
                height: (props.size || 30),
                ...(!enabled && {
                    opacity: 0.5
                })
            }}>
            {props.icon ?
                <img draggable="false" style={{
                    width: (props.size * (12 / 30) * (props.subtext ? .9 : 1) || 12),
                    height: (props.size * (12 / 30) * (props.subtext ? .9 : 1) || 12)
                }} src={props.icon} alt="Icon" />
                : props.children}
            {props.subtext && <span className="subtext" style={{
                fontSize: (props.size * (12 / 30) * .9 || 12) / 2
            }}>{props.subtext}</span>}
        </button>
    )
}

export default Button;