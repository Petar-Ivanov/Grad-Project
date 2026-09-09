import { useState } from "react";

export default function CollapsibleSection({ title, description, defaultOpen = false, theme, children }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const themeText = theme?.label || 'text-indigo-600';
    const themeBgHover = theme?.spine?.split(' ')[0]?.replace('bg-', 'hover:bg-')?.concat('/10') || 'hover:bg-indigo-50';

    return (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 overflow-hidden transition-all duration-300">
            {/* Header Trigger */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50`}
            >
                <div className="flex flex-col gap-1">
                    <h3 className={`text-base font-bold text-slate-900 dark:text-white transition-colors ${isOpen ? themeText : ''}`}>
                        {title}
                    </h3>
                    {description && (
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {description}
                        </p>
                    )}
                </div>
                
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            {/* Collapsible Content */}
            <div 
                className={`grid transition-all duration-300 ease-in-out 
                    ${
                        isOpen 
                        ? 'grid-rows-[1fr] opacity-100' 
                        : 'grid-rows-[0fr] opacity-0'
                    }
                `}
            >
                <div className="overflow-hidden">
                    <div className="border-t border-slate-100 dark:border-slate-800 p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}