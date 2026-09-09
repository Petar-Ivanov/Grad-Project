
export function updateBlockInList(blocks, blockId, newData) {
    return blocks.map((block) =>
        block.id === blockId
            ? {
                  ...block,
                  data: newData,
              }
            : block
    );
}

export function insertBlock(blocks, newBlock, position, targetBlockId) {
    if (position === "end") {
        return [...blocks, newBlock];
    }

    const targetIndex = blocks.findIndex(
        (block) => 
            block.id === targetBlockId
    );

    if (targetIndex === -1) {
        return blocks;
    }

    const newBlocks = [...blocks];

    const insertIndex =
        position === "above"
            ? targetIndex
            : targetIndex + 1;

    newBlocks.splice(insertIndex, 0, newBlock);

    return newBlocks;
}

// export function insertBlock(blocks, newBlock, position, targetBlockId) {
//     const targetIndex = blocks.findIndex(
//         (block) => block.id === targetBlockId
//     );

//     if (targetIndex === -1) {
//         return blocks;
//     }

//     const newBlocks = [...blocks];

//     const insertIndex =
//         position === "above"
//             ? targetIndex
//             : targetIndex + 1;

//     newBlocks.splice(insertIndex, 0, newBlock);

//     return newBlocks;
// }

export function moveBlockInList(blocks, blockId, direction) {
    const currentIndex = blocks.findIndex(
        (block) => block.id === blockId
    );

    if (currentIndex === -1) {
        return blocks;
    }

    if (direction === "up" && currentIndex === 0) {
        return blocks;
    }

    if (direction === "down" && currentIndex === blocks.length - 1) {
        return blocks;
    }

    const newBlocks = [...blocks];

    const targetIndex =
        direction === "up"
            ? currentIndex - 1
            : currentIndex + 1;

    [
        newBlocks[currentIndex],
        newBlocks[targetIndex],
    ] = [
        newBlocks[targetIndex],
        newBlocks[currentIndex],
    ];

    return newBlocks;
}

export function deleteBlockFromList(blocks, blockId) {
    return blocks.filter(
        (block) => block.id !== blockId
    );
}