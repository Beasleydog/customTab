import React, { useEffect, useState } from 'react';

export default function FadeIn(props) {
    const [opacity, setOpacity] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            setOpacity(1);
        }, 0);
    }, []);
    return (
        <div {...props} style={{ opacity: opacity, transition: "opacity 0.5s", position: "absolute", height: "100vh", width: "100vw", top: 0, left: 0 }} />
    )
}