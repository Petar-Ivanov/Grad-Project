import {
    GENERATION_PARAMETER_CONFIG,
} from "../../config/generationParameters";

export default function PromptContextSector({
    title, onTitleChange, prompt, onPromptChange, language, onLanguageChange, usePersonalContext, 
    onPersonalContextChange, useTopicDescription, onTopicDescriptionChange, theme
}) {

    const languages =
        GENERATION_PARAMETER_CONFIG.language.options;

    const activeToggleBg = theme?.spine?.split(' ')[0] || 'bg-indigo-600';

    return (
        <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            
            <div className="mb-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Core Instructions & Context
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Name your material and guide the AI with specific goals and contextual data.
                </p>
            </div>

            {/* Material Title */}
            <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-900 dark:text-white">
                    Material Title <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    required
                    placeholder="e.g., Chapter 4: Cellular Respiration Summary"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white border-transparent dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-950 ${theme.ring}`}
                />
            </div>

            {/* Goal Prompt */}
            <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-900 dark:text-white">
                    Specific Instructions <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                    rows={3}
                    placeholder="e.g., Focus heavily on the Krebs cycle and ignore glycolysis for this document..."
                    value={prompt}
                    onChange={(e) => onPromptChange(e.target.value)}
                    className={`w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white border-transparent dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-950 ${theme.ring}`}
                />
            </div>

            {/* Language & Toggles */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 border-t border-slate-100 pt-6 dark:border-slate-800/80">
                
                {/* Output Language */}
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900 dark:text-white">
                        Output Language
                    </label>
                    <select
                        value={language}
                        onChange={(e) => onLanguageChange(e.target.value)}
                        className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none transition-all focus:bg-white border-transparent dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:focus:bg-slate-950 ${theme.ring}`}
                    >
                        {languages.map((lang) => (
                            <option 
                                key={lang.value} 
                                value={lang.value}
                            >
                                {lang.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Context Toggles */}
                <div className="space-y-4">
                    <label className="block text-sm font-bold text-slate-900 dark:text-white">
                        Additional Context
                    </label>
                    
                    {/* Toggle 1: Personal Context */}
                    <div 
                        className="flex items-start gap-3 cursor-pointer group"
                        onClick={() => onPersonalContextChange(!usePersonalContext)}
                    >
                        <button
                            type="button"
                            role="switch"
                            aria-checked={usePersonalContext}
                            className={`relative mt-0.5 inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-950 ${theme.ring} ${usePersonalContext ? activeToggleBg : 'bg-slate-200 dark:bg-slate-700'}`}
                        >
                            <span 
                                className={`
                                    pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out 
                                    ${usePersonalContext ? 'translate-x-4.5' : 'translate-x-0.5'}
                                `} 
                            />
                        </button>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:opacity-80 transition-opacity select-none">
                                Use Personal Context
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 select-none">
                                Includes your profile background and learning preferences in the generation prompt.
                            </span>
                        </div>
                    </div>

                    {/* Toggle 2: Topic Description */}
                    <div 
                        className="flex items-start gap-3 cursor-pointer group"
                        onClick={() => onTopicDescriptionChange(!useTopicDescription)}
                    >
                        <button
                            type="button"
                            role="switch"
                            aria-checked={useTopicDescription}
                            className={`
                                relative mt-0.5 inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-950 ${theme.ring} 
                                ${useTopicDescription ? activeToggleBg : 'bg-slate-200 dark:bg-slate-700'}
                            `}
                        >
                            <span 
                                className={`
                                    pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out 
                                    ${useTopicDescription ? 'translate-x-4.5' : 'translate-x-0.5'}
                                `} 
                            />
                        </button>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:opacity-80 transition-opacity select-none">
                                Use Topic Description
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 select-none">
                                Injects the general description of this workspace to help ground the AI.
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}