import { useEffect, useMemo, useState } from "react";
import CodeEditor from "./CodeEditor";
import {
    normalizeCodeData,
    highlightCode,
    getLanguageLabel,
    hasCodeContent,
} from "./codeUtils";

export default function CodeBlock({data, isEditing, setIsEditing, onUpdate, onDelete}) {
    const normalizedData = useMemo(
        () => normalizeCodeData(data),
        [data]
    );

    const [currentData, setCurrentData] =
        useState(normalizedData);

    // synchronizing data with the backend
    useEffect(() => {
        setCurrentData(normalizedData);
    }, [normalizedData]);

    const highlightedCode = useMemo(() =>
        highlightCode(
            currentData.code,
            currentData.language
        ),
        [
            currentData.code,
            currentData.language,
        ]
    );

    const languageLabel = getLanguageLabel(
        currentData.language
    );

    const handleSave = (newData) => {
        setCurrentData(newData);
        setIsEditing(false);

        onUpdate?.(newData);
    };

    const handleCancel = () => {
        setCurrentData(normalizedData);
        setIsEditing(false);
    };

    const handleDelete = () => {
        onDelete?.();
    };

    if (!isEditing && !hasCodeContent(currentData.code)) {
        return null;
    }

    return (
        <div className="my-6">
            {/* Editor */}
            {isEditing && (
                <div className="mb-6">
                    <CodeEditor
                        data={currentData}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        onDelete={handleDelete}
                    />
                </div>
            )}

            {/* Code Display */}
            {!isEditing && (
                <>
                    <figure className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                {languageLabel}
                            </span>
                        </div>

                        {/* Code */}
                        <pre
                            className="
                                overflow-x-auto
                                p-5
                                m-0
                                bg-slate-50 dark:bg-slate-950
                                text-sm
                                leading-relaxed
                                font-mono
                                text-slate-800 dark:text-slate-100
                                
                                [&_.token.comment]:text-slate-400 dark:[&_.token.comment]:text-slate-500
                                [&_.token.prolog]:text-slate-400 dark:[&_.token.prolog]:text-slate-500
                                [&_.token.doctype]:text-slate-400 dark:[&_.token.doctype]:text-slate-500
                                [&_.token.cdata]:text-slate-400 dark:[&_.token.cdata]:text-slate-500
                                [&_.token.punctuation]:text-slate-500 dark:[&_.token.punctuation]:text-slate-400
                                
                                [&_.token.property]:text-sky-600 dark:[&_.token.property]:text-sky-300
                                [&_.token.tag]:text-sky-600 dark:[&_.token.tag]:text-sky-300
                                
                                [&_.token.boolean]:text-orange-600 dark:[&_.token.boolean]:text-orange-300
                                [&_.token.number]:text-orange-600 dark:[&_.token.number]:text-orange-300
                                [&_.token.constant]:text-orange-600 dark:[&_.token.constant]:text-orange-300
                                [&_.token.symbol]:text-orange-600 dark:[&_.token.symbol]:text-orange-300
                                [&_.token.regex]:text-orange-600 dark:[&_.token.regex]:text-orange-300
                                
                                [&_.token.selector]:text-emerald-600 dark:[&_.token.selector]:text-emerald-300
                                [&_.token.attr-name]:text-cyan-600 dark:[&_.token.attr-name]:text-cyan-300
                                [&_.token.string]:text-emerald-600 dark:[&_.token.string]:text-emerald-300
                                [&_.token.char]:text-emerald-600 dark:[&_.token.char]:text-emerald-300
                                [&_.token.inserted]:text-emerald-600 dark:[&_.token.inserted]:text-emerald-300
                                [&_.token.attr-value]:text-emerald-600 dark:[&_.token.attr-value]:text-emerald-300
                                
                                [&_.token.builtin]:text-cyan-600 dark:[&_.token.builtin]:text-cyan-300
                                [&_.token.url]:text-cyan-600 dark:[&_.token.url]:text-cyan-300
                                
                                [&_.token.operator]:text-pink-600 dark:[&_.token.operator]:text-pink-300
                                [&_.token.entity]:text-pink-600 dark:[&_.token.entity]:text-pink-300
                                
                                [&_.token.variable]:text-yellow-600 dark:[&_.token.variable]:text-yellow-300
                                [&_.token.function]:text-yellow-600 dark:[&_.token.function]:text-yellow-300
                                [&_.token.class-name]:text-yellow-600 dark:[&_.token.class-name]:text-yellow-300
                                
                                [&_.token.atrule]:text-purple-600 dark:[&_.token.atrule]:text-purple-300
                                [&_.token.keyword]:text-purple-600 dark:[&_.token.keyword]:text-purple-300
                                
                                [&_.token.important]:text-red-600 dark:[&_.token.important]:text-red-300
                            "
                        >
                            <code
                                className={`language-${currentData.language}`}
                                dangerouslySetInnerHTML={{
                                    __html: highlightedCode,
                                }}
                            />
                        </pre>

                        
                    </figure>

                    {currentData.caption && (
                        <figcaption className="mt-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400">
                            {currentData.caption}
                        </figcaption>
                    )}
                </>
            )}
            
        </div>
    );
}