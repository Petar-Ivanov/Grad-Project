import { useEffect, useMemo, useState } from "react";
import {Mafs, Coordinates, Polygon, Point, Circle, Text} from "mafs";
import { ResetIcon } from "../../../../../components/icons/index.jsx";
import ShapeEditor from "./2DShapeEditor";

import {
    normalizeShapeData,
    createShapePoints,
    getSideLengths,
    getLabelPositions,
    getSideLabelPositions,
    getViewBox,
    formatLength,
    getShapeParameters,
    SHAPE_TYPES,
} from "./2dshapeUtils";

export default function ShapeBlock({data, isEditing, setIsEditing, onUpdate, onDelete}) {
    const normalizedData = useMemo(() => normalizeShapeData(data), [data]);

    const [currentData, setCurrentData] = useState(normalizedData);

    const [playgroundData, setPlaygroundData] = useState(normalizedData);

    // keeping sync with system data
    useEffect(() => {
        const normalized = normalizeShapeData(data);

        setCurrentData(normalized);
        setPlaygroundData(normalized);
    }, [data]);

    useEffect(() => {
        if (isEditing) {
            setPlaygroundData(currentData);
        }
    }, [isEditing, currentData]);

    const shapeData =
        isEditing
            ? playgroundData
            : playgroundData;

    const points = useMemo(() =>
        createShapePoints(
            shapeData.shapeType,
            shapeData.parameters
        ),
        [
            shapeData.shapeType,
            shapeData.parameters,
        ]
    );

    const sideLengths = useMemo(() => getSideLengths(points), [points]);

    const labelPositions = useMemo(() => getLabelPositions(points), [points]);

    const sideLabelPositions = useMemo(() => getSideLabelPositions(points), [points]);

    const viewBox = useMemo(() => getViewBox(points), [points]);

    const isCircle = 
        shapeData.shapeType === "circle";

    const circleRadius = Number(shapeData.parameters.radius) || 1;

    // change (play around) without calling onUpdate 
    const updatePlaygroundParameter = (key, value) => {
        setPlaygroundData((previous) => ({
            ...previous,
            parameters: {
                ...previous.parameters,
                [key]: value,
            },
        }));
    };

    const handleEditorSave = (newData) => {
        const normalized = normalizeShapeData(newData);

        setCurrentData(normalized);
        setPlaygroundData(normalized);

        onUpdate?.(normalized);
        setIsEditing(false);
    };

    const handleEditorCancel = () => {
        setPlaygroundData(currentData);
        setIsEditing(false);
    };

    const parameters =
        getShapeParameters(shapeData.shapeType);

    return (
        <div className="my-8">

            {/* Permanent editor */}
            {isEditing && (
                <ShapeEditor
                    data={currentData}
                    onChange={setPlaygroundData}
                    onSave={handleEditorSave}
                    onCancel={handleEditorCancel}
                    onDelete={onDelete}
                />
            )}

            {/* Visualization */}
            <div
                className={`
                    overflow-hidden rounded-xl
                    border border-slate-200
                    bg-white shadow-sm
                    dark:border-slate-800
                    dark:bg-slate-950
                `}
            >
                <div className="w-full">
                    <Mafs
                        viewBox={viewBox}
                        preserveAspectRatio="contain"
                        zoom={{min: 0.5, max: 3}}
                        pan
                        height={420}
                    >
                        <Coordinates.Cartesian
                            subdivisions={2}
                        />

                        {!isCircle && (
                            <Polygon
                                points={points}
                                color="var(--mafs-blue)"
                                fillOpacity={0.15}
                                weight={2.5}
                            />
                        )}

                        {isCircle && (
                            <Circle
                                center={[0, 0]}
                                radius={circleRadius}
                                color="var(--mafs-blue)"
                                fillOpacity={0.15}
                                weight={2.5}
                            />
                        )}

                        {/* Vertices */}
                        {!isCircle &&
                            points.map(
                                (point, index) => (
                                    <Point
                                        key={`point-${index}`}
                                        x={point[0]}
                                        y={point[1]}
                                        color="var(--mafs-blue)"
                                    />
                                )
                            )}

                        {/* Vertex labels */}
                        {!isCircle &&
                            points.map(
                                (point, index) => (
                                    <Text
                                        key={`label-${index}`}
                                        x={labelPositions[index][0]}
                                        y={labelPositions[index][1]}
                                        size={18}
                                        attach="center"
                                    >
                                        {shapeData.labels[index] ?? String.fromCharCode(65 + index)}
                                    </Text>
                                )
                            )}

                        {/* Side lengths */}
                        {!isCircle &&
                            sideLengths.map((length, index) => (
                                <Text
                                    key={`side-${index}`}
                                    x={sideLabelPositions[index][0]}
                                    y={sideLabelPositions[index][1]}
                                    size={14}
                                    attach="center"
                                >
                                    {formatLength(length)}
                                </Text>
                            ))
                        }

                        {/* Circle information */}
                        {isCircle && (
                            <>
                                <Point
                                    x={0}
                                    y={0}
                                />

                                <Text
                                    x={circleRadius / 2}
                                    y={0.2}
                                    size={14}
                                    attach="center"
                                >
                                    r ={" "}
                                    {formatLength(circleRadius)}
                                </Text>
                            </>
                        )}
                    </Mafs>
                </div>

                {/* Playground controls */}
                {!isEditing && (
                    <div className="border-t border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Explore
                            </span>

                            <button
                                onClick={() =>
                                    setPlaygroundData(currentData)
                                }
                                className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                            >
                                <ResetIcon className="h-3.5 w-3.5"/>
                                Reset
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {parameters.map(
                                (parameter) => {
                                    const value = shapeData.parameters[parameter.key];

                                    return (
                                        <div
                                            key={parameter.key}
                                            className="flex flex-col gap-2"
                                        >
                                            <div className="flex justify-between">
                                                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                                    {parameter.label}
                                                </label>

                                                <span className="text-xs tabular-nums text-slate-500">
                                                    {value}
                                                </span>
                                            </div>

                                            <input
                                                type="range"
                                                min={parameter.min}
                                                max={parameter.max}
                                                step={parameter.step}
                                                value={value}
                                                onChange={(e) =>
                                                    updatePlaygroundParameter(
                                                        parameter.key,
                                                        Number(e.target.value)
                                                    )
                                                }
                                                className="w-full accent-indigo-600"
                                            />
                                        </div>
                                    );
                                }
                            )}
                        </div>

                        {isCircle && (
                            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                                Changes here are temporary. Use
                                the block editor to permanently
                                change the shape.
                            </p>
                        )}
                    </div>
                )}

                {/* Caption */}
                {shapeData.caption && (
                    <div className="border-t border-slate-100 px-4 py-3 text-center text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
                        {shapeData.caption}
                    </div>
                )}
            </div>
        </div>
    );
}