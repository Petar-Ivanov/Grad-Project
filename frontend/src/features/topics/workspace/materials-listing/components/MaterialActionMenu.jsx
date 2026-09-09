import { useState, useRef, useEffect } from "react";
import { BinIcon, EditIcon, FilesIcon, SettingsIcon } from "../../../../../components/icons";

export default function MaterialActionMenu({ onRename, onDuplicate, onDelete, onToggle }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    // closing dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
                onToggle?.(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onToggle]);

    const handleToggle = (e) => {
        e.preventDefault(); 
        const newState = !menuOpen;
        setMenuOpen(newState);
        onToggle?.(newState);
    };

    const handleAction = (e, action) => {
        e.preventDefault();
        e.stopPropagation();
        setMenuOpen(false);
        onToggle?.(false);
        action();
    };

    return (
        <div className="relative" ref={menuRef}>
            <button 
                onClick={handleToggle}
                className={`p-1.5 rounded-md transition-colors ${menuOpen ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-300'}`}
                aria-label="Material settings"
            >
                <SettingsIcon/>
            </button>

            {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 rounded-lg bg-white shadow-xl ring-1 ring-black/5 dark:bg-slate-900 dark:ring-white/10 z-60 overflow-hidden">
                    <div className="py-1">
                        <button 
                            onClick={(e) => handleAction(e, onRename)} 
                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                        >
                            <EditIcon className="w-4 h-4" />
                            <span>Rename</span>
                        </button>
                        <button 
                            onClick={(e) => handleAction(e, onDuplicate)} 
                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                        >
                            <FilesIcon className="w-4 h-4" />
                            <span>Duplicate</span>
                        </button>
                        <div className="my-1 border-t border-slate-100 dark:border-slate-800"></div>
                        <button 
                            onClick={(e) => handleAction(e, onDelete)} 
                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-900/20 transition-colors"
                        >
                            <BinIcon className="w-4 h-4" />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}