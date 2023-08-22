/*global chrome*/

import { useState, useEffect } from "react";

const TOKEN_LISTENERS = [];

export function useAuthToken() {
    const [authToken, setAuthToken] = useState(null);

    const callback = (token) => {
        setAuthToken(token);
    }

    useEffect(() => {
        (async () => {
            chrome.identity.getAuthToken({}, function (token) {
                if (token) {
                    setAuthToken(token);
                } else {
                    TOKEN_LISTENERS.push(callback);
                }
            });

        })();

        return () => {
            TOKEN_LISTENERS.splice(TOKEN_LISTENERS.indexOf(callback), 1);
        }
    }, []);

    return authToken;
}
export function getAuthToken() {
    return new Promise((resolve) => {
        chrome.identity.getAuthToken({}, function (token) {
            if (token) {
                resolve(token);
            } else {
                resolve(null);
            }
        });
    });
}
export async function requestAuthToken() {
    let token = new Promise((resolve, reject) => {
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
            if (token) {
                TOKEN_LISTENERS.forEach((callback) => {
                    callback(token);
                });
                resolve(token);
            } else {
                resolve(null);
            }
        });
    });

    return token;
}