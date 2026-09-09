import React, { useEffect } from "react";
import { ChemistryIcon } from "../../../../../../../components/icons";

export default function BuildConfirmationModal({ isOpen, onClose, onConfirm, theme }) {

    const themeBg = theme?.spine?.split(' ')[0] || 'bg-indigo-600';
    const themeIconText = theme?.iconText || 'text-indigo-600';
    const themeBadgeBg = theme?.badgeBg || 'bg-indigo-50';

    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";
        return () => { document.body.style.overflow = 'unset'; }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
                
                <div className="flex flex-col items-center text-center">
                    {/* Themed Alert Icon */}
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full mb-4 ${themeBadgeBg} ${themeIconText}`}>
                        <ChemistryIcon className="h-8 w-8"/>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        Ready to Build?
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                        You are about to generate the final material based on your sources and plan. This process may take up to a minute depending on complexity.
                    </p>
                </div>
                
                <div className="flex justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 w-full">
                    <button 
                        onClick={onClose} 
                        className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors"
                    >
                        Review Plan
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className={`flex-1 px-4 py-2.5 text-sm font-bold text-white rounded-xl shadow-sm transition-opacity hover:opacity-90 ${themeBg}`}
                    >
                        Confirm & Build
                    </button>
                </div>
            </div>
        </div>
    );
}