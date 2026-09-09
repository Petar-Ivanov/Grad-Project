import {useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { DateIcon, DocIcon, PresentationIcon } from "../../../../../components/icons";
import MaterialActionMenu from "./MaterialActionMenu";

export default function MaterialCard({
    item,
    topicId,
    theme,
    viewMode,
    isOwner,
    onRename,
    onDuplicate,
    onDelete,
}) {

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    const isList = 
        viewMode === "list";

    const isPresentation = 
        item.type === "presentation";

    const resolvedTopicId =
        item.topic_id ?? topicId;

    const RibbonIcon = 
        isPresentation 
            ? PresentationIcon 
            : DocIcon;
    
    // Dynamic Theming
    const themeBg = 
        theme?.spine?.split(' ')[0] || 'bg-indigo-500';

    const themeTextHover = 
        theme?.textHover || 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400';

    const formattedDate = new Date(item.updated_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    const typeLabel =
        isPresentation
            ? "Presentation"
            : "Study Doc";

    // closing dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => 
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return(
        <div className={
            `group relative flex rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md dark:border-slate-800 dark:bg-slate-950
            ${ menuOpen ? 'z-20' : 'z-10' }
            ${
                isList 
                ? 'flex-row items-center p-4 gap-4 h-[84px]' 
                : 'flex-col justify-between min-h-[160px]'
            }`}
        >

            {/* The Ribbon / Bookmark */}
            {isList 
            ? (
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg shadow-sm ${themeBg}`}>
                    <RibbonIcon className="h-6 w-6 text-white" />
                </div>
            ) : (
                <div className={`absolute top-0 left-6 flex h-12 w-9 items-start justify-center rounded-b-md pt-2.5 shadow-md  ${themeBg}`}>
                    <RibbonIcon className="h-5 w-5 text-white" />
                    {/* // */}
                    <div className="absolute -bottom-2 left-0 right-0 border-l-[18px] border-r-[18px] border-t-[8px] border-l-transparent border-r-transparent border-t-transparent" />
                </div>
            )}

            {/* Main Content */}
            <div className={`
                flex flex-col flex-grow 
                ${isList ? '' : 'px-5 pb-4 pt-14'}`
            }>
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        {typeLabel}
                    </span>
                </div>
                
                <h4 className={`text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2  pr-8 ${themeTextHover}`}>
                    <Link
                        to={`/topics/${resolvedTopicId}/study/${item.id}`}
                        className="focus:outline-none"
                    >
                        {item.name}
                    </Link>
                </h4>
            </div>

            {/* Footer */}
            <div className={`
                relative flex items-center justify-between text-xs dark:border-slate-800/60 
                ${
                    isList 
                    ? 'ml-auto gap-6 shrink-0' 
                    : 'mx-5 mb-4 mt-auto border-t border-slate-100 pt-3'
                }`}
            >
                
                <div className="flex items-center text-slate-400 dark:text-slate-500 font-medium gap-1.5 whitespace-nowrap">
                    <DateIcon/>
                    {formattedDate}
                </div>
                
                {isOwner && (
                    <div
                        ref={menuRef}
                        className="relative z-20"
                    >
                        <MaterialActionMenu
                            onRename={() =>
                                onRename(item)
                            }
                            onDuplicate={() =>
                                onDuplicate(item)
                            }
                            onDelete={() =>
                                onDelete(item)
                            }
                            onToggle={setMenuOpen}
                        />
                    </div>
                )}
            </div>

        </div>
    );
}