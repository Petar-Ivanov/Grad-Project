import { WarningIcon } from "../icons";


export default function ConfirmationModal({
    isOpen,
    title,
    message,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
    isSubmitting = false,
}) {


    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">

                <div className="flex flex-col items-center text-center">

                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                        <WarningIcon className="h-8 w-8" />
                    </div>

                    <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                        {title}
                    </h3>

                    <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
                        {message}
                    </p>

                </div>


                <div className="flex gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="flex-1 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 disabled:opacity-50"
                    >
                        {cancelLabel}
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isSubmitting}
                        className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-red-500 disabled:opacity-50"
                    >
                        {
                            isSubmitting
                            ? "Deleting..."
                            : confirmLabel
                        }
                    </button>

                </div>

            </div>
        </div>
    );
}