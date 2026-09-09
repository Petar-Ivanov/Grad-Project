import React, { useEffect } from "react";
import { PlusIcon, WarningIcon } from "../../../../../components/icons";

export default function SubscriptionModal({ isOpen, type, topicName, onConfirm, onCancel, isSubmitting = false,}) {
    // locking scroll on modal open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isOpen]);

    if (!isOpen) return null;

    const isFollow = type === 'follow';
    
    // Content based on action type
    const iconColor = 
        isFollow 
        ? "text-indigo-600 dark:text-indigo-400" 
        : "text-red-600 dark:text-red-500";
        
    const title = 
        isFollow 
        ? "Follow" 
        : "Unfollow";

    const message = 
        isFollow 
        ? `Are you sure you want to follow "${topicName}"?`
        : `Are you sure you want to unfollow "${topicName}"?`;
    
    const confirmText = 
        isFollow 
        ? "Follow" 
        : "Unfollow";

    const confirmBtnClass = 
        isFollow 
        ? "bg-indigo-600 hover:bg-indigo-500 text-white" 
        : "bg-red-600 hover:bg-red-500 text-white";

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 w-full max-w-sm shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
                <div className={`flex items-center gap-3 mb-3 ${iconColor}`}>
                    {/* Dynamic Icon */}
                    {
                        isFollow 
                        ? (
                            <PlusIcon className="h-6 w-6"/>
                        ) : (
                            <WarningIcon className="h-6 w-6"/>
                        )
                    }
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {title}
                    </h3>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                    {message}
                </p>

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
                        type="button"
                        onClick={onConfirm}
                        disabled={isSubmitting}
                        className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors shadow-sm ${confirmBtnClass}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}