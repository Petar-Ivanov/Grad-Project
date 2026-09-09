import {
    GENERATION_PARAMETER_CONFIG,
} from "../../config/generationParameters";

export default function PresetParametersSector({ params, onChange, theme }) {
    const isExpanded =
        Boolean(params.use_fine_tuning);
    
    const DROPDOWN_GROUPS = [
        {
            key: "audience",
            ...GENERATION_PARAMETER_CONFIG.audience,
        },
        {
            key: "tone",
            ...GENERATION_PARAMETER_CONFIG.tone,
        },
        {
            key: "style_density",
            ...GENERATION_PARAMETER_CONFIG.style_density,
        },
        {
            key: "explanation_style",
            ...GENERATION_PARAMETER_CONFIG.explanation_style,
        },
    ];

    const ALLOWED_ELEMENTS =
        GENERATION_PARAMETER_CONFIG.allowed_elements.options;

    const handleDropdownChange = (key, value) => {
        onChange((previous) => ({
            ...previous,
            [key]: value,
        }));
    };

    const handleElementToggle = (key) => {
        onChange((previous) => ({
            ...previous,

            allowed_elements: {
                ...previous.allowed_elements,

                [key]:
                    !previous.allowed_elements[key],
            },
        }));
    };

    const handleFineTuningToggle = () => {
        onChange((previous) => ({
            ...previous,

            use_fine_tuning:
                !previous.use_fine_tuning,
        }));
    };

    const switchBgActive =
        theme?.spine?.split(" ")[0] || "bg-indigo-600";


    return (
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800/60 dark:bg-slate-900/20 transition-all duration-300">
            
            {/* Header */}
            <div 
                className="flex items-center justify-between cursor-pointer" 
                onClick={handleFineTuningToggle}
            >
                <div>
                    <h4 className="select-none text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Fine-Tuning Controls
                    </h4>

                    <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                        Optional controls for more specific generation behavior.
                    </p>
                </div>
                
                <button
                    type="button"
                    role="switch"
                    aria-checked={isExpanded}
                    onClick={(event) => {
                        event.stopPropagation();
                        handleFineTuningToggle();
                    }}
                    className={`
                        relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 
                        ${theme.ring} 
                        ${
                            isExpanded 
                            ? switchBgActive 
                            : 'bg-slate-200 dark:bg-slate-700'
                        }
                    `}
                >
                    <span 
                        className={`
                            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out 
                            ${
                                isExpanded 
                                ? 'translate-x-4.5' 
                                : 'translate-x-0.5'
                            }
                        `} 
                    />
                </button>
            </div>
            
            {/* Expandable Content */}
            <div 
                className={`
                    grid transition-all duration-300 ease-in-out 
                    ${
                        isExpanded 
                        ? 'grid-rows-[1fr] opacity-100 mt-6' 
                        : 'grid-rows-[0fr] opacity-0 mt-0'
                    }
                `}
            >
                <div className="overflow-hidden">
                    
                    {/* Dropdowns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                        {DROPDOWN_GROUPS.map((group) => (
                            <div 
                                key={group.key} 
                                className="flex flex-col gap-1.5"
                            >
                                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    {group.label}
                                </label>

                                <select
                                    value={params[group.key]}
                                    onChange={(event) =>
                                        handleDropdownChange(group.key, event.target.value)
                                    }
                                    tabIndex={isExpanded ? 0 : -1}
                                    className={`w-full rounded-lg border border-transparent bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition-colors focus:ring-1 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 ${theme.ring}`}
                                >
                                    {group.options.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>

                    {/* Allowed Elements */}
                    <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">
                            Allowed Elements
                        </label>

                        <div className="flex flex-col gap-3.5">
                            {ALLOWED_ELEMENTS.map((element) => (
                                <label
                                    key={element.key}
                                    className="flex w-fit cursor-pointer items-start gap-3 group"
                                >
                                    <input
                                        type="checkbox"
                                        checked={Boolean(params.allowed_elements[element.key])}
                                        onChange={() =>
                                            handleElementToggle(element.key)
                                        }
                                        className={`mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 bg-white transition-colors focus:ring-2 focus:ring-offset-1 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-offset-slate-950 ${theme.checkbox}`}
                                    />

                                    <span className="text-sm font-medium text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-200">
                                        {element.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}