import { useState } from "react";
import { SearchIcon } from "../../../../components/icons/index.jsx";

export default function NavigationTab({ onClose, headings, onSearch, activeId }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleScrollTo = (id) => {

        const element = document.getElementById(id);
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: "smooth" });
        }

        // automatically closing sidebar on mobile devices
        if (window.innerWidth < 768) {
            onClose();
        }
    };

    const handleSearch = (e) => {
        const val = e.target.value;
        setSearchTerm(val);
        if (onSearch) onSearch(val); // sending search term to parent
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        if (onSearch) onSearch("");
    };

    // adjusting heading styling based on activity and level
    const getHeadingClass = (level, isActive) => {
        const baseClass = "flex items-center w-full text-left rounded-lg px-3 py-2 transition-colors";
        
        if (isActive) {
            return `${baseClass} bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 font-semibold`;
        }

        switch(level) {
            case 2: return `${baseClass} font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900`;
            case 3: return `${baseClass} font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900 text-sm`;
            case 4: return `${baseClass} text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900 text-sm`;
            case 5: return `${baseClass} text-slate-400 hover:bg-slate-50 dark:text-slate-500 dark:hover:bg-slate-900 text-xs`;
            case 6: return `${baseClass} text-slate-400 hover:bg-slate-50 dark:text-slate-500 dark:hover:bg-slate-900 text-xs uppercase tracking-wider`;
            default: return `${baseClass} font-medium text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900`;
        }
    };

    // generating indentation prefix based on level
    const renderPrefix = (level, isActive) => {
        if (level <= 1) return null;
        else if (level > 6) level = 6;
        
        return (
            <div className="flex shrink-0 items-center gap-1.5 mr-2.5">
                {Array.from({ length: level - 1  }).map((_, index) => (
                    <span 
                        key={index}
                        className={
                            // CHANGED: Replaced text bullets with pure CSS circles for larger size and perfect vertical centering
                            `block w-1.5 h-1.5 rounded-full shrink-0 transition-colors
                            ${
                                isActive 
                                    ? "bg-indigo-400 dark:bg-indigo-500" 
                                    : "bg-slate-300 dark:bg-slate-600"
                            }
                        `}
                    />
                ))}
            </div>
        );
    };

    return(
        <div className="flex h-full flex-col w-full min-w-[260px]">
            {/* Search Box */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-900 shrink-0">
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search in document..."
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-9 text-sm outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"/>
                    <span className="absolute left-3 top-2.5 text-slate-400">
                        <SearchIcon className="h-5 w-5"/>
                    </span>
                    {/* Clear Search Button */}
                    {searchTerm && (
                        <button 
                            onClick={handleClearSearch}
                            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                            aria-label="Clear search"
                        >
                            ✕
                        </button>
                    )}
                </div>                
            </div>
            
            {/* Table of Contents List */}
            <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 px-3">
                    Table of Contents
                </h3>
                <ul className="space-y-1">
                    {headings.map((heading) => (
                    <li key={heading.id}>
                        <button 
                            onClick={() => handleScrollTo(heading.id)}
                            className={getHeadingClass(heading.level, activeId === heading.id)}
                        >
                            {/* Level Prefix */}
                            {renderPrefix(heading.level, activeId === heading.id)}

                            {/* Topic Title */}
                            <span className="flex-1 text-left leading-tight">{heading.title}</span>
                        </button>
                    </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}