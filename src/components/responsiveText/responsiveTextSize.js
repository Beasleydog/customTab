import React, { useContext, useEffect, useState, useRef } from "react";
import useInterval from "../../helpers/functions/useInterval";
import useStateCallback from "../../helpers/functions/useStateCallback";
const WidthContext = React.createContext(0);

// TODO: Change this to keep the same pixel size padding of the original font and original width: https://codesandbox.io/s/react-ts-get-text-width-in-pixels-e1dj3o

export function ResponsiveText(props) {
    const [fontSize, setFontSize] = useState(1000);
    const [finalFontSize, setFinalFontSize] = useState(0);
    const [step, setStep] = useState(0);
    const [lastProp, setLastProp] = useState("{}");
    const parent = useRef(null);


    //TODO: Enabling the following code makes text realtime resize
    //However, this makes the text flicker quite a bit due to the janky nature how we calculate the correct font size
    //Maybe fix this by making it resize on a offscreen element and then copying the font size to the actual element?

    // useEffect(() => {
    //     if (!parent.current) return; // wait for the parent to be available
    //     const resizeObserver = new ResizeObserver(() => {
    //         // Do what you want to do when the size of the element changes
    //         setFontSize(1000);
    //         setStep(0);
    //     });
    //     resizeObserver.observe(parent.current);
    //     return () => resizeObserver.disconnect(); // clean up
    // }, []);


    useEffect(() => {
        if (lastProp == JSON.stringify(props)) return;
        setLastProp(JSON.stringify(props));
        if (props.children == undefined) return;


        setFontSize(1000);
        setStep(0);
    }, [props]);

    useEffect(() => {
        setTimeout(() => {
            if (!parent.current) return;
            if (!parent.current.children[0]) return;

            let child = parent.current.children[0];
            let parentEl = parent.current;

            if (step == 0) {
                setFontSize((parentEl.clientWidth / child.clientWidth - .00001) * 1000);
                setStep(((step) => { return step + 1 }));
            };
            if (step == 1) {
                if (child.clientHeight > parentEl.clientHeight) {
                    setFontSize(1000);
                    setStep(((step) => { return step + 1 }));
                } else {
                    setFinalFontSize(fontSize);
                }
            }
            if (step == 2) {
                setFinalFontSize((parentEl.clientHeight / child.clientHeight - .00001) * 1000);
                setFontSize((parentEl.clientHeight / child.clientHeight - .00001) * 1000);
            }
        }, 0);
    }, [step]);



    return (
        <div style={{
            width: "100%",
            height: "100%",
            overflow: "hidden"
        }}>
            <div style={{
                width: "100%",
                height: "100%",
                fontSize: finalFontSize,
                textAlign: (props.align || "center"),
                display: "flex",
                justifyContent: (props.align || "center"),
                alignItems: "center",
                position: "relative",
                top: "0px",
                left: "0px"
            }}
            >
                {
                    typeof (props.children) == "string"
                        ?
                        <div style={{ whiteSpace: "nowrap", width: "fit-content" }}>{props.children}</div>
                        :
                        props.children
                }
            </div>

            <div style={{
                width: "100%",
                height: "100%",
                fontSize: fontSize,
                textAlign: (props.align || "center"),
                display: "flex",
                justifyContent: (props.align || "center"),
                alignItems: "center",
                position: "relative",
                left: "1000vw",
            }}
                ref={parent}
            >
                {
                    typeof (props.children) == "string"
                        ?
                        <div style={{ whiteSpace: "nowrap", width: "fit-content" }}>{props.children}</div>
                        :
                        props.children
                }
            </div>
        </div>
    )
}