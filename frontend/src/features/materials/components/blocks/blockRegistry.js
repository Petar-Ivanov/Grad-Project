
function validatePlugin(plugin) {
    if (!plugin || typeof plugin !== "object") {
        throw new Error(
            "Invalid block plugin."
        );
    }

    if (typeof plugin.type !== "string" || !plugin.type) {
        throw new Error(
            "Block plugin must define a non-empty type."
        );
    }

    if (typeof plugin.createDefaultData !== "function") {
        throw new Error(
            `Block "${plugin.type}" must define createDefaultData().`
        );
    }

    if (typeof plugin.loadComponent !== "function") {
        throw new Error(
            `Block "${plugin.type}" must define loadComponent().`
        );
    }
}

const pluginModules = import.meta.glob(
    "./*/plugin.js",
    {
        eager: true,
        import: "default",
    }
);

const plugins = Object.values(pluginModules);

const registry = new Map();


for (const plugin of plugins) {
    validatePlugin(plugin);

    if (registry.has(plugin.type)) {
        throw new Error(
            `Duplicate block type: "${plugin.type}".`
        );
    }

    registry.set(plugin.type, plugin);
}

export const blockRegistry = registry;

export function getBlockPlugin(type) {
    return blockRegistry.get(type) ?? null;
}

export function getBlockLabelData(type) {
    const plugin = getBlockPlugin(type);

    if (!plugin) {
        return { label: type, Icon: null };
    }

    return { 
        label: plugin.label, 
        Icon: plugin.icon 
    };
}

export function getAllBlockLabelsData() {
    return [...blockRegistry.entries()].map(([type, plugin]) => ({
        type,
        label: plugin.label,
        Icon: plugin.icon
    }));
}
