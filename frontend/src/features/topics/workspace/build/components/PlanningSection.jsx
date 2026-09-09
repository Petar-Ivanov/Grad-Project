import { useState } from "react";
import BuildConfirmationModal from "./planning-section/modals/BuildConfirmationModal";
import { CheckIcon, ChemistryIcon, ConstructionAnimationIcon } from "../../../../../components/icons";
import { useGeneration } from "../hooks/useGeneration";

export default function PlanningSection({
    theme,
    generationContext,
    onBuildComplete,
}) {
    const [planText, setPlanText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [validationError, setValidationError] = useState("");

    //
    const {
        generatePlan,
        buildMaterial,

        isGeneratingPlan,
        isBuildingMaterial,

        planError,
        buildError,
    } = useGeneration();

    const isBusy = isGeneratingPlan || isBuildingMaterial;

    const primaryBg = theme?.spine || "bg-indigo-600";

    const borealisGlow =
        theme?.dropBg?.replace(/hover:/g, "") ||
        "bg-slate-200 dark:bg-slate-800";

    const error = planError || buildError;

    const validateGeneration = () => {
        const title = generationContext?.parameters?.title?.trim();

        if (!title) {
            setValidationError("Please enter a material title.");
            return false;
        }

        setValidationError("");
        return true;
    };

    const handleGeneratePlan = async () => {
        if (!validateGeneration()) {
            return;
        }
        
        const payload = {
            topic_id:
                generationContext.topic_id,

            source_ids:
                [ ...generationContext.source_ids ],

            parameters:
                structuredClone(generationContext.parameters),
        };

        console.group("%cGenerate AI Plan", "font-weight: bold;");

        console.log("POST /generation/plan");
        console.log("Request payload:");
        console.log(JSON.stringify(payload, null, 2));

        console.groupEnd();

        try {
            const response =
                await generatePlan(payload);

            setPlanText(response.plan);
        } catch (error) {
            console.error("Failed to generate plan:", error);
        }
    };


    const handleOpenBuildConfirmation = () => {
        if (!validateGeneration()) {
            return;
        }
        
        if (!planText.trim()) {
            return;
        }

        setIsModalOpen(true);
    };


    const handleConfirmBuild = async () => {
        setIsModalOpen(false);

        const payload = {
            topic_id:
                generationContext.topic_id,

            source_ids:
                [ ...generationContext.source_ids ],

            parameters:
                structuredClone(generationContext.parameters),

            plan:
                planText.trim(),
        };

        console.group("%cBuild Material", "font-weight: bold;");

        console.log("POST /generation/material");
        console.log("Request payload:");
        console.log(JSON.stringify(payload, null, 2));

        console.groupEnd();

        try {
            const material =
                await buildMaterial(payload);

            onBuildComplete?.(material);
        } catch (error) {
            console.error("Failed to build material:", error);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            
            {/* Generation error */}
            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
                    {error.message}
                </div>
            )}

            {/* Custom borealis animation */}
            <style>
                {`
                    @keyframes borealisFlow {
                        0% { background-position: 200% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    .animate-borealis {
                        background-size: 200% 100%;
                        /* linear timing makes the speed constant, creating a seamless unending loop */
                        animation: borealisFlow 4s linear infinite; 
                    }
                `}
            </style>

            {/* Plan Area */}
            <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                    Material Outline & Plan
                </label>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                    Draft a structural plan manually, or let the AI generate one based on your attached sources and generation parameters.
                </p>

                <div className="relative">
                    
                    {/* Borealis Edge Effect */}
                    {isBusy && (
                        <>
                            {/* base glow */}
                            <div className={`absolute -inset-1.5 z-0 rounded-2xl blur-md opacity-80 transition-all duration-700 ${borealisGlow}`} />
                            
                            {/* flowing current */}
                            <div 
                                className={`absolute -inset-1.5 z-0 rounded-2xl blur-md opacity-60 animate-borealis transition-all duration-700 ${theme.iconText}`}
                                style={{
                                    backgroundImage: 'linear-gradient(110deg, transparent 0%, currentColor 25%, transparent 50%, currentColor 75%, transparent 100%)'
                                }}
                            />
                        </>
                    )}

                    <textarea
                        value={planText}
                        onChange={(e) => 
                            setPlanText(e.target.value)
                        }
                        placeholder="1. Introduction...\n2. Deep dive into concept A...\n3. Summary..."
                        disabled={isBusy}
                        className={`
                            relative z-10 h-48 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:focus:bg-slate-950 
                            ${theme.ring} 
                            ${isBusy ? 'opacity-90 cursor-wait shadow-inner' : ''}
                        `}
                    />
                    
                    {/* Generation Overlay */}
                    {isBusy && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-white/20 dark:bg-slate-950/20 backdrop-blur-[2px] transition-all duration-300">
                            <div className={`flex flex-col items-center justify-center gap-4 rounded-2xl p-8 ${theme.iconText}`}>
                                <ConstructionAnimationIcon className="h-12 w-12 sm:h-16 sm:w-16 drop-shadow-md" />
                                <span className="text-lg sm:text-xl font-extrabold tracking-wide text-center drop-shadow-sm">
                                    {isBuildingMaterial ? "building material ..." : "drafting plan ..."}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {validationError && (
                <p className="text-sm font-medium text-red-500">
                    {validationError}
                </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                
                <button
                    onClick={handleGeneratePlan}
                    disabled={isBusy}
                    className={`
                        flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 
                        ${
                            isBusy 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-slate-50 dark:hover:bg-slate-900'
                        }
                    `}
                >
                    <ChemistryIcon className="h-4 w-4" />
                    {
                        isGeneratingPlan
                        ? "Generating Plan..."
                        : "Generate AI Plan"
                    }
                </button>

                <button
                    onClick={handleOpenBuildConfirmation}
                    disabled={!planText.trim() || isBusy}
                    className={`
                        flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all 
                        ${!planText.trim() || isBusy 
                            ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed text-slate-500 dark:text-slate-500' 
                            : `${primaryBg} hover:opacity-90 hover:shadow-md`
                        }
                    `}
                >
                    <CheckIcon className="h-4 w-4" />
                    {
                        isBuildingMaterial
                        ? "Building..."
                        : "Build Material"
                    }
                </button>
            </div>

            <BuildConfirmationModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={handleConfirmBuild}
                theme={theme}
            />
        </div>
    );
}
