export const GENERATION_PARAMETER_CONFIG = {
    format: {
        type: "format",
        label: "Output Format",

        options: [
            {
                value: "studydoc",
                label: "Study Doc",
                description:
                    "Formatted as a textbook lesson. Features the information sequentially with navigation for easy exploration.",
                icon: "document",
            },
            {
                value: "presentation",
                label: "Presentation",
                description:
                    "Formatted as a slide deck. Features the information in discrete slides with full screen option for easy presenting.",
                icon: "presentation",
            },
        ],

        defaultValue: "studydoc",
    },

    language: {
        type: "select",
        label: "Output Language",

        options: [
            {
                value: "en",
                label: "English",
            },
            {
                value: "es",
                label: "Spanish",
            },
            {
                value: "de",
                label: "German",
            },
            {
                value: "fr",
                label: "French",
            },
            {
                value: "bg",
                label: "Bulgarian",
            },
        ],

        defaultValue: "en",
    },

    audience: {
        type: "select",
        label: "Target Audience",

        options: [
            {
                value: "beginner_eli5",
                label: "Beginner / ELI5",
            },
            {
                value: "high_school",
                label: "High School",
            },
            {
                value: "undergraduate",
                label: "Undergraduate",
            },
            {
                value: "expert",
                label: "Expert",
            },
        ],

        defaultValue: "undergraduate",
    },

    tone: {
        type: "select",
        label: "Tone & Voice",

        options: [
            {
                value: "academic_precise",
                label: "Academic & Precise",
            },
            {
                value: "conversational",
                label: "Conversational",
            },
            {
                value: "encouraging_tutor",
                label: "Encouraging Tutor",
            },
            {
                value: "socratic_inquiry",
                label: "Socratic / Inquiry",
            },
        ],

        defaultValue: "academic_precise",
    },

    style_density: {
        type: "select",
        label: "Format Density",

        options: [
            {
                value: "cheat_sheet",
                label: "Cheat Sheet",
            },
            {
                value: "exam_prep",
                label: "Exam Prep",
            },
            {
                value: "balanced_lesson",
                label: "Balanced Lesson",
            },
            {
                value: "encyclopedic",
                label: "Encyclopedic",
            },
        ],

        defaultValue: "balanced_lesson",
    },

    explanation_style: {
        type: "select",
        label: "Explanation Focus",

        options: [
            {
                value: "analogy_heavy",
                label: "Analogy-Heavy",
            },
            {
                value: "first_principles",
                label: "First-Principles",
            },
            {
                value: "worked_examples",
                label: "Worked Examples",
            },
            {
                value: "definitions",
                label: "Definitions",
            },
        ],

        defaultValue: "first_principles",
    },

    allowed_elements: {
        type: "multi-toggle",
        label: "Allowed Elements",

        options: [
            {
                key: "practice_questions",
                label: "Practice Questions",
                defaultValue: true,
            },
            {
                key: "visuals",
                label: "Visuals",
                defaultValue: true,
            },
            {
                key: "summaries",
                label: "Summaries",
                defaultValue: true,
            },
            {
                key: "examples",
                label: "Examples",
                defaultValue: true,
            },
        ],
    },

    use_personal_context: {
        type: "toggle",
        label: "Use Personal Context",
        defaultValue: false,
    },

    use_topic_description: {
        type: "toggle",
        label: "Use Topic Description",
        defaultValue: false,
    },

    use_fine_tuning: {
        type: "toggle",
        label: "Fine-Tuning Controls",
        defaultValue: false,
    },
};


export const DEFAULT_GENERATION_PARAMETERS = {
    title: "",
    goal_prompt: "",

    format:
        GENERATION_PARAMETER_CONFIG.format.defaultValue,

    language:
        GENERATION_PARAMETER_CONFIG.language.defaultValue,

    use_personal_context:
        GENERATION_PARAMETER_CONFIG.use_personal_context.defaultValue,

    use_topic_description:
        GENERATION_PARAMETER_CONFIG.use_topic_description.defaultValue,

    use_fine_tuning:
        GENERATION_PARAMETER_CONFIG.use_fine_tuning.defaultValue,

    audience:
        GENERATION_PARAMETER_CONFIG.audience.defaultValue,

    tone:
        GENERATION_PARAMETER_CONFIG.tone.defaultValue,

    style_density:
        GENERATION_PARAMETER_CONFIG.style_density.defaultValue,

    explanation_style:
        GENERATION_PARAMETER_CONFIG.explanation_style.defaultValue,

    allowed_elements:
        Object.fromEntries(
            GENERATION_PARAMETER_CONFIG.allowed_elements.options
                .map((option) => [
                    option.key,
                    option.defaultValue,
                ])
        ),
};


export const DEFAULT_FINE_TUNING = {
    audience:
        GENERATION_PARAMETER_CONFIG.audience.defaultValue,

    tone:
        GENERATION_PARAMETER_CONFIG.tone.defaultValue,

    style_density:
        GENERATION_PARAMETER_CONFIG.style_density.defaultValue,

    explanation_style:
        GENERATION_PARAMETER_CONFIG.explanation_style.defaultValue,

    disallowed_elements: [],
};


/* UI state to API request shape */
export function buildGenerationParameters(params) {
    const fineTuningEnabled =
        Boolean(params.use_fine_tuning);

    const disallowedElements =
        Object.entries(params.allowed_elements)
            .filter(([, allowed]) => !allowed)
            .map(([key]) => key);

    return {
        title:
            params.title.trim(),

        format:
            params.format,

        language:
            params.language,

        goal_prompt:
            params.goal_prompt.trim() || null,

        use_personal_context:
            Boolean(params.use_personal_context),

        use_topic_description:
            Boolean(params.use_topic_description),

        use_fine_tuning:
            fineTuningEnabled,

        fine_tuning:
            fineTuningEnabled
                ? {
                    audience:
                        params.audience,

                    tone:
                        params.tone,

                    style_density:
                        params.style_density,

                    explanation_style:
                        params.explanation_style,

                    disallowed_elements:
                        disallowedElements,
                }
                : structuredClone(DEFAULT_FINE_TUNING),
    };
}

