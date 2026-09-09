const DEFAULT_FORMULA = "x^2 + 2x + 1";

export function normalizeFormulaData(data) {
    return {
        formula:
            typeof data?.formula === "string" && data.formula.trim()
                ? data.formula
                : DEFAULT_FORMULA,

        displayMode:
            typeof data?.displayMode === "boolean"
                ? data.displayMode
                : true,

        caption:
            typeof data?.caption === "string"
                ? data.caption
                : "",
    };
}

export function hasFormulaContent(formula) {
    return (
        typeof formula === "string" &&
        formula.trim().length > 0
    );
}

export function getFormulaData(data, formula, displayMode, caption) {
    return {
        ...data,
        formula: formula.trim(),
        displayMode,
        caption: caption.trim(),
    };
}