import React, { useState, useEffect } from "react";

export default function LinkSourceModal({
    isOpen,
    initialData,
    onSave,
    onCancel,
    theme,
    isSubmitting = false,
}) {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const buttonTheme = theme?.spine || 'bg-indigo-600';

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setName(initialData?.name || "");
            setUrl(initialData?.url || "");
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() && url.trim()){
            onSave({
                name:
                    name.trim(),

                url:
                    url.trim(),
            });
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-sm shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200"
            >
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5">
                    {initialData ? "Edit Link" : "Add Web Link"}
                </h3>
                
                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
                            Link URL
                        </label>
                        <input 
                            type="url" 
                            value={url} 
                            onChange={(e) => setUrl(e.target.value)}
                            disabled={isSubmitting}
                            placeholder="https://..."
                            autoFocus
                            // className="w-full rounded-lg border border-slate-200 bg-slate-50 text-slate-900 px-3 py-2 text-sm focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 transition-all"
                            className={`w-full rounded-lg border border-slate-200 bg-slate-50 text-slate-900 px-3 py-2 text-sm focus:bg-white outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 transition-all focus:ring-1 border-transparent ${theme.ring}`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
                            Source Name
                        </label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            disabled={isSubmitting}
                            placeholder="e.g., Wikipedia Article"
                            // className="w-full rounded-lg border border-slate-200 bg-slate-50 text-slate-900 px-3 py-2 text-sm focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 transition-all"
                            className={`w-full rounded-lg border border-slate-200 bg-slate-50 text-slate-900 px-3 py-2 text-sm focus:bg-white outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 transition-all focus:ring-1 border-transparent ${theme.ring}`}
                        />
                    </div>
                </div>
                
                <div className="flex justify-end gap-3">
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
                            !url.trim() || 
                            isSubmitting
                        } 
                        className={`px-4 py-2 text-sm font-bold text-white rounded-lg shadow-sm disabled:opacity-50 transition-opacity hover:opacity-90 ${buttonTheme}`}
                    >
                        {isSubmitting ? "Saving..." : "Save Link"}
                    </button>
                </div>
            </form>
        </div>
    );
}