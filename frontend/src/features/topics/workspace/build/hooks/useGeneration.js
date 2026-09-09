import {
    useMutation,
} from "@tanstack/react-query";

import {
    generatePlan,
    buildMaterial,
} from "../services/generationService";


export function useGeneration() {
    const generatePlanMutation =
        useMutation({
            mutationKey: [
                "generate-material-plan",
            ],

            mutationFn:
                generatePlan,
        });

    const buildMaterialMutation =
        useMutation({
            mutationKey: [
                "build-material",
            ],

            mutationFn:
                buildMaterial,
        });

    return {
        generatePlan:
            generatePlanMutation.mutateAsync,

        buildMaterial:
            buildMaterialMutation.mutateAsync,

        isGeneratingPlan:
            generatePlanMutation.isPending,

        isBuildingMaterial:
            buildMaterialMutation.isPending,

        planError:
            generatePlanMutation.error ?? null,

        buildError:
            buildMaterialMutation.error ?? null,
    };
}