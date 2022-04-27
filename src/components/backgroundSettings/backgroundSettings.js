import React, { useState, useEffect } from 'react';
import "./backgroundSettings.css"

function BackgroundSettings(props) {
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
            <div id="settingsHeader">
                Theme Settings
            </div>
            <div id="settingsContent">
                <div className="section">
                    Test
                </div>
            </div>
        </div>
    )
}

export { BackgroundSettings };