import React, { useState, useEffect } from "react";

export default function TextSourceModal({
    isOpen,
    initialData,
    onSave,
    onCancel,
    theme,
    isSubmitting = false,
}) {
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const buttonTheme = theme?.spine || 'bg-indigo-600';

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setName(initialData?.name || "");
            setContent(initialData?.content || "");
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() && content.trim()){
            onSave({ 
                name: name.trim(), 
                content: content.trim() 
            });
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-2xl shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
            >
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5">
                    {initialData ? "Edit Text Source" : "Add Text Source"}
                </h3>
                
                <div className="space-y-4 overflow-y-auto pr-1 flex-grow mb-6 no-scrollbar">
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
                            Source Name
                        </label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            disabled={isSubmitting}
                            placeholder="e.g., Chapter 1 Summary"
                            className={`w-full rounded-lg border border-slate-200 bg-slate-50 text-slate-900 px-3 py-2 text-sm focus:bg-white outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 transition-all focus:ring-1 border-transparent ${theme.ring}`}
                        />
                    </div>
                    <div className="flex flex-col flex-grow h-64">
                        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
                            Content
                        </label>
                        <textarea 
                            value={content} 
                            onChange={(e) => setContent(e.target.value)}
                            disabled={isSubmitting}
                            placeholder="Paste your text here..."
                            className={`w-full flex-grow resize-none rounded-lg border border-slate-200 bg-slate-50 text-slate-900 px-4 py-3 text-sm focus:bg-white outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 transition-all focus:ring-1 border-transparent ${theme.ring}`}
                        />
                    </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 shrink-0">
                    <button 
                        type="button" 
                        onClick={onCancel} 
                        disabled={isSubmitting}
                        className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        disabled={
                            !name.trim() || 
                            !content.trim() ||
                            isSubmitting
                        } 
                        className={`px-4 py-2 text-sm font-bold text-white rounded-lg shadow-sm disabled:opacity-50 transition-opacity hover:opacity-90 ${buttonTheme}`}
                    >
                        {isSubmitting ? "Saving..." : "Save Source"}
                    </button>
                </div>
            </form>
        </div>
    );
}