export function getBlocks() {
    return JSON.parse(localStorage.getItem("blocks"));
}
export function updateBlocks(blocks) {
    localStorage.setItem("blocks", JSON.stringify(blocks));
}