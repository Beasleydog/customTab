import { useState, useEffect } from "react";

export function deleteStoredValues(id) {
    //Delete all stored values for a block by id
    Object.keys({ ...localStorage }).forEach((objectKey) => {
        if (objectKey.includes(id)) {
            localStorage.removeItem(objectKey);
        }
    })
}
export function getBlocks() {
    return JSON.parse(localStorage.getItem("blocks") || "[]");
}
export function getBlockById(id) {
    let allBlocks = getBlocks();
    return allBlocks.filter((block) => {
        return block.id === id;
    })[0];
}
export function updateBlock(id, newBlock) {
    let allBlocks = getBlocks();
    allBlocks = allBlocks.map((x) => {
        if (x.id === id) {
            return newBlock;
        }
        return x;
    });
    updateBlocks(allBlocks);
}
export function updateBlocks(blocks) {
    localStorage.setItem("blocks", JSON.stringify(blocks));
}
export function getBackground() {
    return JSON.parse(localStorage.getItem("background"));
}
export function updateBackground(background) {
    localStorage.setItem("background", JSON.stringify(background));
}
export function setStoredValue(key, value) {
    localStorage.setItem(key, value);
    window.dispatchEvent(new Event('storage'))
}
export function deleteStoredValue(key) {
    localStorage.removeItem(key);
    window.dispatchEvent(new Event('storage'))
}
export function getStoredValue(key) {
    try {
        return JSON.parse(localStorage.getItem(key))
    } catch {
        return localStorage.getItem(key)
    }
}
export function useStoredValue(key, fallback) {
    const [value, setValue] = useState(getStoredValue(key));
    useEffect(() => {
        const handleStorage = () => {
            console.log("storage changed", key, value, getStoredValue(key));
            if (JSON.stringify(getStoredValue(key)) !== JSON.stringify(value)) {
                setValue(getStoredValue(key));
                console.log("actually rerendering");
            }
        };
        console.log("adding new listner");
        window.addEventListener("storage", handleStorage);
        return () => {
            window.removeEventListener("storage", handleStorage);
        };
    }, [key, value]);
    return value || fallback;
}