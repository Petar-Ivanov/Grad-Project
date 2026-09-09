// import { useState } from "react";
import FormatSelector from "./parameters-section/FormatSector";
import PromptContextSector from "./parameters-section/PromptContextSector";
import PresetParametersSector from "./parameters-section/PresetParametersSector";

export default function ParametersSection({value, onChange, theme}) {

    const updateField = (field, nextValue) => {
        onChange((previous) => ({
            ...previous,
            [field]: nextValue,
        }));
    };

    return (
        <div className="flex flex-col gap-8">
            <FormatSelector
                value={value.format}
                onChange={(nextValue) =>
                    updateField("format", nextValue)
                }
                theme={theme}
            />

            <PromptContextSector
                title={value.title}
                onTitleChange={(nextValue) =>
                    updateField("title", nextValue)
                }

                prompt={value.goal_prompt}
                onPromptChange={(nextValue) =>
                    updateField("goal_prompt", nextValue)
                }

                language={value.language}
                onLanguageChange={(nextValue) =>
                    updateField("language", nextValue)
                }

                usePersonalContext={
                    value.use_personal_context
                }
                onPersonalContextChange={(nextValue) =>
                    updateField("use_personal_context", nextValue)
                }

                useTopicDescription={
                    value.use_topic_description
                }
                onTopicDescriptionChange={(nextValue) =>
                    updateField("use_topic_description", nextValue)
                }

                theme={theme}
            />

            <PresetParametersSector
                params={value}
                onChange={onChange}
                theme={theme}
            />
        </div>
    );
}