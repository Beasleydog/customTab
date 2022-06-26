import React, { useState, useEffect } from 'react';

export default function RemNoteQueueBlock(props) {
    const [hovered, setHovered] = useState(false);

    const urlVersionMap = {
        prod: "www.remnote.com",
        alpha: "alpha.remnote.com",
        beta: "beta.remnote.com",
        staging: "remnote-staging.herokuapp.com",
    }
    return (
        <div onMouseEnter={() => {
            if (!hovered) {
                setHovered(true);
            }
        }}
            style={{
                width: '100%',
                height: '100%',
                boxSizing: "border-box",
                borderRadius: "10px",
                boxShadow: "rgba(0,0,0,10%) 0px 0px 6px"
            }}>
            {!props.editMode && hovered ?
                <iframe title="RemNote Queue" src={`https://${urlVersionMap[props.remnoteVersion]}/standalone_queue`} style={{
                    width: '100%',
                    height: '100%',
                    border: "none",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "10px"
                }} />
                :
                <div style={{
                    width: '100%',
                    height: '100%',
                    background: "rgba(255,255,255,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                    gap: "5px"
                }}>
                    {props.editMode ?
                        <>
                            <div style={{ fontSize: "18px" }}>
                                Editing...
                            </div>
                            <div style={{ color: "rgba(255,255,255,0.2)" }}>
                                Not Loading RemNote
                            </div >
                        </>
                        : <>
                            <div style={{ fontSize: "18px" }}>
                                RemNote Queue
                            </div >
                            <div style={{ color: "rgba(255,255,255,0.2)" }}>
                                Hover to load...
                            </div>
                        </>
                    }
                </div>
            }
        </div >
    )
}
