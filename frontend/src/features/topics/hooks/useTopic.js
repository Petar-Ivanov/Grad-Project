import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getTopic,
    updateTopic,
    deleteTopic,
    followTopic,
    unfollowTopic,
    regenerateTopicInviteCode,
} from "../services/topicService";

import { topicAccessQueryKey,} from "./useTopicAccess";

import { topicsQueryKey,} from "./useTopics";


export function topicQueryKey(topicId) {
    return ["topic", topicId];
}


export function useTopic(topicId) {
    const queryClient = useQueryClient();
    const normalizedTopicId = String(topicId);

    const topicQuery = useQuery({
        queryKey: topicQueryKey(normalizedTopicId),

        queryFn: () => getTopic(topicId),

        enabled: Boolean(topicId),
    });


    const updateMutation = useMutation({
        mutationKey: ["update-topic", normalizedTopicId],

        mutationFn: (data) =>
            updateTopic(topicId, data),

        onSuccess: (updatedTopic) => {
            queryClient.setQueryData(
                topicQueryKey(normalizedTopicId),
                updatedTopic
            );

            queryClient.invalidateQueries({
                queryKey: topicsQueryKey,
            });
        },
    });


    const deleteMutation = useMutation({
        mutationKey: ["delete-topic", normalizedTopicId],

        mutationFn: () =>
            deleteTopic(topicId),

        onSuccess: () => {
            queryClient.removeQueries({
                queryKey: topicQueryKey(normalizedTopicId),
            });

            queryClient.invalidateQueries({
                queryKey: topicsQueryKey,
            });
        },
    });


    const followMutation = useMutation({
        mutationKey: ["follow-topic", normalizedTopicId],

        mutationFn: () =>
            followTopic(topicId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: topicAccessQueryKey(topicId),
            });

            queryClient.invalidateQueries({
                queryKey: topicsQueryKey,
            });
        },
    });


    const unfollowMutation = useMutation({
        mutationKey: ["unfollow-topic", normalizedTopicId],

        mutationFn: () =>
            unfollowTopic(topicId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: topicAccessQueryKey(topicId),
            });

            queryClient.invalidateQueries({
                queryKey: topicsQueryKey,
            });
        },
    });

    const regenerateCodeMutation =
        useMutation({
            mutationKey: 
                ["regenerate-topic-code", normalizedTopicId],

            mutationFn: (type) =>
                regenerateTopicInviteCode(topicId, type),

            onSuccess: (updatedTopic) => {
                queryClient.setQueryData(
                    topicQueryKey(normalizedTopicId),
                    updatedTopic
                );

                queryClient.invalidateQueries({
                    queryKey: topicsQueryKey,
                });
            },
        });

    return {
        topic:
            topicQuery.data ?? null,

        isLoading:
            topicQuery.isLoading,

        error:
            topicQuery.error ?? null,

        updateTopic:
            updateMutation.mutateAsync,

        deleteTopic:
            deleteMutation.mutateAsync,

        followTopic:
            followMutation.mutateAsync,

        unfollowTopic:
            unfollowMutation.mutateAsync,

        regenerateInviteCode:
            regenerateCodeMutation.mutateAsync,

        isUpdating:
            updateMutation.isPending,

        isDeleting:
            deleteMutation.isPending,

        isFollowing:
            followMutation.isPending ||
            unfollowMutation.isPending,

        // isRegeneratingCode:
        //     regenerateCodeMutation.isPending,
        isRegeneratingCode:
            regenerateCodeMutation.isPending 
                ? regenerateCodeMutation.variables 
                : null,

        mutationError:
            updateMutation.error ??
            deleteMutation.error ??
            followMutation.error ??
            unfollowMutation.error ??
            regenerateCodeMutation.error ??
            null,
    };
}