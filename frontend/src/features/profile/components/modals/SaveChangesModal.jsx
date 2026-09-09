import React, { useEffect } from "react";
import { CheckIcon } from "../../../../components/icons/index";

export default function SaveChangesModal({ isOpen, onClose, onConfirm, isSaving = false }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
                
                <div className="flex flex-col items-center text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
                        <CheckIcon className="h-7 w-7" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        Save Profile Changes?
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                        Are you sure you want to update your account information?
                    </p>
                </div>
                
                <div className="flex justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 w-full">
                    <button 
                        type="button"
                        onClick={onClose} 
                        disabled={isSaving}
                        className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button 
                        type="button"
                        onClick={onConfirm} 
                        disabled={isSaving}
                        className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                    >
                        {
                            isSaving
                            ? "Saving..."
                            : "Confirm & Save"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}