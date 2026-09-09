import React, { useEffect } from "react";

export default function DeleteMaterialModal({
    isOpen,
    itemName,
    onConfirm,
    onCancel,
    isSubmitting = false,
}) {
    
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-sm shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    Delete Material
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                    Are you sure you want to delete <span className="font-semibold text-slate-900 dark:text-slate-200">"{itemName}"</span>? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                    <button 
                        onClick={onCancel} 
                        disabled={isSubmitting}
                        className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm} 
                        disabled={isSubmitting}
                        className="px-4 py-2 text-sm font-bold bg-red-600 text-white rounded-lg hover:bg-red-500 shadow-sm transition-colors"
                    >
                        {
                            isSubmitting
                            ? "Deleting..."
                            : "Delete"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}