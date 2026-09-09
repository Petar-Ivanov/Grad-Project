import { useEffect, useState } from "react";
import ParameterEditor from "../../ParameterEditor.jsx";
import { normalizeFormulaData } from "./mathformulaUtils";
import KatexCheatSheet from "./KatexCheatSheet.jsx";

export default function FormulaEditor({data, onSave, onCancel, onDelete, onChange}) {
    const normalizedData = normalizeFormulaData(data);

    const [draftFormula, setDraftFormula] = useState(normalizedData.formula);

    const [draftDisplayMode, setDraftDisplayMode] = useState(normalizedData.displayMode);

    const [draftCaption, setDraftCaption] = useState(normalizedData.caption);

    const [showHelp, setShowHelp] = useState(false);


    useEffect(() => {
        const normalized =
            normalizeFormulaData(data);

        setDraftFormula(normalized.formula);
        setDraftDisplayMode(normalized.displayMode);
        setDraftCaption(normalized.caption);
    }, [data]);

    // notifying parent of draft data changes 
    useEffect(() => {
        onChange?.({
            formula: draftFormula,
            displayMode: draftDisplayMode,
            caption: draftCaption
        });
    }, [draftFormula, draftDisplayMode, draftCaption]);

    const handleSave = () => {
        onSave?.({
            ...data,
            formula: draftFormula.trim(),
            displayMode: draftDisplayMode,
            caption: draftCaption.trim(),
        });
    };

    const handleCancel = () => {
        const normalized = normalizeFormulaData(data);

        setDraftFormula(normalized.formula);
        setDraftDisplayMode(normalized.displayMode);
        setDraftCaption(normalized.caption);

        onCancel?.();
    };

    return (
        <ParameterEditor
            title="Formula"
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={onDelete}
        >
            {/* Formula */}
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Formula
                </label>

                <textarea
                    value={draftFormula}
                    onChange={(e) => setDraftFormula(e.target.value)}
                    rows={3}
                    spellCheck={false}
                    placeholder="e.g. \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}"
                    className="
                        w-full px-3 py-2
                        text-sm font-mono
                        rounded-md
                        border border-slate-300
                        bg-white text-slate-900
                        focus:outline-none
                        focus:ring-2 focus:ring-indigo-500
                        focus:border-transparent
                        dark:bg-slate-950
                        dark:border-slate-700
                        dark:text-slate-100
                    "
                />

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Enter the formula using LaTeX notation.
                </p>

                <button
                    type="button"
                    onClick={() => setShowHelp((previous) => !previous)}
                    className="rounded-md px-2 py-1 text-[11px] font-semibold text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/40 transition-colors"
                    aria-expanded={showHelp}
                >
                    {
                        showHelp
                        ? "Hide Syntax Help"
                        : "View Syntax Help"
                    }
                </button>

                {/* KaTeX Help */}
                {showHelp && (
                    <KatexCheatSheet />
                )}

            </div>

            {/* Display mode */}
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Display Style
                </label>

                <select
                    value={draftDisplayMode ? "display" : "inline"}
                    onChange={(e) =>
                        setDraftDisplayMode(e.target.value === "display")
                    }
                    className="
                        w-full px-3 py-2
                        text-sm rounded-md
                        border border-slate-300
                        bg-white text-slate-900
                        focus:outline-none
                        focus:ring-2 focus:ring-indigo-500
                        dark:bg-slate-950
                        dark:border-slate-700
                        dark:text-slate-100
                    "
                >
                    <option value="display">
                        Display — centered / large
                    </option>

                    <option value="inline">
                        Inline
                    </option>
                </select>
            </div>

            {/* Caption */}
            <div className="flex flex-col gap-1.5 mt-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Caption
                </label>

                <input
                    type="text"
                    value={draftCaption || ""}
                    onChange={(e) => setDraftCaption(e.target.value)}
                    placeholder="A descriptive caption..."
                    className="
                        w-full px-3 py-2
                        text-sm rounded-md
                        border border-slate-300
                        bg-white text-slate-900
                        focus:outline-none
                        focus:ring-2 focus:ring-indigo-500
                        focus:border-transparent
                        dark:bg-slate-950
                        dark:border-slate-700
                        dark:text-slate-100
                    "
                />
            </div>
        </ParameterEditor>
    );
}
