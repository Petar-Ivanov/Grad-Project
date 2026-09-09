import { Link } from "react-router-dom";
import { getCategoryTheme } from "../../../utils/themeHelper";

export default function DashboardTopicCard({ topic }) {
    const theme = getCategoryTheme(topic.category);
    const ThemeIcon = theme?.icon;

    return (
        <Link 
            to={`/topics/${topic.id}`}
            className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
        >
            <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-sm transition-transform group-hover:scale-105 ${theme.spine}`}>
                    {ThemeIcon && <ThemeIcon className="h-6 w-6" />}
                </div>
                
                <div className="flex flex-col min-w-0">
                    <h3 className={`truncate text-base font-bold text-slate-900 dark:text-white transition-colors ${theme.textHover}`}>
                        {topic.name}
                    </h3>
                    <p className={`mt-0.5 truncate text-xs font-bold uppercase tracking-wider ${theme.label}`}>
                        {topic.category}
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-5 pt-4 flex items-center justify-between border-t border-slate-100 text-xs font-medium text-slate-500 dark:border-slate-800/60 dark:text-slate-400">
                <span>
                    {topic.materials_count ?? 0}{" "}
                    {topic.materials_count === 1 ? "Material" : "Materials"}
                </span>

                <span>
                    {new Date(topic.updated_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                    })}
                </span>
            </div>
        </Link>
    );
}