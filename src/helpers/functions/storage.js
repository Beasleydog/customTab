export function getBlocks() {
    return JSON.parse(localStorage.getItem("blocks"));
}
export function getBlockById(id) {
    let allBlocks = getBlocks();
    return allBlocks.filter((block) => {
        return block.id === id;
    })[0];
}
export function updateBlocks(blocks) {
    localStorage.setItem("blocks", JSON.stringify(blocks));
}