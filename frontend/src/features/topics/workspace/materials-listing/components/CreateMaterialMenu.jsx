import { useState, useRef, useEffect } from "react";
import { DocIcon, GoBackIcon, PlusIcon, PresentationIcon, SparklesIcon } from "../../../../../components/icons";

export default function CreateMaterialMenu({ theme, onCreateEmpty, onNavigateToBuild }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [step, setStep] = useState(1); // creation menu step
    const [selectedType, setSelectedType] = useState(null);
    const menuRef = useRef();

    // category theme
    const themeBg = theme?.spine?.split(' ')[0] || 'bg-indigo-600';
    const themeTextHover = theme?.textHover || 'hover:text-indigo-600 dark:hover:text-indigo-400';

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                closeMenu();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const closeMenu = () => {
        setMenuOpen(false);
        setTimeout(() => {
            setStep(1);
        }, 200);
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`ml-auto lg:ml-0 flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-xs font-semibold shadow-sm text-white transition-opacity hover:opacity-90 ${themeBg}`}
            >
                <PlusIcon className="h-4 w-4" />
                <span>Create</span>
            </button>

            {/* Dropdown Panel */}
            {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-white shadow-xl ring-1 ring-black/5 dark:bg-slate-900 dark:ring-white/10 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    
                    {
                        step === 1 
                        ? (
                            <div className="py-1">
                                {/* Header */}
                                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                    New Material
                                </div>
                                
                                <button 
                                    onClick={() => {
                                        onNavigateToBuild();
                                        closeMenu();
                                    }} 
                                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors ${themeTextHover}`}
                                >
                                    <SparklesIcon className="h-4 w-4" />
                                    Generate with AI
                                </button>
                                
                                <button 
                                    onClick={() => setStep(2)} 
                                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors ${themeTextHover}`}
                                >
                                    <PlusIcon className="h-4 w-4" />
                                    Empty Document
                                </button>
                            </div>
                        ) : (
                            <div className="py-1">
                                {/* Header */}
                                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 px-2 py-2 mb-1">
                                    <button 
                                        onClick={() => setStep(1)} 
                                        className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition-colors"
                                    >
                                        <GoBackIcon className="h-4 w-4" />
                                    </button>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                        Select Format
                                    </span>
                                </div>

                                {/* Create Empty Study Doc */}
                                <button 
                                    onClick={() => {
                                        onCreateEmpty("studydoc");
                                        closeMenu();
                                    }}
                                    className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors ${themeTextHover}`}
                                >
                                    <DocIcon className="h-4 w-4" />
                                    Study Doc
                                </button>
                                
                                {/* Create Empty Presentation */}
                                <button 
                                    onClick={() => {
                                        onCreateEmpty("presentation");
                                        closeMenu();
                                    }}
                                    className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors ${themeTextHover}`}
                                >
                                    <PresentationIcon className="h-4 w-4" />
                                    Presentation
                                </button>
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    );
}