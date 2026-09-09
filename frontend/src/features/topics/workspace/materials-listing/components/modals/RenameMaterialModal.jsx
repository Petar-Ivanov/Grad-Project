import React, { useState, useEffect } from "react";

export default function RenameMaterialModal({
    isOpen,
    initialName,
    onConfirm,
    onCancel,
    theme,
    isSubmitting = false,
}) {
    const [inputValue, setInputValue] = useState("");

    const themeBg = theme?.spine?.split(' ')[0] || 'bg-indigo-600';

    // locking body scroll and input sync
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setInputValue(initialName || "");
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isOpen, initialName]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onConfirm(inputValue.trim());
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-sm shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                    Rename Material
                </h3>
                
                <input 
                    type="text" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)}
                    autoFocus
                    className={`w-full rounded-lg border border-slate-200 bg-slate-50 text-slate-900 px-3 py-2 text-sm focus:bg-white focus:ring-1 border-transparent outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 mb-6 transition-all ${theme.ring}`}
                />
                
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
                            !inputValue.trim() ||
                            isSubmitting
                        }
                        className={`px-4 py-2 text-sm font-bold text-white rounded-lg shadow-sm disabled:opacity-50 transition-opacity hover:opacity-90 ${themeBg}`}
                    >
                        {
                            isSubmitting
                            ? "Saving..."
                            : "Save"
                        }
                    </button>
                </div>
            </form>
        </div>
    );
}