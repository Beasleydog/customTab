import React, { useState } from "react";
import "./tabSelectInput.css";

function TabSelectInput(props) {
    const [selectedTab, setSelectedTab] = useState(props.value);
    return (
        <div className="tabSelectContainer">
            {props.values.map((value, i) => {
                return (
                    <div onClick={() => { props.onChange(value.id); setSelectedTab(value.id); }} key={i} className={`tabOption ${selectedTab === value.id ? "tabOption-selected" : ""}`}>
                        <span className="tabOptionInnerText">{value.value}</span>
                        {i === 0 && (
                            <div className="tabSlidingBackground" style={{
                                transform: `translateX(${props.values.indexOf(props.values.filter((x) => { return x.id === selectedTab })[0])}00%)`,
                            }} />
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default TabSelectInput;