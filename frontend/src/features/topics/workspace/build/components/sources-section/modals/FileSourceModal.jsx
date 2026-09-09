import React, { useEffect, useState } from "react";

export default function FileSourceModal({
    isOpen,
    initialData,
    onSave,
    onCancel,
    theme,
    isSubmitting = false,
}) {
    const [name, setName] = useState("");

    const buttonTheme = theme?.spine || "bg-indigo-600";

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setName(initialData?.name || "");
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen, initialData]);

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedName = name.trim();

        if (!trimmedName || isSubmitting) {
            return;
        }

        onSave({
            name: trimmedName,
        });
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200 dark:border-slate-800 dark:bg-slate-900"
            >
                <h3 className="mb-5 text-lg font-bold text-slate-900 dark:text-white">
                    Edit File
                </h3>

                <div className="mb-6">
                    <label className="mb-1.5 block text-sm font-semibold text-slate-900 dark:text-white">
                        Source Name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Biology Textbook Chapter 4"
                        autoFocus
                        disabled={isSubmitting}
                        className={`w-full rounded-lg border border-transparent bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition-all focus:bg-white focus:ring-1 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 ${theme?.ring ?? ""}`}
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={!name.trim() || isSubmitting}
                        className={`rounded-lg px-4 py-2 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 ${buttonTheme}`}
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}