import { Link } from "react-router-dom";
import { BookIcon, DateIcon, InfoIcon } from "../../../../components/icons/index.jsx";
import { CATEGORY_THEMES } from "../../config/topicThemes.js";
import { getCategoryTheme } from "../../../../utils//themeHelper.js";

export default function TopicCard({ topic, viewMode, onActionClick }) {
    const isGrid = 
        viewMode === "grid";
    const isOwner = 
        topic.role === "owner";

    const formattedDate = new Date(topic.updated_at || Date.now()).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    // const hasNewUpdates = !topic.last_visited_at || new Date(topic.updated_at) > new Date(topic.last_visited_at);
    const hasNewUpdates =
        Boolean(topic.last_visited_at)
        ? new Date(topic.updated_at) > new Date(topic.last_visited_at)
        : true;

    const name = topic.name || "Untitled Topic";
    const category = topic.category || "Topic";
    const owner = topic.owner?.username ?? "Unknown Creator";
    const ownerId = topic.owner?.id;
    const materials_count = topic.materials_count ?? 0;

    // const theme = CATEGORY_THEMES[category] || CATEGORY_THEMES["default"] || { spine: 'bg-slate-400', label: 'text-slate-400', textHover: 'hover:text-slate-600', icon: CodeIcon };
    // const ThemeIcon = theme.icon;
    const theme = getCategoryTheme(category);
    const CategoryIcon =
        CATEGORY_THEMES[category]?.icon ??
        theme?.icon ??
        InfoIcon;

    const isFollowed = Boolean(topic.is_followed);

    return (
        <div className={`
            group relative flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700 overflow-hidden
            sm:flex-row sm:items-center min-h-[90px]
            ${isGrid ? 'md:flex-col md:min-h-[230px] md:justify-between md:items-stretch' : ''}
        `}>
            
            {/* Spine + Icon */}
            <div className={`absolute bottom-0 left-0 top-0 z-0 flex w-10 flex-col items-center border-r pt-5 transition-colors ${theme.spine}`}>
                <CategoryIcon className="h-5 w-5 text-white/90" />
            </div>

            {/* Materials Counter (desktop grid view) */}
            <div className={`absolute right-0 top-0 z-20 hidden ${isGrid ? 'md:block' : ''}`}>
                <div className="rounded-bl-xl border-b border-l border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/60 dark:text-slate-300">
                    {materials_count} {materials_count === 1 ? "Item" : "Items"}
                </div>
            </div>

            {/* Main Content Area */}
            <div className={`relative z-10 flex flex-1 p-5 pl-14 flex-col sm:flex-row sm:items-center gap-4 
                ${isGrid ? 'md:flex-col md:justify-between md:items-start md:gap-0' : ''}
            `}>

                {/* Banner Image / Fallback Pattern */}
                <div className={`relative overflow-hidden border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 shrink-0
                    ${
                        isGrid 
                        ? 'mb-4 w-full h-32 rounded-lg' 
                        : 'mb-4 w-full h-32 rounded-lg sm:mb-0 sm:h-20 sm:w-28 sm:rounded-2xl'
                    }
                `}>
                    {topic.banner_url ? (
                        <img 
                            src={topic.banner_url} 
                            alt={`${name} banner`} 
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                    ) : (
                        /* Fallback Pattern */
                        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105 pointer-events-none">
                            <div className="flex w-[150%] h-[150%] flex-wrap items-center justify-center gap-3 md:gap-4 opacity-[0.12] dark:opacity-[0.08] -rotate-12 scale-125">
                                {Array.from({ length: 30 }).map((_, i) => (
                                    <CategoryIcon key={i} className={`h-6 w-6 md:h-8 md:w-8 ${theme.label}`} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Top Content */}
                <div className={`flex flex-col flex-grow w-full`}>

                    <div className="relative flex w-full items-start justify-between gap-4">
                        <div className="space-y-1.5 pt-1">
                            <div className="flex items-center gap-2">
                                <p className={`
                                    font-mono text-[10px] font-bold uppercase tracking-widest 
                                    ${theme.label} 
                                    ${theme.textHover}
                                `}>
                                    {category}
                                </p>
                                {hasNewUpdates && (
                                    <span className="relative flex items-center gap-1.5 rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                                        <span className="relative flex h-1.5 w-1.5">
                                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                                        </span>
                                        Updated
                                    </span>
                                )}

                                {topic.role === "editor" && (
                                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400">
                                        Editor
                                    </span>
                                )}

                                {topic.role === "viewer" &&
                                    topic.is_followed && (
                                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                        Viewer
                                    </span>
                                )}
                            </div>
                            
                            <h3 className={`text-lg font-bold leading-tight text-slate-900 transition-colors dark:text-white ${theme.textHover}`}>
                                <Link 
                                    to={`/topics/${topic.id}`} 
                                    className="focus:outline-none before:absolute before:inset-0"
                                >
                                    {name}
                                </Link>
                            </h3>
                            
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                By {owner}
                            </p>
                        </div>
                    </div>
                    
                    {/* Description */}
                    {topic.description && (
                        <div className={`mt-4 hidden w-full ${isGrid ? 'md:block' : ''}`}>
                            <p className="line-clamp-2 break-words font-serif text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                {topic.description}
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer*/}
                <div className={`flex items-center justify-between text-xs font-medium w-full sm:w-auto border-t border-dashed border-slate-200 sm:border-0 pt-3 sm:pt-0 dark:border-slate-800 gap-6
                    ${isGrid ? 'md:w-full md:mt-6 md:border-t md:pt-4 md:gap-0' : ''}
                `}>
                    
                    <div className={`flex items-center gap-4 text-slate-400 dark:text-slate-500 justify-between w-full sm:w-auto sm:justify-start ${isGrid ? 'md:w-full md:justify-start' : ''}`}>
                        <span className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
                            <span className="text-[14px]">
                                <DateIcon/>
                            </span> 
                            {formattedDate}
                        </span>
                        
                        {/* Materials count (Inline for List view and Mobile) */}
                        <span className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 ${isGrid ? 'md:hidden' : ''}`}>
                            <span className="text-[14px]">
                                <BookIcon/>
                            </span> 
                            {materials_count} {materials_count === 1 ? "Item" : "Items"}
                        </span>
                    </div>

                    {/* Follow / Unfollow */}
                    {!isOwner && (
                        <button 
                            className={`
                                relative z-20 shrink-0 flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-bold transition-colors shadow-sm border
                                bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700
                                ${isFollowed 
                                    ? 'hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/30 dark:hover:text-red-400 dark:hover:border-red-800/30' 
                                    : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                                }
                            `}
                            onClick={(e) => {
                                e.preventDefault();
                                onActionClick(topic, isFollowed ? 'unfollow' : 'follow');
                            }}
                        >
                            {isFollowed ? 'Unfollow' : 'Follow'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}