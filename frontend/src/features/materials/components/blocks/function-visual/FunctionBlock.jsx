import {useEffect, useMemo, useState} from "react";
import {Mafs, Coordinates, Plot} from "mafs";
import FunctionEditor from "./FunctionEditor";
import {
    createFunctionFromFormula,
    normalizeFunctionData,
} from "./functionUtils";

export default function FunctionBlock({data, isEditing, setIsEditing, onUpdate, onDelete}) {
    const currentData = useMemo(() => normalizeFunctionData(data), [data]);

    const [draftData, setDraftData] = useState(currentData);

    const [exploratoryFormula, setExploratoryFormula] = useState(currentData.formula);
    const [formulaError, setFormulaError] = useState(null);

    useEffect(() => {
        setDraftData(currentData);
        setExploratoryFormula(currentData.formula);
        setFormulaError(null);
    }, [currentData]);

    // resetting draft when edit mode starts
    useEffect(() => {
        if (isEditing) {
            setDraftData(currentData);
        }
    }, [isEditing, currentData]);

    const displayData = isEditing ? draftData : currentData;
    const activeFormula = isEditing ? draftData.formula : exploratoryFormula;

    const exploratoryFunction = useMemo(() => {
        try {
            const fn = createFunctionFromFormula(activeFormula); 
            setFormulaError(null);
            return fn;
        } catch (error) {
            setFormulaError(error.message);
            return null;
        }
    }, [activeFormula]);

    const handleExploratoryFormulaChange = (event) => {
        setExploratoryFormula(event.target.value);
    };
    
    const handleSave = (updatedData) => {
        setDraftData(updatedData); 
        onUpdate?.(updatedData);
        setIsEditing(false);
        setExploratoryFormula(updatedData.formula);
        setFormulaError(null);
    };

    const handleCancel = () => {
        setDraftData(currentData);
        setIsEditing(false);
        setExploratoryFormula(currentData.formula); 
    };

    return (
        <div className="my-8">
            {/* Permanent block editor */}
            {isEditing && (
                <div className="mb-6">
                    <FunctionEditor
                        data={currentData}
                        onChange={setDraftData} 
                        onSave={handleSave}
                        onCancel={handleCancel}
                        onDelete={onDelete}
                    />
                </div>
            )}

            {/* Interactive visualization */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="w-full">
                    <Mafs
                        height={400}
                        viewBox={{
                            x: [displayData.xMin, displayData.xMax],
                            y: [displayData.yMin, displayData.yMax],
                        }}
                        preserveAspectRatio={false}
                        pan
                        zoom={{min: 0.5, max: 5}}
                    >
                        <Coordinates.Cartesian subdivisions={2} />

                        {exploratoryFunction && (
                            <Plot.OfX
                                y={exploratoryFunction}
                                domain={[displayData.xMin, displayData.xMax]}
                                weight={2.5}
                            />
                        )}
                    </Mafs>
                </div>

                {/* Formula playground */}
                {!isEditing && (
                    <div className="border-t border-slate-200 dark:border-slate-800 px-5 py-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <span className="text-lg font-serif italic text-slate-700 dark:text-slate-300 shrink-0">
                                f(x) =
                            </span>

                            <input
                                type="text"
                                value={exploratoryFormula}
                                onChange={handleExploratoryFormulaChange}
                                spellCheck={false}
                                aria-label="Interactive function formula"
                                className="flex-1 px-3 py-2 rounded-md border border-slate-300 bg-slate-50 text-slate-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
                            />
                        </div>

                        {formulaError && (
                            <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                                {formulaError}
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Caption */}
            {displayData.caption && (
                <div className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400 text-center">
                    {displayData.caption}
                </div>
            )}
        </div>
    );
}