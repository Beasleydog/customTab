import React, { useState, useEffect } from 'react';

export default function GoogleCalendarBlock(props) {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            borderRadius: "10px",
            overflow: "hidden",
            background: "rgba(255, 255, 255)"
        }}>
            {props.calendarAccount != ""
                ?

                <iframe title="Google Calendar" src={`https://calendar.google.com/calendar/u/0/embed?ctz=America/New_York&showTitle=0&showNav=0&showDate=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0&mode=AGENDA&src=${props.calendarAccount}#focusMain`} style={{
                    width: '100%',
                    height: '100%',
                    border: "none",
                }} />
                :
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                    <div>No calendar linked</div>
                </div>
            }
        </div >
    )
}
