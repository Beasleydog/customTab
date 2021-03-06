import ReactDOM from 'react-dom';
import React from 'react';
import { Popup } from '../../components/popup/popup';
import Button from '../../components/button/button';

const node = document.createElement("div");
const popup = (message, style) => {
    document.body.appendChild(node);
    const PopupContent = () => {
        return (
            <Popup open={true} style={style} close={() => {
                ReactDOM.unmountComponentAtNode(node);
                node.remove();
            }}>
                {message}
            </Popup >
        );
    };

    ReactDOM.render(<PopupContent />, node);
};

export default popup;