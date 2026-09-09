import { useEffect, useState } from "react";

import ParameterEditor from "../../ParameterEditor";

import {SHAPE_TYPES, getShapeParameters, normalizeShapeData, getPointCount} from "./2dshapeUtils";

export default function ShapeEditor({data, onSave, onCancel, onDelete, onChange}) {
    const [draftData, setDraftData] =
        useState(() => normalizeShapeData(data));

    useEffect(() => {
        setDraftData(normalizeShapeData(data));
    }, [data]);

    // notifying parent of draft data changes 
    useEffect(() => {
        onChange?.(draftData);
    }, [draftData]);

    const shapeParameters = getShapeParameters(draftData.shapeType);

    const pointCount =
        getPointCount(
            draftData.shapeType,
            draftData.parameters
        );

    const isCircle =
        draftData.shapeType === "circle";

    const updateParameter = (key, value) => {
        setDraftData((previous) => ({
            ...previous,
            parameters: {
                ...previous.parameters,
                [key]: value,
            },
        }));
    };

    const handleShapeTypeChange = (shapeType) => {
        const definition = SHAPE_TYPES[shapeType];

        const parameters = {};

        definition.parameters.forEach((parameter) => {
            parameters[parameter.key] = parameter.default;
        });

        const newPointCount = getPointCount(shapeType, parameters);

        setDraftData({
            ...draftData,
            shapeType,
            parameters,
            labels: Array.from(
                { length: newPointCount },
                (_, index) => String.fromCharCode(65 + index)
            ),
        });
    };

    const updateLabel = (index, value) => {
        const labels = [
            ...(draftData.labels || []),
        ];

        labels[index] = value;

        setDraftData({
            ...draftData,
            labels,
        });
    };

    return (
        <div className="mb-6">
            <ParameterEditor
                title="2D Shape"
                onSave={() => onSave(draftData)}
                onCancel={onCancel}
                onDelete={onDelete}
            >
                <div className="space-y-6">

                    {/* Shape type */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Shape Type
                        </label>

                        <select
                            value={draftData.shapeType}
                            onChange={(e) =>
                                handleShapeTypeChange(e.target.value)
                            }
                            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                        >
                            {Object.entries(SHAPE_TYPES).map(([type, definition]) => (
                                <option
                                    key={type}
                                    value={type}
                                >
                                    { definition.label }
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Shape parameters */}
                    <div>
                        <label className="mb-3 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Shape Parameters
                        </label>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {shapeParameters.map((parameter) => (
                                <div
                                    key={parameter.key}
                                    className="flex flex-col gap-1.5"
                                >
                                    <label className="text-xs text-slate-600 dark:text-slate-400">
                                        {parameter.label}
                                    </label>

                                    <input
                                        type="number"
                                        min={parameter.min}
                                        max={parameter.max}
                                        step={parameter.step}
                                        value={draftData.parameters[parameter.key]}
                                        onChange={(e) =>
                                            updateParameter(parameter.key, Number(e.target.value))
                                        }
                                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Vertex labels */}
                    {!isCircle && (
                        <div>
                            <label className="mb-3 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                                Point Labels
                            </label>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {Array.from({length: pointCount}).map((_, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col gap-1.5"
                                        >
                                            <label className="text-xs text-slate-500 dark:text-slate-400">
                                                Point{" "}
                                                {index + 1}
                                            </label>

                                            <input
                                                type="text"
                                                maxLength={6}
                                                value={draftData.labels[index] ?? ""}
                                                onChange={(e) =>
                                                    updateLabel(index, e.target.value)
                                                }
                                                placeholder={String.fromCharCode(65 + index)}
                                                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    {/* Caption */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Caption
                        </label>

                        <input
                            type="text"
                            value={draftData.caption || ""}
                            onChange={(e) =>
                                setDraftData({
                                    ...draftData,
                                    caption: e.target.value,
                                })
                            }
                            placeholder="A descriptive caption..."
                            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                        />
                    </div>

                </div>
            </ParameterEditor>
        </div>
    );
}