import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getTopicSources,
    createFileSource,
    createLinkSource,
    createTextSource,
    updateSource,
    deleteSource,
} from "../services/sourceService";


export function topicSourcesQueryKey(topicId) {
    return [
        "topic-sources",
        String(topicId),
    ];
}


export function useTopicSources(topicId) {
    const queryClient =
        useQueryClient();


    const query =
        useQuery({
            queryKey:
                topicSourcesQueryKey(topicId),

            queryFn: () =>
                getTopicSources(topicId),

            enabled:
                Boolean(topicId),
        });


    const invalidateSources = () =>
        queryClient.invalidateQueries({
            queryKey:
                topicSourcesQueryKey(topicId),
        });


    const createFileMutation =
        useMutation({
            mutationKey: [
                "create-file-source",
                topicId,
            ],

            mutationFn: (file) =>
                createFileSource(topicId, file),

            onSuccess: () => {
                invalidateSources();
            },
        });


    const createLinkMutation =
        useMutation({
            mutationKey: [
                "create-link-source",
                topicId,
            ],

            mutationFn: (data) =>
                createLinkSource(topicId, data),

            onSuccess: () => {
                invalidateSources();
            },
        });


    const createTextMutation =
        useMutation({
            mutationKey: [
                "create-text-source",
                topicId,
            ],

            mutationFn: (data) =>
                createTextSource(topicId, data),

            onSuccess: () => {
                invalidateSources();
            },
        });


    const updateMutation =
        useMutation({
            mutationKey: [
                "update-source",
                topicId,
            ],

            mutationFn: ({sourceId, data}) =>
                updateSource(sourceId, data),

            onSuccess: () => {
                invalidateSources();
            },
        });


    const deleteMutation =
        useMutation({
            mutationKey: [
                "delete-source",
                topicId,
            ],

            mutationFn:
                deleteSource,

            onSuccess: () => {
                invalidateSources();
            },
        });


    return {
        sources:
            query.data ?? [],

        isLoading:
            query.isLoading,

        error:
            query.error ??
            null,

        createFileSource:
            createFileMutation.mutateAsync,

        createLinkSource:
            createLinkMutation.mutateAsync,

        createTextSource:
            createTextMutation.mutateAsync,

        updateSource:
            updateMutation.mutateAsync,

        deleteSource:
            deleteMutation.mutateAsync,

        isMutating:
            createFileMutation.isPending ||
            createLinkMutation.isPending ||
            createTextMutation.isPending ||
            updateMutation.isPending ||
            deleteMutation.isPending,

        mutationError:
            createFileMutation.error ??
            createLinkMutation.error ??
            createTextMutation.error ??
            updateMutation.error ??
            deleteMutation.error ??
            null,
    };
}