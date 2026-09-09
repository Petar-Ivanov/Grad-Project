import {
    QUESTION_TYPES,
} from "./questionUtils.js";

import MultipleChoiceQuestion from "./renderers/MultipleChoiceQuestion.jsx";

import FreeResponseQuestion from "./renderers/FreeResponseQuestion.jsx";

import { ResetIcon, LockIcon } from "../../../../../components/icons/index.jsx";

const QUESTION_RENDERERS = {
    [QUESTION_TYPES.MULTIPLE_CHOICE]:
        MultipleChoiceQuestion,

    [QUESTION_TYPES.FREE_RESPONSE]:
        FreeResponseQuestion,

};

export default function QuestionRenderer({
    data,
    answer,
    onAnswerChange,
    isSubmitted,
    onSubmit,
    onReset,
    disabled,
    hideActions = false,
    showImmediateFeedback = true,
}) {
    const Renderer = QUESTION_RENDERERS[data.type];

    const allowReset = data.allowReset !== false;

    const isAnswered = getIsAnswered(data, answer);

    const handleSubmit = () => {
        if (!isAnswered) {
            return;
        }

        onSubmit();
    };

    return(
        <div className="w-full">
            {/* Prompt */}
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                {data.prompt}
            </h3>

            {/* Unsupported type */}
            {!Renderer && (
                <UnsupportedQuestion
                    type={data.type}
                />
            )}

            {/* Actual question */}
            {Renderer && (
                <Renderer
                    data={data}
                    answer={answer}
                    onAnswerChange={onAnswerChange}
                    isSubmitted={isSubmitted}
                    disabled={disabled}
                    showImmediateFeedback={showImmediateFeedback}
                />
            )}

            {/* Actions */}
            {!hideActions && (
                <div className="mt-6 flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800/60">
                    <button
                        type="button"
                        onClick={onReset}
                        disabled={disabled || !allowReset}
                        className={`
                            flex items-center gap-1.5
                            text-xs font-semibold transition-colors 
                            ${
                                allowReset 
                                ? 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 disabled:opacity-50' 
                                : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                            }
                        `}
                    >
                        {allowReset ? (
                            <>
                                <ResetIcon className="h-3.5 w-3.5"/>
                                Reset
                            </>
                        ) : (
                            <>
                                <LockIcon className="h-3.5 w-3.5"/>
                                Reset Locked
                            </>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitted || disabled || !isAnswered}
                        className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitted ? "Submitted" : "Check Answer"}
                    </button>
                </div>
            )}
        </div>
    );
}

function getIsAnswered(data, answer) {
    switch (data.type) {
        case QUESTION_TYPES.MULTIPLE_CHOICE:
            return (
                answer !== null &&
                answer !== undefined
            );

        case QUESTION_TYPES.FREE_RESPONSE:
            return Boolean(
                typeof answer === "string"
                ? answer.trim()
                : answer
            );

        default:
            return false;
    }
}

function UnsupportedQuestion({type}) {
    return (
        <div className="rounded-lg border border-dashed border-red-300 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/20 dark:text-red-400">
            Unsupported question type:{" "}
            {type}
        </div>
    );
}