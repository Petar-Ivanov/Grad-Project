import React from "react";
import { SettingsIcon } from "../../../components/icons/index.jsx";

export default function ParameterEditor({ title, onSave, onCancel, onDelete, children }){
    return(
        <div className="border border-indigo-200 dark:border-indigo-800 rounded-lg bg-slate-50 dark:bg-slate-900 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Header */}
            <div className="px-4 py-2.5 bg-indigo-50/80 dark:bg-indigo-950/50 border-b border-indigo-100 dark:border-indigo-900 flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                    <SettingsIcon className="h-4 w-4" />
                    Edit {title} Parameters
                </span>
            </div>

            {/* Parameters */}
            <div className="p-4 space-y-4">
                {children}
            </div>

            <div className="flex justify-between items-center gap-2 p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                <div>
                    {onDelete && (
                        <button
                            onClick={onDelete}
                            className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 rounded transition-colors"
                        >
                            Delete
                        </button>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={onCancel}
                        className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded hover:bg-indigo-500 transition-colors shadow-sm"
                    >
                        Save
                    </button>
                </div>
            </div>

            
        </div>
    );
}