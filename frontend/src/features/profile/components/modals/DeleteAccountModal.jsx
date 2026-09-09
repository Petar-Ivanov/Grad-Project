import React, { useEffect } from "react";
import { WarningIcon } from "../../../../components/icons/index";

export default function DeleteAccountModal({ isOpen, onClose, onConfirm, isDeleting = false, }) {
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
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-red-100 dark:border-red-900/30 animate-in zoom-in-95 duration-200">
                
                <div className="flex flex-col items-center text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
                        {/* <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg> */}
                        <WarningIcon className="h-7 w-7"/>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        Delete Account?
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                        This action is permanent and cannot be undone. All your workspaces, materials, and personal data will be erased.
                    </p>
                </div>
                
                <div className="flex justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 w-full">
                    <button 
                        type="button"
                        onClick={onClose} 
                        disabled={isDeleting}
                        className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button 
                        type="button"
                        onClick={onConfirm} 
                        disabled={isDeleting}
                        className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                    >
                        {
                            isDeleting
                            ? "Deleting..."
                            : "Delete Permanently"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}