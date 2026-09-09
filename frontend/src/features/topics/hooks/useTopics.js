import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getTopics,
    createTopic,
    updateTopic,
    deleteTopic,
    followTopic,
    unfollowTopic,
    joinTopic,
} from "../services/topicService";


export const topicsQueryKey = ["topics"];


export function useTopics() {
    const queryClient = useQueryClient();


    const query = useQuery({
        queryKey: topicsQueryKey,

        queryFn: getTopics,

        staleTime: 30_000,
    });


    const createMutation = useMutation({
        mutationKey: ["create-topic"],

        mutationFn: createTopic,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: topicsQueryKey,
            });
        },
    });


    const updateMutation = useMutation({
        mutationKey: ["update-topic"],

        mutationFn: ({topicId, data, }) => updateTopic(topicId, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: topicsQueryKey,
            });
        },
    });


    const deleteMutation = useMutation({
        mutationKey: ["delete-topic"],

        mutationFn: deleteTopic,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: topicsQueryKey,
            });
        },
    });


    const followMutation = useMutation({
        mutationKey: ["follow-topic"],

        mutationFn: followTopic,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: topicsQueryKey,
            });
        },
    });


    const unfollowMutation = useMutation({
        mutationKey: ["unfollow-topic"],

        mutationFn: unfollowTopic,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: topicsQueryKey,
            });
        },
    });


    const joinMutation = useMutation({
        mutationKey: ["join-topic"],

        mutationFn: joinTopic,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: topicsQueryKey,
            });
        },
    });


    return {
        topics:
            query.data ?? [],

        isLoading:
            query.isLoading,

        error:
            query.error ?? null,

        createTopic:
            createMutation.mutateAsync,

        updateTopic:
            updateMutation.mutateAsync,

        deleteTopic:
            deleteMutation.mutateAsync,

        followTopic:
            followMutation.mutateAsync,

        unfollowTopic:
            unfollowMutation.mutateAsync,

        joinTopic:
            joinMutation.mutateAsync,

        isMutating:
            createMutation.isPending ||
            updateMutation.isPending ||
            deleteMutation.isPending ||
            followMutation.isPending ||
            unfollowMutation.isPending ||
            joinMutation.isPending,

        mutationError:
            createMutation.error ??
            updateMutation.error ??
            deleteMutation.error ??
            followMutation.error ??
            unfollowMutation.error ??
            joinMutation.error ??
            null,
    };
}