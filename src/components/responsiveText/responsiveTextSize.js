import React, { useContext, useEffect, useState } from "react"
const WidthContext = React.createContext(0);

export function ResponsiveTextContainer(props) {
    let ref = React.createRef();
    const [width, setWidth] = useState(0);

    useEffect(() => {
        //Set width to width of parent element
        setWidth(ref.current.offsetWidth)
    }, [ref]);

    return (
        <WidthContext.Provider value={width}>
            <div ref={ref} style={{ width: "100%", height: "100%" }}>{props.children}</div>
        </WidthContext.Provider>
    )
}

export function ResponsiveText(props) {
    let width = useContext(WidthContext);


    return (
        <div style={{
            fontSize: width / props.defaultWidth * props.defaultFontSize
        }}>
            {props.children}
        </div>
    )
}