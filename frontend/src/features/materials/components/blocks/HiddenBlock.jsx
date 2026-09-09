import { SettingsIcon } from "../../../../components/icons/index";

export function HiddenBlockUI({ isMenuOpen, onMenuToggle, onExpand }) {
    return (
        <div className="group relative py-2 my-1">
            <div className={`absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-10 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : '[@media(hover:hover)]:opacity-0 group-hover:opacity-100'}`}>
                <div className="relative">
                    <button
                        onClick={onMenuToggle}
                        className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${isMenuOpen ? 'text-slate-800 dark:text-slate-200' : 'text-slate-500 hover:text-slate-400 dark:text-slate-400 dark:hover:text-slate-300'}`}
                    >
                        <SettingsIcon className="h-5 w-5"/>
                    </button>
                    {isMenuOpen && (
                        <div className="absolute left-8 top-0 flex rounded-lg bg-slate-900 p-1 shadow-lg dark:bg-slate-800 z-50">
                            <button 
                                onClick={onExpand}
                                className="p-1.5 rounded-md text-xs text-white hover:bg-slate-700 transition-colors whitespace-nowrap"
                            >
                                Expand Block
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="pl-4 sm:pl-6">
                <button 
                    onClick={onExpand}
                    className="text-xs italic text-slate-400 hover:text-indigo-500 dark:text-slate-500 transition-colors px-3 py-1 rounded bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
                >
                    Block hidden • Click to expand
                </button>
            </div>
        </div>
    );
}