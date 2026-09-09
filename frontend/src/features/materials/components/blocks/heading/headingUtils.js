const DEFAULT_HEADING_LEVEL = 2;

export const HEADING_LEVELS = {
    2: "H2 Section",
    3: "H3 Subsection",
    4: "H4 Topic",
    5: "H5 Subtopic",
    6: "H6 Detail",
};

export const HEADING_STYLES = {
    1: "text-4xl font-extrabold tracking-tight mt-6 mb-4",
    2: "text-2xl font-bold mt-5 mb-3 border-b border-slate-200 pb-2 dark:border-slate-800",
    3: "text-xl font-semibold mt-4 mb-2",
    4: "text-lg font-medium mt-3 mb-2",
    5: "text-base font-medium mt-2 mb-1 text-slate-800 dark:text-slate-200",
    6: "text-sm font-semibold uppercase tracking-wider text-slate-500 mt-2 mb-1",
};

export function normalizeHeadingLevel(level) {
    const numericLevel = Number(level);

    if (numericLevel >= 1 && numericLevel <= 6) {
        return numericLevel;
    }

    return DEFAULT_HEADING_LEVEL;
}

export function getHeadingData(data = {}) {
    return {
        ...data,
        text: data.text ?? "<h2>New Section Heading</h2>",
        level: normalizeHeadingLevel(data.level),
    };
}

export function getHeadingStyle(level) {
    return HEADING_STYLES[normalizeHeadingLevel(level)] ?? HEADING_STYLES[DEFAULT_HEADING_LEVEL];
}

export function getHeadingEditorData(editor, data, level) {
    return {
        ...data,
        text: editor.getHTML(),
        level: normalizeHeadingLevel(level),
    };
}

export const DEFAULT_HEADING_DATA = {
    text: "<h2>New Section Heading</h2>",
    level: DEFAULT_HEADING_LEVEL,
};