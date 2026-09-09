export default function FreeResponseQuestionEditor({ question, onChange }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label 
                htmlFor="question-feedback"
                className="text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
                Feedback
            </label>
            <textarea 
                id="question-feedback"
                value={question.feedbackTarget || ""}
                onChange={(event) =>
                    onChange({
                        ...question,
                        feedbackTarget: event.target.value
                    })
                }
                placeholder="What concepts should the student mention?"
                className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100 min-h-[80px] resize-y"                    
            />
        </div>
    );
}