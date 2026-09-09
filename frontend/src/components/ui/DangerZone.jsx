export default function DangerZone({
    title = "Danger Zone",
    actionTitle,
    description,
    actionLabel,
    onAction,
    isLoading = false,
}) {

    return (
        <section className="mt-12 space-y-4">
            <h3 className="text-lg font-bold text-red-600 dark:text-red-500">
                {title}
            </h3>

            <div className="flex flex-col gap-4 rounded-2xl border border-red-200 bg-red-50/50 p-6 dark:border-red-900/30 dark:bg-red-950/10 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {actionTitle}
                    </h4>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {description}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onAction}
                    disabled={isLoading}
                    className="shrink-0 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-600 transition-colors hover:border-red-300 hover:bg-red-50 dark:border-red-900/50 dark:bg-slate-900 dark:hover:bg-red-950/30 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {
                        isLoading
                        ? "Deleting..."
                        : actionLabel
                    }
                </button>
            </div>
        </section>
    );
}