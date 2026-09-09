import { useEffect, useState } from "react";

import QuestionRenderer from "../question-single/QuestionRenderer.jsx";
import QuizEditor from "./QuizEditor.jsx";
import { ResetIcon } from "../../../../../components/icons/index.jsx";

import {
    isPaginatedQuiz,
    isBatchSubmitQuiz,
} from "./quizUtils";

export default function QuizBlock({ data, isEditing, setIsEditing, onDelete, onUpdate }){
    // sequence settings
    const [currentData, setCurrentData] = useState(data);
    const [draftData, setDraftData] = useState(data);

    // state tracking for multiple questions
    const [answers, setAnswers] = useState({});
    const [submittedStates, setSubmittedStates] = useState({});
    
    // pagination & batch states
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isBatchSubmitted, setIsBatchSubmitted] = useState(false);

    // keeping data synchronized with external changes
    useEffect(() => {
        setCurrentData(data);

        if (!isEditing) {
            setDraftData(data);
        }
    }, [data, isEditing]);

    // loading draft data when editing starts
    useEffect(() => {
        if (isEditing) {
            setDraftData(currentData);
        }
    }, [isEditing, currentData]);

    // keeping index valid on change while viewing it
    useEffect(() => {
        const questionCount = currentData?.questions?.length ?? 0;

        if (questionCount === 0) {
            setCurrentIndex(0);
            return;
        }

        setCurrentIndex((index) =>
            Math.min(index, questionCount - 1)
        );
    }, [currentData?.questions?.length]);

    const questions = currentData?.questions ?? [];

    const isPaginated = isPaginatedQuiz(currentData);
    const isBatchSubmit = isBatchSubmitQuiz(currentData);

    // Editing

    const handleSave = () => {
        setCurrentData(draftData);
        setDraftData(draftData);
        setIsEditing(false);

        onUpdate?.(draftData);
    };

    const handleCancel = () => {
        setDraftData(currentData);
        setIsEditing(false);
    };

    // Question interactions

    const handleAnswerChange = (index, value) => {
        setAnswers((previous) => ({
            ...previous,
            [index]: value,
        }));
    };

    const handleSingleSubmit = (index) => {
        setSubmittedStates((previous) => ({
            ...previous,
            [index]: true,
        }));
    };

    const handleSingleReset = (index) => {
        setAnswers((previous) => {
            const next = { ...previous };
            delete next[index];
            return next;
        });

        setSubmittedStates((previous) => ({
            ...previous,
            [index]: false,
        }));
    };

    const handleBatchSubmit = () => {
        const submitted = {};

        questions.forEach((_, index) => {
            submitted[index] = true;
        });

        setSubmittedStates(submitted);
        setIsBatchSubmitted(true);
    };

    const handleResetAll = () => {
        setAnswers({});
        setSubmittedStates({});
        setIsBatchSubmitted(false);
        setCurrentIndex(0);
    };

    const handlePrevious = () => {
        setCurrentIndex((index) =>
            Math.max(0, index - 1)
        );
    };

    const handleNext = () => {
        setCurrentIndex((index) =>
            Math.min(questions.length - 1, index + 1)
        );
    };

    // invalid quiz
    if (questions.length === 0) {
        return (
            <div className="my-8 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                This quiz does not contain any questions.
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];

    return (
        <div className="my-8">
            {/* Parameter Editor */}

            {isEditing && (
                <div className="mb-6">
                    <QuizEditor
                        data={draftData}
                        onChange={setDraftData}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        onDelete={onDelete}
                    />
                </div>
            )}
            
            {/* Display Component Layout */}
            {!isEditing && (
                <>
                    {/* Header for Sequence */}
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            {currentData.title || "Knowledge Check"}
                        </h2>
                        {isPaginated && (
                            <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                                {currentIndex + 1} of {currentData.questions.length}
                            </span>
                        )}
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                        {/* Pagination View */}
                        {isPaginated && (
                            <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                                <QuestionRenderer 
                                    data={currentData.questions[currentIndex]}
                                    answer={answers[currentIndex]}
                                    onAnswerChange={(val) => setAnswers(prev => ({ ...prev, [currentIndex]: val }))}
                                    isSubmitted={submittedStates[currentIndex]}
                                    disabled={isEditing}
                                    onSubmit={() => handleSingleSubmit(currentIndex)}
                                    onReset={() => handleSingleReset(currentIndex)}
                                />

                                {/* Pagination Controls */}
                                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex justify-between">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setCurrentIndex(c => Math.max(0, c - 1))}
                                            disabled={currentIndex === 0}
                                            className="px-4 py-2 text-sm font-semibold text-slate-600 disabled:opacity-30 dark:text-slate-300"
                                        >
                                            ← Previous
                                        </button>

                                        <button
                                            onClick={() => setCurrentIndex(c => Math.min(currentData.questions.length - 1, c + 1))}
                                            disabled={currentIndex === currentData.questions.length - 1}
                                            className="px-4 py-2 text-sm font-semibold text-slate-600 disabled:opacity-30 dark:text-slate-300"
                                        >
                                            Next →
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                        )}

                        {/* List View */}
                        {!isPaginated && (
                            <div className="space-y-8">
                                {currentData.questions.map((question, index) => (
                                    <div 
                                        key={index} 
                                        className={index !== 0 ? "pt-8 border-t border-slate-100 dark:border-slate-800/60" : ""}
                                    >
                                        <QuestionRenderer 
                                            data={question}
                                            answer={answers[index]}
                                            onAnswerChange={(val) => setAnswers(prev => ({ ...prev, [index]: val }))}
                                            isSubmitted={submittedStates[index]}
                                            disabled={isEditing || isBatchSubmitted}
                                            hideActions={isBatchSubmit}
                                            onSubmit={() => handleSingleSubmit(index)}
                                            onReset={() => handleSingleReset(index)}
                                            showImmediateFeedback={!isBatchSubmit || isBatchSubmitted}
                                        />
                                    </div>
                                ))}

                                {/* Batch Submit Footer */}
                                {isBatchSubmit && (
                                    <div className="mt-6 flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800/60">
                                        <div>
                                            {isBatchSubmitted && (
                                                <button
                                                    onClick={handleResetAll}
                                                    disabled={isEditing}
                                                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                                                >
                                                    <ResetIcon className="h-3.5 w-3.5"/>
                                                    Reset
                                                </button>
                                            )}
                                        </div>
                                        <button
                                            onClick={handleBatchSubmit}
                                            disabled={isBatchSubmitted || isEditing}
                                            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isBatchSubmitted ? "Quiz Completed" : "Submit All Answers"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
            
        </div>
    );
}

