export default function MultipleChoiceQuestion({
    data,
    answer,
    onAnswerChange,
    isSubmitted,
    disabled,
    showImmediateFeedback,
}) {
    return (
        <div className="space-y-2.5">
            {(data.options ?? []).map((option, index) => {
                    const isCorrect =
                        index === data.correctIndex;

                    const isSelected =
                        answer === index;

                    let style = "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300";

                    if (isSubmitted && showImmediateFeedback) {
                        if (isCorrect) {
                            style = "border-green-500 bg-green-50 text-green-800 dark:bg-green-950/30 dark:border-green-800 dark:text-green-400";
                        } else if (isSelected) {
                            style = "border-red-500 bg-red-50 text-red-800 dark:bg-red-950/30 dark:border-red-800 dark:text-red-400";
                        } else {
                            style = "border-slate-200 bg-slate-50 opacity-50 dark:border-slate-800 dark:bg-slate-900";
                        }
                    } else if (isSubmitted) {
                        style = isSelected
                        ? "border-slate-400 bg-slate-100 opacity-75 dark:border-slate-600 dark:bg-slate-800"
                        : "border-slate-200 bg-slate-50 opacity-50 dark:border-slate-800 dark:bg-slate-900";
                    } else if (isSelected) {
                        style = "border-indigo-500 bg-indigo-50/50 text-indigo-900 ring-1 ring-indigo-500 dark:border-indigo-400 dark:bg-indigo-950/30 dark:text-indigo-100 dark:ring-indigo-400";
                    }

                    return (
                        <button
                            key={index}
                            type="button"
                            disabled={isSubmitted || disabled}
                            onClick={() => onAnswerChange(index)}
                            className={`w-full rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all ${style}`}
                        >
                            {option}
                        </button>
                    );
                }
            )}
        </div>
    );
}