import {
    useQuery,
} from "@tanstack/react-query";

import { getContinueLearning } from "../services/dashboardService";


export const continueLearningQueryKey = [
    "dashboard",
    "continue-learning",
];

export function useContinueLearning() {
    const query =
        useQuery({
            queryKey:
                continueLearningQueryKey,

            queryFn: () =>
                getContinueLearning(6),

            staleTime:
                30_000,
        });

    return {
        materials:
            query.data ?? [],

        isLoading:
            query.isLoading,

        error:
            query.error ?? null,
    };
}