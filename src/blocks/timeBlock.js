import React, { useState, useEffect } from 'react';
import useInterval from '../helpers/functions/useInterval';
import { ResponsiveText } from "../components/responsiveText/responsiveTextSize";
export default function TimeBlock(props) {
    const [time, setTime] = useState(currentTime());
    const [rerender, setRerender] = useState(false);


    function currentTime() {
        let dateObject = new Date();
        let hours = dateObject.getHours() % 12 || 12
        let minutes = dateObject.getMinutes() > 9 ? dateObject.getMinutes() : "0" + dateObject.getMinutes();
        let seconds = dateObject.getSeconds() > 9 ? dateObject.getSeconds() : "0" + dateObject.getSeconds();
        let amOrPm = dateObject.getHours() >= 12 ? 'pm' : 'am';

        let time = `${hours}:${minutes}${props.showSeconds ? `:${seconds}` : ""} ${props.showAmPm ? amOrPm : ""}`;
        return time;
    }

    useEffect(() => {
        //Force instant update if props have changed
        setTime(currentTime());

        setRerender(!rerender);
    }, [props]);

    useInterval(() => {
        setTime(currentTime());
    }, 1000);

    return (
        // <ResponsiveTextContainer>
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: "hidden",
            padding: "10px",
            boxSizing: "border-box",
            color: window.themeColor,
        }}>
            <ResponsiveText width={props.width} height={props.height}>
                {time}
            </ResponsiveText>
        </div >
        // </ResponsiveTextContainer>
    )
}
