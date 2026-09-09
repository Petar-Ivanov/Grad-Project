import MaterialCard from "../../topics/workspace/materials-listing/components/MaterialCard";
import { getCategoryTheme } from "../../../utils/themeHelper";
import { BookIcon } from "../../../components/icons/index";
import { useContinueLearning } from "../hooks/useContinueLearning";

export default function ContinueLearning() {
    
    const {
        materials,
        isLoading,
        error,
    } = useContinueLearning();

    if (isLoading) {
        return (
            <section className="space-y-4">
                <div>
                    <div className="flex items-center gap-2.5 mb-1">
                        <BookIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />

                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            Continue Learning
                        </h2>
                    </div>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Pick up right where you left off.
                    </p>
                </div>

                <div className="text-sm text-slate-400">
                    Loading recent materials...
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="space-y-4">
                <div>
                    <div className="flex items-center gap-2.5 mb-1">
                        <BookIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />

                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            Continue Learning
                        </h2>
                    </div>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Pick up right where you left off.
                    </p>
                </div>

                <div className="text-sm font-medium text-red-600 dark:text-red-400">
                    Failed to load recent materials. {error.message}
                </div>
            </section>
        );
    }

    if (materials.length === 0) {
        return null;
    }

    return (
        <section className="space-y-4">
            {/* Header Section */}
            <div>
                <div className="flex items-center gap-2.5 mb-1">
                    <BookIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        Continue Learning
                    </h2>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Pick up right where you left off.
                </p>
            </div>
            
            {/* Horizontal Scroll Container */}
            <div className="flex space-x-5 overflow-x-auto pb-8 snap-x snap-mandatory custom-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                {materials.map((item) => {
                    const itemTheme =
                        getCategoryTheme(item.category);

                    return (
                        <div
                            key={item.id}
                            className="snap-start shrink-0 w-[280px] sm:w-[320px]"
                        >
                            <MaterialCard
                                item={item}
                                theme={itemTheme}
                                viewMode="grid"
                                hideActions={true}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}