import { useEffect, useMemo, useState } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

import FormulaEditor from "./MathFormulaEditor";
import {
    normalizeFormulaData,
    hasFormulaContent,
} from "./mathformulaUtils";

export default function FormulaBlock({data, isEditing, setIsEditing, onUpdate, onDelete}) {
    const normalizedData = normalizeFormulaData(data);
    const [currentData, setCurrentData] = useState(normalizedData);


    const [draftData, setDraftData] = useState(normalizedData);

    // keeping state in sync with external data
    useEffect(() => {
        const normalized = normalizeFormulaData(data);
        setCurrentData(normalized);
        setDraftData(normalized);
    }, [data]);

    // resetting draft on editing start
    useEffect(() => {
        if (isEditing) {
            setDraftData(currentData);
        }
    }, [isEditing, currentData]);

    const displayData = isEditing ? draftData : currentData;


    const renderedFormula = useMemo(() => {
        if (!hasFormulaContent(displayData.formula)) {
            return "";
        }

        try {
            return katex.renderToString(
                displayData.formula,
                {
                    displayMode: displayData.displayMode,
                    throwOnError: false,
                    strict: "warn",
                }
            );
        } catch (error) {
            console.warn("Unable to render formula:", error);
            return "";
        }
    }, [
        displayData.formula,
        displayData.displayMode,
    ]);

    const handleSave = (updatedData) => {
        setCurrentData(updatedData);
        setDraftData(updatedData);
        onUpdate?.(updatedData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setDraftData(currentData);
        setIsEditing(false);
    };

    if (!isEditing && !hasFormulaContent(currentData.formula)) {
        return null;
    }

    return (
        <div className="my-6">
            {/* Editor */}
            {isEditing && (
                <div className="mb-6">
                    <FormulaEditor
                        data={currentData}
                        onChange={setDraftData}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        onDelete={onDelete}
                    />
                </div>
            )}

            {/* Formula */}
            {hasFormulaContent(displayData.formula) && (
                <>
                    <div
                        className="overflow-x-auto py-6 px-4 text-slate-900 dark:text-slate-100"
                    >
                        <div
                            className="flex justify-center min-w-fit"
                            dangerouslySetInnerHTML={{
                                __html: renderedFormula,
                            }}
                        />
                    </div>

                    {/* Caption */}
                    {displayData.caption && (
                        <figcaption
                            className="mt-2 text-center text-xs font-medium text-slate-500 dark:text-slate-400"
                        >
                            {displayData.caption}
                        </figcaption>
                    )}
                </>
            )}
        </div>
    );
}