import React, { useState, useEffect } from 'react';
import { ResponsiveText, ResponsiveTextContainer } from '../components/responsiveText/responsiveTextSize';

export default function TimeBlock(props) {
    const [time, setTime] = useState(currentTime());
    function currentTime() {
        let dateObject = new Date();
        let hours = dateObject.getHours() % 12 || 12
        let minutes = dateObject.getMinutes();
        let seconds = dateObject.getSeconds() > 10 ? dateObject.getSeconds() : "0" + dateObject.getSeconds();
        let amOrPm = dateObject.getHours() >= 12 ? 'pm' : 'am';

        console.log("I SHOUOLD", props.showAmPm, props.setting)

        let time = `${hours}:${minutes}:${seconds} ${props.showAmPm ? amOrPm : ""}`;
        return time;
    }

    useEffect(() => {
        setInterval(() => {
            setTime(currentTime())
        }, 1000);
    }, [])
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
