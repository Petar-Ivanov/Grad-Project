import ParameterEditor from "../../ParameterEditor";
import { useState, useEffect } from "react";

export default function FunctionEditor({data, onSave, onCancel, onDelete, onChange}) {
    const [draftData, setDraftData] = useState(data);

    useEffect(() => {
        setDraftData(data);
    }, [data]);

    // notifying parent of draft data changes 
    useEffect(() => {
        onChange?.(draftData);
    }, [draftData]);

    const updateField = (field, value) => {
        setDraftData((current) => ({
            ...current,
            [field]: value,
        }));
    };

    return (
        <ParameterEditor
            title="Function"
            onSave={() => onSave(draftData)}
            onCancel={onCancel}
            onDelete={onDelete}
        >
            {/* Formula */}
            <div className="flex flex-col gap-1.5">
                <label
                    className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                    Function
                </label>

                <input
                    type="text"
                    value={draftData.formula}
                    onChange={(event) =>
                        updateField("formula", event.target.value)
                    }
                    placeholder="x^2"
                    className="
                        w-full
                        px-3 py-2
                        text-sm
                        font-mono
                        rounded-md
                        border border-slate-300
                        bg-white
                        text-slate-900
                        focus:outline-none
                        focus:ring-2
                        focus:ring-indigo-500
                        focus:border-transparent
                        dark:bg-slate-950
                        dark:border-slate-700
                        dark:text-slate-100
                    "
                />

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Examples: x^2, sin(x), 2*x + 1, sqrt(x)
                </p>
            </div>

            {/* Viewport */}
            <div className="grid grid-cols-2 gap-3">
                <NumberInput
                    label="X minimum"
                    value={draftData.xMin}
                    onChange={(value) =>
                        updateField("xMin", value)
                    }
                />

                <NumberInput
                    label="X maximum"
                    value={draftData.xMax}
                    onChange={(value) =>
                        updateField("xMax", value)
                    }
                />

                <NumberInput
                    label="Y minimum"
                    value={draftData.yMin}
                    onChange={(value) =>
                        updateField("yMin", value)
                    }
                />

                <NumberInput
                    label="Y maximum"
                    value={draftData.yMax}
                    onChange={(value) =>
                        updateField("yMax", value)
                    }
                />
            </div>

            {/* Caption */}
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Caption
                </label>

                <input
                    type="text"
                    value={draftData.caption || ""}
                    onChange={(event) =>
                        updateField("caption", event.target.value)
                    }
                    placeholder="Describe the function..."
                    className="
                        w-full
                        px-3 py-2
                        text-sm
                        rounded-md
                        border border-slate-300
                        bg-white
                        text-slate-900
                        focus:outline-none
                        focus:ring-2
                        focus:ring-indigo-500
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

function NumberInput({label, value, onChange}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {label}
            </label>

            <input
                type="number"
                value={value}
                onChange={(event) => onChange(Number(event.target.value))}
                className="
                    w-full
                    px-3 py-2
                    text-sm
                    rounded-md
                    border border-slate-300
                    bg-white
                    text-slate-900
                    focus:outline-none
                    focus:ring-2
                    focus:ring-indigo-500
                    focus:border-transparent
                    dark:bg-slate-950
                    dark:border-slate-700
                    dark:text-slate-100
                "
            />
        </div>
    );
}