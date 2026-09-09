import { XIcon } from "../../../../../components/icons/index.jsx";

import {
    QUESTION_TYPES,
    changeQuestionType,
    updateQuestionField,
    updateQuestionOption,
    addQuestionOption,
    removeQuestionOption,
    MIN_MULTIPLE_CHOICE_OPTIONS,
} from "./questionUtils.js";

import FreeResponseQuestionEditor
    from "./editors/FreeResponseQuestionEditor.jsx";

import MultipleChoiceQuestionEditor
    from "./editors/MultipleChoiceQuestionEditor.jsx";

export default function QuestionEditorFields({ question, onChange }){
    const isMultipleChoice =
        question.type === "multiple-choice";

    const handleFieldChange = (field, value) => {
        onChange(
            updateQuestionField(question, field, value)
        );
    };

    const handleTypeChange = (event) => {
        onChange(
            changeQuestionType(question, event.target.value)
        );
    };

    const handleOptionChange = (index,value) => {
        onChange(
            updateQuestionOption(question, index, value)
        );
    };

    const handleAddOption = () => {
        onChange(
            addQuestionOption(question)
        );
    };

    const handleRemoveOption = (index) => {
        onChange(
            removeQuestionOption(question, index)
        );
    };

    return (
        <div className="flex flex-col gap-5">
            {/* Question Type and Reset */}
            <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 flex flex-col gap-1.5">
                    <label 
                        htmlFor="question-type"
                        className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                    >
                        Question Type
                    </label>
                    <select 
                        id="question-type"
                        value={
                            question.type ||
                            QUESTION_TYPES.FREE_RESPONSE
                        }
                        onChange={
                            handleTypeChange
                        }
                        className="px-3 py-2 text-sm rounded-md border border-slate-300 bg-white dark:bg-slate-950 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    >
                        <option value="multiple-choice">
                            Multiple Choice
                        </option>

                        <option value="free-response">
                            Free Response
                        </option>

                        {/* <option value="matching">
                            Match Options
                        </option>

                        <option value="fill-gap">
                            Fill in the Gap
                        </option> */}
                    </select>
                </div>

                <div className="flex-1 flex flex-col gap-1.5">
                    <label 
                        htmlFor="question-reset"
                        className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                    >
                        Allow Reset
                    </label>
                    <select 
                        id="question-reset"
                        value={question.allowReset !== false ? "true" : "false"} 
                        onChange={(event) =>
                            handleFieldChange(
                                "allowReset",
                                event.target.value === "true"
                            )
                        }
                        className="px-3 py-2 text-sm rounded-md border border-slate-300 bg-white dark:bg-slate-950 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>

            {/* Prompt */}
            <div className="flex flex-col gap-1.5">
                <label 
                    htmlFor="question-prompt"
                    className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                    Question Prompt
                </label>
                <textarea 
                    id="question-prompt"
                    value={question.prompt || ""}
                    onChange={(event) =>
                        handleFieldChange(
                            "prompt",
                            event.target.value
                        )
                    }
                    className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100 min-h-[80px] resize-y"
                />
            </div>

            {/* Multiple Choice */}
            {question.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
                <MultipleChoiceQuestionEditor
                    question={question}
                    onChange={onChange}
                />
            )}

            {/* Free Response Editor */}
            {question.type === QUESTION_TYPES.FREE_RESPONSE && (
                <FreeResponseQuestionEditor
                    question={question}
                    onChange={onChange}
                />
            )}
        </div>
    );
}