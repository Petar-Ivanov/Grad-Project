export const DEFAULT_FUNCTION_DATA = {
    formula: "x^2",
    caption: "Graph of f(x) = x²",
    xMin: -5,
    xMax: 5,
    yMin: -2,
    yMax: 10,
};

export function normalizeFunctionData(data = {}) {
    return {
        ...DEFAULT_FUNCTION_DATA,
        ...data,

        formula:
            typeof data.formula === "string"
                ? data.formula
                : DEFAULT_FUNCTION_DATA.formula,

        caption:
            typeof data.caption === "string"
                ? data.caption
                : DEFAULT_FUNCTION_DATA.caption,

        xMin: toFiniteNumber(
            data.xMin,
            DEFAULT_FUNCTION_DATA.xMin
        ),

        xMax: toFiniteNumber(
            data.xMax,
            DEFAULT_FUNCTION_DATA.xMax
        ),

        yMin: toFiniteNumber(
            data.yMin,
            DEFAULT_FUNCTION_DATA.yMin
        ),

        yMax: toFiniteNumber(
            data.yMax,
            DEFAULT_FUNCTION_DATA.yMax
        ),
    };
}

function toFiniteNumber(value, fallback) {
    const number = Number(value);

    return Number.isFinite(number)
        ? number
        : fallback;
}

// formula to js function
export function createFunctionFromFormula(formula) {
    if (typeof formula !== "string") {
        throw new Error("Formula must be a string.");
    }

    const normalizedFormula = normalizeFormula(formula);

    if (!normalizedFormula) {
        throw new Error("Formula cannot be empty.");
    }

    try {
        const fn = new Function(
            "x",
            `
                "use strict";

                const {
                    sin,
                    cos,
                    tan,
                    asin,
                    acos,
                    atan,
                    sqrt,
                    abs,
                    log,
                    log10,
                    exp,
                    pow,
                    floor,
                    ceil,
                    round,
                    min,
                    max,
                    PI,
                    E
                } = Math;

                return ${normalizedFormula};
            `
        );

        // Test the generated function before giving it
        // to Mafs.
        const testValue = fn(1);

        if (typeof testValue !== "number" || Number.isNaN(testValue)) {
            throw new Error(
                "Formula did not produce a valid number."
            );
        }

        return (x) => {
            const result = fn(x);

            return typeof result === "number"
                ? result
                : NaN;
        };

    } catch (error) {
        throw new Error(`Invalid function formula: ${error.message}`);
    }
}

function normalizeFormula(formula) {
    return formula
        .trim()
        .replace(/\^/g, "**")
        .replace(/\bpi\b/gi, "PI")
        .replace(/\be\b/g, "E");
}

export function isValidFormula(formula) {
    try {
        createFunctionFromFormula(formula);
        return true;
    } catch {
        return false;
    }
}