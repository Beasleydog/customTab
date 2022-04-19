import React, { useState, useEffect } from 'react';

export default function TimeBlock() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        setInterval(() => { setTime(new Date().toLocaleTimeString()) }, 1000);
    }, [])

    return (
        <div style={{
            width: '100%',
            height: '100%',
            textSize: "40px"
        }}>
            Time: {time}
        </div>
    )
}
