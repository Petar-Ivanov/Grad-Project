import { GridViewIcon, ListViewIcon, SearchIcon, SortIcon, SortAscIcon, LinkIcon, GlobeIcon, ProfileIcon } from "../../../../components/icons";

const TABS = [
  { id: "my_topics", label: "My Topics", icon: ProfileIcon },
  { id: "shared", label: "Followed", icon: LinkIcon },
  { id: "public", label: "Public", icon: GlobeIcon },
];

export default function TopicFilters({ 
  search, setSearch, 
  sortBy, setSortBy, 
  sortOrder, setSortOrder, 
  viewMode, setViewMode, 
  category, setCategory, 
  categories, 
  sourceTab, setSourceTab, 
  onCreateClick 
}) {

    const toggleSortOrder = () => {
        setSortOrder(prev => 
            prev === "desc" 
            ? "asc" 
            : "desc"
        );
    };

    return (
        <div className="flex flex-col gap-5 border-b border-slate-200 dark:border-slate-800 pb-6">
        
            {/* Tabs */}
            <div className="flex gap-6 border-b border-slate-200 dark:border-slate-800/60 overflow-x-auto no-scrollbar">
                {TABS.map((tab) => {
                    const Icon = tab.icon;

                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() =>
                                setSourceTab(tab.id)
                            }
                            className={`
                                flex items-center gap-2 whitespace-nowrap pb-3 text-sm font-semibold transition-colors
                                ${
                                    sourceTab === tab.id
                                    ? "border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400"
                                    : "border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                                }
                            `}
                        >
                            <Icon />
                            {
                                tab.label
                            }
                        </button>
                    );
                })}

            </div>

            {/* Controls */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                    <input
                        type="text"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 pl-9 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                        placeholder="Search topics by title or keywords..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <span className="absolute left-3 top-3 text-slate-400 text-sm">
                        <SearchIcon className="h-4 w-4"/>
                    </span>
                </div>

                {/* Action Suite */}
                <div className="flex flex-wrap items-center gap-3 justify-between lg:justify-start">
                    
                    {/* Category */}
                    <select 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold capitalize dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    >
                        {categories.map(cat => (
                        <option key={cat} value={cat}>
                            {cat === 'all' ? 'All Categories' : cat}
                        </option>
                        ))}
                    </select>

                    {/* Sort */}
                    <div className="relative flex items-center">
                        <button
                            onClick={toggleSortOrder}
                            className="absolute z-10 left-1.5 p-1.5 rounded-md text-slate-500 hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-900 transition-colors focus:outline-none"
                            title={`Change to ${sortOrder === 'desc' ? 'Ascending' : 'Descending'}`}
                        >
                            {
                                sortOrder === "desc" 
                                ? <SortIcon className="h-4 w-4" /> 
                                : <SortAscIcon className="h-4 w-4" />
                            }
                        </button>

                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                            className="rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-xs font-semibold dark:border-slate-800 dark:bg-slate-950 dark:text-white relative cursor-pointer"
                        >
                            <option value="recently_visited">Recently Visited</option>
                            <option value="updated_at">Updated At</option>
                            <option value="created_at">Created At</option>
                            <option value="alphabetical">Alphabetical</option>
                        </select>
                    </div>

                    {/* View Mode */} 
                    <div className="hidden md:inline-flex rounded-lg border border-slate-250 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-950">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`
                                flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold transition-all
                                ${
                                    viewMode === "grid" 
                                    ? "bg-white text-slate-950 dark:bg-slate-900 dark:text-white shadow-sm" 
                                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                }
                            `}
                        >
                            <GridViewIcon />
                            Grid
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`
                                flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold transition-all
                                ${
                                    viewMode === "list" 
                                    ? "bg-white text-slate-950 dark:bg-slate-900 dark:text-white shadow-sm" 
                                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                }
                            `}
                        >
                            <ListViewIcon/>
                            List
                        </button>
                    </div>

                    {/* Create */}
                    {onCreateClick && (
                        <button
                            onClick={onCreateClick}
                            className="ml-auto lg:ml-0 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 text-xs font-semibold shadow-sm transition-colors"
                        >
                            + Create Topic
                        </button>
                    )}

                </div>
            </div>
        </div>
  );
}