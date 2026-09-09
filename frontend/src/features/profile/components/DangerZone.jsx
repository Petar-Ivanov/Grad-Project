export default function DangerZone({ onDeleteClick, isDeleting = false, }) {
    return (
        <section className="mt-12 space-y-4">
            <h3 className="text-lg font-bold text-red-600 dark:text-red-500">
                Danger Zone
            </h3>
            <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6 dark:border-red-900/30 dark:bg-red-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Delete Account
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Permanently remove your account and all associated data.
                    </p>
                </div>
                <button
                    onClick={onDeleteClick}
                    disabled={isDeleting}
                    className="shrink-0 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-600 transition-colors hover:bg-red-50 hover:border-red-300 dark:border-red-900/50 dark:bg-slate-900 dark:hover:bg-red-950/30 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isDeleting
                        ? "Deleting..."
                        : "Delete Account"}
                </button>
            </div>
        </section>
    );
}