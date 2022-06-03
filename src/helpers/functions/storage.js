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
}
export function getStoredValue(key) {
    try {
        return JSON.parse(localStorage.getItem(key))
    } catch {
        return localStorage.getItem(key)
    }
}
export function setStoredEditing(value) {
    localStorage.setItem("editing", value);
}
export function getStoredEditing() {
    //Parse to turn 'true' into true
    return JSON.parse(localStorage.getItem("editing"));
}