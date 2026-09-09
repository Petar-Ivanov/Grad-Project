import { useMemo } from "react";
import { BellIcon } from "../../../components/icons/index";
import DashboardTopicCard from "./DashboardTopicCard";
import { useTopics } from "../../topics/hooks/useTopics";

export default function RecentTopics() {
    
    const {
        topics,
        isLoading,
        error,
    } = useTopics();

    const recentTopics = useMemo(() => {
        return [...topics]
            .filter((topic) => topic.is_followed)
            .sort((a, b) => {
                const aTime = new Date(a.updated_at).getTime();
                const bTime = new Date(b.updated_at).getTime();

                return bTime - aTime;
            })
            .slice(0, 6);
    }, [topics]);

    if (isLoading) {
        return (
            <section className="space-y-4">
                <div>
                    <div className="flex items-center gap-2.5 mb-1">
                        <BellIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />

                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            Recently Updated Topics
                        </h2>
                    </div>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Workspaces you follow with recent activity.
                    </p>
                </div>

                <div className="text-sm text-slate-400">
                    Loading recent topics...
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="space-y-4">
                <div>
                    <div className="flex items-center gap-2.5 mb-1">
                        <BellIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />

                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            Recently Updated Topics
                        </h2>
                    </div>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Workspaces you follow with recent activity.
                    </p>
                </div>

                <div className="text-sm font-medium text-red-600 dark:text-red-400">
                    Failed to load recent topics. {error.message}
                </div>
            </section>
        );
    }

    if (recentTopics.length === 0) {
        return null;
    }

    return (
        <section className="space-y-4">
            {/* Header Section */}
            <div>
                <div className="flex items-center gap-2.5 mb-1">
                    <BellIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        Recently Updated Topics
                    </h2>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Workspaces you follow with recent activity.
                </p>
            </div>
            
            {/* Horizontal Scroll Container */}
            <div className="flex space-x-5 overflow-x-auto pb-8 snap-x snap-mandatory custom-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                {recentTopics.map((topic) => (
                    <div 
                        key={topic.id} 
                        className="snap-start shrink-0 w-[280px] sm:w-[320px]"
                    >
                        <DashboardTopicCard topic={topic} />
                    </div>
                ))}
            </div>
        </section>
    );
}