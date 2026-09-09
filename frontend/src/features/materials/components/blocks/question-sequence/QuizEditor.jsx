import { useState } from "react";
import ParameterEditor from "../../ParameterEditor.jsx";
import QuestionEditorFields from "../question-single/QuestionEditorFields.jsx";
import { XIcon } from "../../../../../components/icons/index.jsx";

import {
    addQuestionToQuiz,
    removeQuestionFromQuiz,
    updateQuestionInQuiz,
    getQuizQuestions,
} from "./quizUtils";

export default function QuizEditor({data, onChange, onSave, onCancel, onDelete}) {
    const [editingIndex, setEditingIndex] = useState(null);

    const questions = getQuizQuestions(data);

    const handleDataChange = (changes) => {
        onChange({
            ...data,
            ...changes,
        });
    };

    const handleAddQuestion = () => {
        const updatedData = addQuestionToQuiz(data);

        onChange(updatedData);

        // Automatically open the newly-created question.
        setEditingIndex(updatedData.questions.length - 1);
    };

    const handleRemoveQuestion = (event, index) => {
        event.stopPropagation();

        const updatedData = removeQuestionFromQuiz(data, index);

        onChange(updatedData);

        if (editingIndex === index) {
            setEditingIndex(null);
        } else if (editingIndex !== null && index < editingIndex) {
            setEditingIndex(editingIndex - 1);
        }
    };

    const handleQuestionChange = (index, updatedQuestion) => {
        const updatedData = updateQuestionInQuiz(data, index, updatedQuestion);

        onChange(updatedData);
    };

    const handleViewModeChange = (viewMode) => {
        if (viewMode === "paginated") {
            handleDataChange({
                viewMode,
                submitMode: "individual",
            });

            return;
        }

        handleDataChange({viewMode});
    };

    return (
        <ParameterEditor
            title="Question Sequence"
            onSave={onSave}
            onCancel={onCancel}
            onDelete={onDelete}
        >
            {editingIndex !== null ? (
                <div className="animate-in fade-in slide-in-from-right-2">
                    <button
                        type="button"
                        onClick={() => setEditingIndex(null)}
                        className="mb-4 flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                        ← Back to Sequence Settings
                    </button>

                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
                        <h4 className="mb-4 text-sm font-bold text-slate-800 dark:text-slate-200">
                            Editing Question{" "}
                            {editingIndex + 1}
                        </h4>

                        <QuestionEditorFields
                            question={questions[editingIndex]}
                            onChange={(updatedQuestion) =>
                                handleQuestionChange(editingIndex, updatedQuestion)
                            }
                        />
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Quiz title */}
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="quiz-title"
                            className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                        >
                            Sequence Title
                        </label>

                        <input
                            id="quiz-title"
                            type="text"
                            value={data.title ?? ""}
                            onChange={(event) =>
                                handleDataChange({title: event.target.value})
                            }
                            placeholder="New Quiz"
                            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                        />
                    </div>

                    {/* Quiz display settings */}
                    <div className="flex flex-col gap-4 rounded-lg bg-slate-100 p-4 dark:bg-slate-900 sm:flex-row">
                        <div className="flex flex-1 flex-col gap-1.5">
                            <label
                                htmlFor="quiz-view-mode"
                                className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                            >
                                View Mode
                            </label>

                            <select
                                id="quiz-view-mode"
                                value={data.viewMode ?? "paginated"}
                                onChange={(event) =>
                                    handleViewModeChange(event.target.value)
                                }
                                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                            >
                                <option value="paginated">
                                    Paginated
                                </option>

                                <option value="list">
                                    List
                                </option>
                            </select>
                        </div>

                        {data.viewMode === "list" && (
                            <div className="flex flex-1 flex-col gap-1.5">
                                <label
                                    htmlFor="quiz-submit-mode"
                                    className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                                >
                                    Submit Mode
                                </label>

                                <select
                                    id="quiz-submit-mode"
                                    value={ data.submitMode ?? "individual" }
                                    onChange={(event) =>
                                        handleDataChange({submitMode: event.target.value})
                                    }
                                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                                >
                                    <option value="individual">
                                        Submit Individually
                                    </option>

                                    <option value="batch">
                                        Submit All at Once
                                    </option>
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Questions */}
                    <div className="space-y-3">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Questions in Sequence (
                            {questions.length})
                        </label>

                        {questions.map(
                            (question, index) => (
                                <div
                                    key={index}
                                    onClick={() => setEditingIndex(index)}
                                    className="group flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 transition-all hover:border-indigo-500 hover:shadow-sm dark:border-slate-700 dark:bg-slate-950 dark:hover:border-indigo-400"
                                >
                                    <span className="shrink-0 rounded bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-700 dark:bg-slate-800 dark:group-hover:bg-indigo-900 dark:group-hover:text-indigo-300">
                                        {index + 1}
                                    </span>

                                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white">
                                        {question.prompt || "Untitled Question"}
                                    </span>

                                    <span className="hidden shrink-0 rounded border border-slate-100 bg-slate-50 px-2 py-1 text-[10px] font-bold uppercase text-slate-400 dark:border-slate-800 dark:bg-slate-900 sm:inline-block">
                                        {
                                            question.type ===
                                                "multiple-choice"
                                                ? "Multiple Choice"
                                                : "Open"
                                        }
                                    </span>

                                    <span className="shrink-0 text-xs font-bold text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-indigo-400">
                                        Edit →
                                    </span>

                                    <button
                                        type="button"
                                        onClick={(event) =>
                                            handleRemoveQuestion(event, index)
                                        }
                                        disabled={questions.length <= 1}
                                        className="shrink-0 p-1.5 text-slate-400 transition-colors hover:text-red-500 disabled:opacity-30 disabled:hover:text-slate-400"
                                        title="Remove Question"
                                        aria-label={`Remove question ${index + 1}`}
                                    >
                                        <XIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            )
                        )}

                        <button
                            type="button"
                            onClick={handleAddQuestion}
                            className="mt-1 flex items-center gap-1 self-start text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                        >
                            + Add Question
                        </button>
                    </div>
                </div>
            )}
        </ParameterEditor>
    );
}