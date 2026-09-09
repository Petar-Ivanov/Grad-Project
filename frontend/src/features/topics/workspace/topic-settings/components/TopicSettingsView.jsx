import { DateIcon, GlobeIcon, LockIcon } from "../../../../../components/icons";

export default function TopicSettingsView({topic, theme, createdDate, updatedDate}) {
    
    const themeBadgeBg = theme?.badgeBg || 'bg-indigo-50 dark:bg-indigo-900/30';
    const themeIconText = theme?.iconText || 'text-indigo-600 dark:text-indigo-400';

    const categoryLabel = 
        topic.category
        ? topic.category.replace(
                /\b\w/g,
                (char) => char.toUpperCase()
            )
        : "Uncategorized";

    return (
        <div className="space-y-8 animate-in fade-in duration-300">

            <div className="space-y-4">

                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {topic.name}
                </h3>

                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {topic.description || "No description provided for this topic yet."}
                </p>

            </div>

            <hr className="border-slate-100 dark:border-slate-800/80" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Category
                    </span>

                    <div className={`
                        w-fit rounded-lg border border-current/20 px-3 py-1.5 text-xs font-bold shadow-sm 
                        ${themeBadgeBg} ${themeIconText}
                    `}>
                        {categoryLabel}
                    </div>
                </div>


                <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Visibility
                    </span>

                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {topic.is_public 
                        ? (
                            <>
                                <GlobeIcon className="h-4 w-4 text-emerald-500" />
                                Public Workspace
                            </>
                        ) : (
                            <>
                                <LockIcon className="h-4 w-4 text-slate-400" />
                                Private Workspace
                            </>
                        )}
                    </div>
                </div>


                <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Created On
                    </span>

                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        <DateIcon className="h-4 w-4 text-slate-400" />
                        {createdDate}
                    </div>
                </div>


                <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Last Updated
                    </span>

                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        <DateIcon className="h-4 w-4 text-slate-400" />
                        {updatedDate}
                    </div>
                </div>

            </div>

        </div>
    );
}