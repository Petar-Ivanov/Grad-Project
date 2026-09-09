import { XIcon } from "../../../../../../components/icons/index.jsx";
import { MIN_MULTIPLE_CHOICE_OPTIONS } from "../questionUtils";

export default function MultipleChoiceQuestionEditor({ question, onChange }) {
    const options = question.options ?? [];

    const handleAddOption = () => {
        onChange({
            ...question,
            options: [...options, ""]
        });
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        onChange({
            ...question,
            options: newOptions
        });
    };

    const handleRemoveOption = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        
        let newCorrectIndex = question.correctIndex ?? 0;
        if (newCorrectIndex === index) {
            newCorrectIndex = 0; // Default back to first option
        } else if (newCorrectIndex > index) {
            newCorrectIndex -= 1;
        }

        onChange({
            ...question,
            options: newOptions,
            correctIndex: newCorrectIndex
        });
    };

    const handleCorrectIndexChange = (index) => {
        onChange({
            ...question,
            correctIndex: index
        });
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Answers (Select Correct)
                </label>
            </div>
            
            <div className="space-y-2">
                {options.map((option, index) => (
                    <div 
                        key={`question-option-${index}`}
                        className="flex items-center gap-2 sm:gap-3"
                    >
                        <input
                            type="radio"
                            name={`question-correct-option-${question.id || 'new'}`}
                            checked={question.correctIndex === index}
                            onChange={() => handleCorrectIndexChange(index)}
                            className="h-4 w-4 shrink-0 border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900"
                            title="Mark as correct answer"
                            aria-label={`Mark option ${index + 1} as correct`}
                        />

                        <input
                            type="text"
                            value={option}
                            onChange={(event) => handleOptionChange(index, event.target.value)}
                            className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                            aria-label={`Answer option ${index + 1}`}
                        />

                        <button
                            type="button"
                            onClick={() => handleRemoveOption(index)}
                            disabled={options.length <= (MIN_MULTIPLE_CHOICE_OPTIONS || 2)}
                            className="shrink-0 p-1.5 text-slate-400 transition-colors hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-slate-400"
                            title="Remove option"
                            aria-label={`Remove option ${index + 1}`}
                        >
                            <XIcon className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>

            <button 
                type="button"
                onClick={handleAddOption}
                className="self-start text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 mt-1"
            >
                + Add Option
            </button>
        </div>
    );
}