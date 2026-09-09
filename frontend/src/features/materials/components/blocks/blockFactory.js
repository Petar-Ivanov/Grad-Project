import { getBlockPlugin } from "./blockRegistry";

function generateBlockId(type) {
    if (
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
    ) {
        return `block-${type}-${crypto.randomUUID()}`;
    }

    return `block-${type}-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 9)}`;
}

export function createNewBlock(type) {
    const plugin = getBlockPlugin(type);

    if (!plugin) {
        throw new Error(
            `Unknown block type: "${type}".`
        );
    }

    return {
        id: generateBlockId(type),
        type,
        data: plugin.createDefaultData(),
    };
}