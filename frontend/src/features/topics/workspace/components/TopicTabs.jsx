import { NavLink } from "react-router-dom";
import { BookIcon, BuildIcon, InfoIcon, LinkIcon, SourcesIcon } from "../../../../components/icons";
import { CATEGORY_THEMES } from "../../config/topicThemes.js";

export default function TopicTabs({ theme, role }) {
    const tabs = [
        { label: "This Topic", path: "topic-settings", icon: InfoIcon },
        { label: "Library", path: "library", icon: BookIcon },
    ];

    if (role === "owner") {
        tabs.push({
            label: "Build",
            path: "build",
            icon: BuildIcon,
        });
        tabs.push({
            label: "Sharing",
            path: "sharing",
            icon: LinkIcon,
        });
    }

    return (
        <div className="w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
            <div className="px-4 sm:px-6 lg:px-8">
                <nav className="-mb-px flex space-x-6 sm:space-x-8 overflow-x-auto no-scrollbar" aria-label="Topic Workspace Tabs">
                    {tabs.map((tab) => (
                        <NavLink
                            key={tab.path}
                            to={tab.path}
                            className={({ isActive }) =>`
                                flex items-center gap-2 border-b-2 py-4 px-1 text-sm font-semibold transition-all duration-200 whitespace-nowrap
                                ${
                                    isActive
                                    ? `${theme.dropBorder} ${theme.label} dark:${theme.dropBorder}`
                                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-slate-200"
                                }
                            `}
                        >
                            <tab.icon className="h-4 w-4" />
                            <span>{tab.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
}