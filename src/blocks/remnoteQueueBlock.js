import React, { useState, useEffect } from 'react';

export default function RemNoteQueueBlock(props) {
    const urlVersionMap = {
        prod: "www.remnote.com",
        alpha: "alpha.remnote.com",
        beta: "beta.remnote.com",
        staging: "remnote-staging.herokuapp.com",
    }
    return (
        <div style={{
            width: '100%',
            height: '100%',
        }}>
            <iframe title="RemNote Queue" src={`https://${urlVersionMap[props.remnoteVersion]}/standalone_queue`} style={{
                width: '100%',
                height: '100%',
                borderRadius: "10px",
                border: "none"
            }} />
        </div >
    )
}
