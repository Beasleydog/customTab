import React, { useState, useEffect } from 'react';
import { ResponsiveText, ResponsiveTextContainer } from '../components/responsiveText/responsiveTextSize';
import useInterval from '../helpers/functions/useInterval';

export default function TimeBlock(props) {
    const [time, setTime] = useState(currentTime());
    function currentTime() {
        let dateObject = new Date();
        let hours = dateObject.getHours() % 12 || 12
        let minutes = dateObject.getMinutes() > 10 ? dateObject.getMinutes() : "0" + dateObject.getMinutes();
        let seconds = dateObject.getSeconds() > 10 ? dateObject.getSeconds() : "0" + dateObject.getSeconds();
        let amOrPm = dateObject.getHours() >= 12 ? 'pm' : 'am';

        let time = `${hours}:${minutes}:${seconds} ${props.showAmPm ? amOrPm : ""}`;
        return time;
    }

    useEffect(() => {
        //Force instant update if props have changed
        setTime(currentTime());
    }, [props]);

    useInterval(() => {
        setTime(currentTime());
    }, 1000);

    return (
        <ResponsiveTextContainer>
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ResponsiveText defaultWidth={99} defaultFontSize={15}>
                    {time}
                </ResponsiveText>
            </div >
        </ResponsiveTextContainer>
    )
}
