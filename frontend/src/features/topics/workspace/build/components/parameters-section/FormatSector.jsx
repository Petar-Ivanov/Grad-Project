import {
    GENERATION_PARAMETER_CONFIG,
} from "../../config/generationParameters";

import {
    DocIcon,
    PresentationIcon,
} from "../../../../../../components/icons";

export default function FormatSelector({ value, onChange, theme }) {
    // const options = [
    //     { 
    //         id: "studydoc", 
    //         label: "Study Doc",
    //         icon: DocIcon, 
    //         desc: "Formated as a textbook lesson. Features the information sequentially with navigation for easy exploration." 
    //     },
    //     { 
    //         id: "presentation", 
    //         label: "Presentation",
    //         icon: PresentationIcon, 
    //         desc: "Formated as a slide deck. Features the information in discrete slides with full screen option for easy presenting." 
    //     }
    // ];

    const ICONS = {
        document: DocIcon,
        presentation: PresentationIcon,
    };

    const options =
        GENERATION_PARAMETER_CONFIG.format.options;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {options.map((option) => {
                const isActive =
                    value === option.value;

                const Icon =
                    ICONS[option.icon];

                return (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                            onChange(option.value)
                        }
                        className={`
                            relative flex items-start gap-4 rounded-xl border p-4 text-left transition-all duration-200
                            ${
                                isActive
                                    ? `${theme.badgeBg} ${theme.iconText} ring-1 ring-current shadow-sm`
                                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-900"
                            }
                        `}
                    >
                        <div
                            className={`
                                mt-0.5 flex shrink-0 items-center justify-center
                                ${
                                    isActive
                                        ? ""
                                        : "opacity-60"
                                }
                            `}
                        >
                            <Icon className="h-6 w-6" />
                        </div>

                        <div className="flex flex-col">
                            <span
                                className={`
                                    font-bold
                                    ${
                                        isActive
                                            ? "text-current"
                                            : "text-slate-900 dark:text-white"
                                    }
                                `}
                            >
                                {option.label}
                            </span>

                            <span
                                className={`
                                    mt-0.5 text-xs
                                    ${
                                        isActive
                                            ? "opacity-80"
                                            : "text-slate-500 dark:text-slate-500"
                                    }
                                `}
                            >
                                {option.description}
                            </span>
                        </div>
                    </button>
                );
            })}
            {/* {options.map((opt) => {
                const isActive = 
                    value === opt.id;

                const Icon = 
                    opt.icon;

                return (
                    <button
                        key={opt.id}
                        type="button"
                        onClick={() => 
                            onChange(opt.id)
                        }
                        className={`
                            relative flex items-start gap-4 rounded-xl border p-4 text-left transition-all duration-200
                            ${
                                isActive
                                    ? `${theme.badgeBg} ${theme.iconText} ring-1 ring-current shadow-sm`
                                    : `border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400`
                            }
                        `}
                    >
                        <div
                            className={`mt-0.5 flex shrink-0 items-center justify-center 
                                ${isActive ? "" : "opacity-60"}
                            `}
                        >
                            <Icon className="h-6 w-6" />
                        </div>

                        <div className="flex flex-col">
                            <span
                                className={`
                                    font-bold 
                                    ${
                                        isActive
                                            ? "text-current"
                                            : "text-slate-900 dark:text-white"
                                    }
                                `}
                            >
                                {opt.label}
                            </span>

                            <span
                                className={`
                                    mt-0.5 text-xs 
                                    ${
                                        isActive
                                            ? "opacity-80"
                                            : "text-slate-500 dark:text-slate-500"
                                    }
                                `}
                            >
                                {opt.desc}
                            </span>
                        </div>
                    </button>
                );
            })} */}
        </div>
    );
}