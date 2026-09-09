import {GridViewIcon, ListViewIcon, SearchIcon, SortIcon, SortAscIcon } from "../../../../../components/icons/index";
import CreateMaterialMenu from "./CreateMaterialMenu";

export default function MaterialFilters({
    search,
    setSearch,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    viewMode,
    setViewMode,
    filter,
    setFilter,
    onCreateEmpty,
    onNavigateToBuild,
    theme,
    isOwner,
}) {

    const toggleSortOrder = () => setSortOrder(prev => 
        prev === "desc" 
        ? "asc" 
        : "desc"
    );

    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-slate-200 dark:border-slate-800 pb-5">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
                <input
                    type="text"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 pl-9 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    placeholder="Search materials..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <span className="absolute left-3 top-3 text-slate-400 text-sm">
                    <SearchIcon className="h-4 w-4"/>
                </span>
            </div>

            {/* Action Suite */}
            <div className="flex flex-wrap items-center gap-3 justify-between lg:justify-start">
                
                {/* Type Dropdown */}
                <select
                    value={filter}
                    onChange={(e) =>
                        setFilter(e.target.value)
                    }
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                >
                    <option value="All">All Types</option>
                    <option value="studydoc">Study Doc</option>
                    <option value="presentation">Presentation</option>
                </select>

                {/* Sorting Dropdown */}
                <div className="relative flex items-center">
                <button
                    onClick={toggleSortOrder}
                    className="absolute z-10 left-1.5 p-1.5 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 transition-colors focus:outline-none"
                    title={`Change to ${sortOrder === 'desc' ? 'Ascending' : 'Descending'}`}
                >
                    {sortOrder === "desc" ? <SortIcon className="h-4 w-4" /> : <SortAscIcon className="h-4 w-4" />}
                </button>

                <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-xs font-semibold dark:border-slate-800 dark:bg-slate-950 dark:text-white relative cursor-pointer"
                >
                    <option value="updated_at">Recently Updated</option>
                    <option value="created_at">Created Date</option>
                    <option value="alphabetical">Alphabetical</option>
                </select>
            </div>

                {/* View Mode Toggle*/} 
                <div className="hidden md:inline-flex rounded-lg border border-slate-250 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-950">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold transition-all
                        ${viewMode === "grid" ? "bg-white text-slate-950 dark:bg-slate-900 dark:text-white shadow-sm" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"}`}
                    >
                        <GridViewIcon />
                        Grid
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold transition-all
                        ${viewMode === "list" ? "bg-white text-slate-950 dark:bg-slate-900 dark:text-white shadow-sm" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"}`}
                    >
                        <ListViewIcon/>
                        List
                    </button>
                </div>

                {isOwner && (
                    <CreateMaterialMenu
                        theme={theme}
                        onCreateEmpty={onCreateEmpty}
                        onNavigateToBuild={onNavigateToBuild}
                    />
                )}
            </div>
        </div>
    );
}