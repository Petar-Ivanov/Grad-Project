import {useState } from "react";
import {useOutletContext} from "react-router-dom";
import {useTopicAccess} from "../../../hooks/useTopicAccess";

import CollapsibleSection from "../components/CollapsibleSection";
import SourcesSection from "../components/SourcesSection";
import ParametersSection from "../components/ParametersSection";
import PlanningSection from "../components/PlanningSection";
import MaterialCard from "../../materials-listing/components/MaterialCard";

import {
    DEFAULT_GENERATION_PARAMETERS,
    buildGenerationParameters,
} from "../config/generationParameters";

export default function Build() {
    const { topic, theme } = 
        useOutletContext();

    const {canEdit} = 
        useTopicAccess(topic.id);

    // const [selectedSourceIds, setSelectedSourceIds] = useState([]);
    // const [generatedMaterial, setGeneratedMaterial] = useState(null);
    const [selectedSourceIds, setSelectedSourceIds] = useState([]);

    const [parameters, setParameters] = useState(() => 
        structuredClone(DEFAULT_GENERATION_PARAMETERS)
    );

    const [generatedMaterial, setGeneratedMaterial] = useState(null);

    const generationParameters =
        buildGenerationParameters(parameters);

    return (
        <div className="mx-auto max-w-4xl space-y-6 pb-32">
            
            {/* Header Description */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Material Generator
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Configure your AI generation pipeline. Start by providing grounding sources, then define the output structure.
                </p>
            </div>

            {/* Section 1: Sources */}
            <CollapsibleSection 
                title="1. Knowledge Sources" 
                description="Upload files, paste links, or write text to ground the AI's knowledge."
                defaultOpen={true}
                theme={theme}
            >
                <SourcesSection
                    topicId={topic.id}
                    theme={theme}
                    canEdit={canEdit}
                    onSelectionChange={setSelectedSourceIds}
                />
            </CollapsibleSection>

            {/* Section 2: Parameters */}
            <CollapsibleSection 
                title="2. Generation Parameters" 
                description="Set the format, tone, complexity, and specific instructions for the output."
                defaultOpen={true}
                theme={theme}
            >
                <ParametersSection
                    value={parameters}
                    onChange={setParameters}
                    theme={theme}
                />
            </CollapsibleSection>

            {/* Section 3: Planning */}
            <CollapsibleSection 
                title="3. Material Plan & Build" 
                description="Draft an outline and confirm the final generation of your material."
                defaultOpen={!generatedMaterial} // auto collapse on material generated
                theme={theme}
            >
                <PlanningSection
                    theme={theme}
                    generationContext={{
                        topic_id: topic.id,
                        source_ids: selectedSourceIds,
                        parameters: generationParameters,
                    }}
                    onBuildComplete={(material) =>
                        setGeneratedMaterial(material)
                    }
                />
            </CollapsibleSection>

            {/* This section only appears after generation is complete */}
            {generatedMaterial && (
                <CollapsibleSection 
                    title="Generation Complete!" 
                    description="Your material is ready. Click the card below to open and review it."
                    defaultOpen={true}
                    theme={theme}
                >
                    <div className="pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            <MaterialCard 
                                item={generatedMaterial} 
                                theme={theme} 
                                viewMode="grid" 
                                hideActions={true} 
                            />
                        </div>
                    </div>
                </CollapsibleSection>
            )}

        </div>
    );
}
