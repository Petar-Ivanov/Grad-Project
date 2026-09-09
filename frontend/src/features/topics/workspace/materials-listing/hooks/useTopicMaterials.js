import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getMaterials,
    createMaterial,
    updateMaterial,
    deleteMaterial,
    duplicateMaterial,
} from "../../../../materials/services/materialService";


export function topicMaterialsQueryKey(topicId) {
    return [
        "topic-materials",
        String(topicId),
    ];
}


export function materialQueryKey(materialId) {
    return [
        "material",
        String(materialId),
    ];
}


export function useTopicMaterials(topicId) {
    const queryClient = useQueryClient();


    const query = useQuery({
        queryKey: topicMaterialsQueryKey(topicId),

        queryFn: async () => {
            const materials = await getMaterials();

            return materials.filter((material) =>
                Number(material.topic_id) === Number(topicId)
            );
        },

        enabled: Boolean(topicId),
    });


    const invalidateLibrary = () => {
        queryClient.invalidateQueries({
            queryKey: topicMaterialsQueryKey(topicId),
        });
    };


    const createMutation =
        useMutation({
            mutationKey: [
                "create-material", 
                topicId
            ],

            mutationFn: (data) =>
                createMaterial({
                    ...data,
                    topic_id: Number(topicId),
                }),

            onSuccess: (material) => {
                queryClient.setQueryData(
                    materialQueryKey(material.id),
                    material
                );

                invalidateLibrary();
            },
        });


    const renameMutation =
        useMutation({
            mutationKey: [
                "rename-material",
                topicId,
            ],

            mutationFn:
                ({
                    materialId,
                    name,
                }) =>
                    updateMaterial(
                        materialId,
                        {
                            name,
                        }
                    ),

            onSuccess:
                (material) => {
                    queryClient.setQueryData(
                        materialQueryKey(
                            material.id
                        ),
                        material
                    );

                    invalidateLibrary();
                },
        });


    const duplicateMutation =
        useMutation({
            mutationKey: [
                "duplicate-material",
                topicId,
            ],

            mutationFn: duplicateMaterial,

            onSuccess: (material) => {
                queryClient.setQueryData(
                    materialQueryKey(material.id),
                    material
                );

                invalidateLibrary();
            },
        });


    const deleteMutation =
        useMutation({
            mutationKey: [
                "delete-material",
                topicId,
            ],

            mutationFn: deleteMaterial,

            onSuccess: (_result, materialId) => {
                queryClient.removeQueries({
                    queryKey: materialQueryKey(materialId),
                });

                invalidateLibrary();
            },
        });


    return {
        materials:
            query.data ?? [],

        isLoading:
            query.isLoading,

        error:
            query.error ?? null,

        createMaterial:
            createMutation.mutateAsync,

        renameMaterial:
            renameMutation.mutateAsync,

        duplicateMaterial:
            duplicateMutation.mutateAsync,

        deleteMaterial:
            deleteMutation.mutateAsync,

        isMutating:
            createMutation.isPending ||
            renameMutation.isPending ||
            duplicateMutation.isPending ||
            deleteMutation.isPending,

        mutationError:
            createMutation.error ??
            renameMutation.error ??
            duplicateMutation.error ??
            deleteMutation.error ??
            null,
    };
}