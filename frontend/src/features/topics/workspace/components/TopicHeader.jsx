import { Link } from "react-router-dom";
import { CATEGORY_THEMES } from "../../config/topicThemes.js"
import { GoBackIcon } from "../../../../components/icons/index.jsx";

export default function TopicHeader({
    topic,
    role,
    isFollowed,
    isFollowing,
    onToggleFollow,
    theme,
}) {
    const isOwner = role === "owner";

    const ownerName =
        topic.owner?.username ??
        "Unknown Creator";

    const ThemeIcon =
        theme?.icon;

    return (
        <header className="w-full flex flex-col relative bg-white dark:bg-slate-950">

            {/* Banner */}
            <div className="relative h-32 sm:h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">

                {/* Back */}
                <div className="absolute top-4 left-4 z-20">
                    <Link
                        to="/topics"
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-black/40 backdrop-blur-md pl-3 pr-4 text-sm font-medium text-white hover:bg-black/60 transition-all shadow-sm"
                        title="Back to Topics"
                    >
                        <GoBackIcon className="h-4 w-4" />

                        <span className="hidden sm:inline">
                            Back
                        </span>
                    </Link>
                </div>


                {/* Banner image */}
                {topic.banner_url ? (
                    <img
                        src={topic.banner_url}
                        alt={`${topic.name} banner`}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="flex w-[150%] h-[150%] flex-wrap items-center justify-center gap-6 md:gap-8 opacity-[0.08] dark:opacity-[0.05] -rotate-12 scale-125">
                            {ThemeIcon &&
                                Array.from({ length: 40 }).map((_, i) => (
                                    <ThemeIcon
                                        key={i}
                                        className={`h-10 w-10 md:h-12 md:w-12 ${theme?.label ?? ""}`}
                                    />
                                ))}
                        </div>
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>


            {/* Topic information */}
            <div className="relative px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
                <div className="flex flex-col gap-3">

                    {/* Category */}
                    <div className="flex items-center gap-2">
                        {ThemeIcon && (
                            <ThemeIcon
                                className={`h-4 w-4 ${theme?.label ?? ""}`}
                            />
                        )}

                        <p className={`font-mono text-[11px] font-bold uppercase tracking-widest ${theme?.label ?? ""}`}
                        >
                            {topic.category}
                        </p>
                    </div>


                    {/* Name */}
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                        {topic.name}
                    </h1>


                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">

                        <span>
                            Created by{" "}
                            <span className="text-slate-700 dark:text-slate-300">
                                {ownerName}
                            </span>
                        </span>


                        {!isOwner && (
                            <>
                                <span className="text-slate-300 dark:text-slate-700">
                                    •
                                </span>

                                <button
                                    type="button"
                                    onClick={onToggleFollow}
                                    disabled={isFollowing}
                                    className={`
                                        flex items-center justify-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide transition-colors border shadow-sm
                                        ${
                                            isFollowed
                                                ? "bg-slate-100 text-slate-600 border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-red-900/30 dark:hover:text-red-400 dark:hover:border-red-800/30"
                                                : `${theme?.button ?? "bg-indigo-600 text-white hover:bg-indigo-500"}`
                                        }
                                    `}
                                >
                                    {isFollowing
                                        ? "..."
                                        : isFollowed
                                            ? "Following"
                                            : "Follow"}
                                </button>
                            </>
                        )}

                    </div>

                </div>
            </div>
        </header>
    );
}