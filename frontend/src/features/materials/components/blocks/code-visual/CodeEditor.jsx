import { useState, useEffect } from "react";
import ParameterEditor from "../../ParameterEditor.jsx";
import { CODE_LANGUAGES } from "./codeUtils";

export default function CodeEditor({data, onSave, onCancel, onDelete}) {
    const [draftData, setDraftData] = useState(data);

    useEffect(() => {
        setDraftData(data);
    }, [data]);

    const updateField = (field, value) => {
        setDraftData((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const handleSave = () => {
        onSave?.(draftData);
    };

    return (
        <ParameterEditor
            title="Code"
            onSave={handleSave}
            onCancel={onCancel}
            onDelete={onDelete}
        >
            {/* Language */}
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Language
                </label>

                <select
                    value={draftData.language}
                    onChange={(e) =>
                        updateField("language", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100"
                >
                    {CODE_LANGUAGES.map((language) => (
                        <option
                            key={language.value}
                            value={language.value}
                        >
                            {language.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Code */}
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Code
                </label>

                <textarea
                    value={draftData.code}
                    onChange={(e) => updateField("code", e.target.value)}
                    spellCheck={false}
                    className="w-full min-h-[300px] resize-y px-4 py-3 text-sm font-mono leading-relaxed rounded-md border border-slate-300 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    placeholder="// Enter your code here..."
                />
            </div>

            {/* Caption */}
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="code-caption"
                    className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                    Caption
                    <span className="ml-1 font-normal text-slate-400">
                        (Optional)
                    </span>
                </label>

                <input
                    id="code-caption"
                    type="text"
                    value={draftData.caption ?? ""}
                    onChange={(e) =>
                        updateField("caption", e.target.value)
                    }
                    placeholder="Describe what this code demonstrates..."
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
            </div>
        </ParameterEditor>
    );
}
