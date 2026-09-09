import React, { useEffect } from "react";
import { WarningIcon } from "../../../../../../components/icons";

export default function RemoveCollaboratorModal({ isOpen, user, onConfirm, onCancel, theme }) {
    
    const themeRing = theme?.ring || 'focus:ring-indigo-500';

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isOpen]);

    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
                
                <div className="flex flex-col items-center text-center">

                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
                        <WarningIcon className="h-8 w-8"/>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        Remove Collaborator?
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                        Are you sure you want to remove <span className="font-bold text-slate-700 dark:text-slate-300">{user.name}</span> from this workspace? They will lose all access immediately.
                    </p>

                </div>
                
                <div className="flex justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 w-full">
                    <button 
                        onClick={onCancel} 
                        className={`flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors focus:outline-none focus:ring-1 border-transparent ${themeRing}`}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className={`flex-1 px-4 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-sm transition-colors focus:outline-none focus:ring-1 border-transparent focus:ring-red-500`}
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}