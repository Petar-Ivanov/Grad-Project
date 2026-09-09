import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { recordMaterialVisit } from "../services/materialPersonalService";
import { materialUserStateQueryKey } from "./useStudyDocumentPersonalState";


export const continueLearningQueryKey = [
    "dashboard",
    "continue-learning",
];


export function useMaterialVisit() {
    const queryClient =
        useQueryClient();

    const mutation =
        useMutation({
            mutationKey: [
                "record-material-visit",
            ],

            mutationFn: (materialId) =>
                recordMaterialVisit(materialId),

            onSuccess: (savedState) => {
                queryClient.setQueryData(
                    materialUserStateQueryKey(savedState.material_id),
                    savedState
                );

                queryClient.invalidateQueries({
                    queryKey:
                        continueLearningQueryKey,
                });
            },
        });

    return {
        recordVisit:
            mutation.mutate,

        isRecording:
            mutation.isPending,

        error:
            mutation.error ?? null,
    };
}