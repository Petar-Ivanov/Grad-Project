const ChevronDownIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

export const CollapsibleSection = ({ title, icon: Icon, isExpanded, onToggle, children }) => {
    return (
        <div className="border-b border-slate-100 dark:border-slate-800 last:border-0">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                }}
                className="flex w-full items-center justify-between p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50 focus:outline-none"
            >
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                        <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {title}
                    </span>
                </div>
                <ChevronDownIcon 
                    className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${isExpanded ? "-rotate-180" : "rotate-0"}`} 
                />
            </button>
            
            <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="px-4 pb-4 space-y-1">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};