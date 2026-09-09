export default function FreeResponseQuestion({
    data,
    answer,
    onAnswerChange,
    isSubmitted,
    disabled,
    showImmediateFeedback,
}) {
    return (
        <div className="space-y-3">
            <textarea
                disabled={isSubmitted || disabled}
                value={answer || ""}
                onChange={(event) =>
                    onAnswerChange(event.target.value)
                }
                placeholder="Type your reasoning here..."
                className="min-h-[100px] w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white disabled:opacity-75"
            />

            {isSubmitted &&
                showImmediateFeedback &&
                data.feedbackTarget && (
                    <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-900 dark:bg-indigo-950/30">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                            AI Feedback Target
                        </span>

                        <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                            {data.feedbackTarget}
                        </p>
                    </div>
                )}
        </div>
    );
}