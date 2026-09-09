import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getTopicMembers,
    updateTopicMemberRole,
    removeTopicMember,
} from "../../../services/topicService";


export function topicMembersQueryKey(topicId) {
    return [
        "topic-members",
        topicId,
    ];
}


export function useTopicMembers(topicId) {
    const queryClient = useQueryClient();


    const query = useQuery({
        queryKey: topicMembersQueryKey(topicId),

        queryFn: () =>
            getTopicMembers(topicId),

        enabled: Boolean(topicId),
    });


    const updateRoleMutation =
        useMutation({
            mutationKey: [
                "update-topic-member-role",
                topicId,
            ],

            mutationFn:
                ({ userId, role, }) =>
                    updateTopicMemberRole(topicId, userId, role),

            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: topicMembersQueryKey(topicId),
                });
            },
        });


    const removeMutation =
        useMutation({
            mutationKey: [
                "remove-topic-member",
                topicId,
            ],

            mutationFn:
                (userId) =>
                    removeTopicMember(topicId, userId),

            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: topicMembersQueryKey(topicId),
                });
            },
        });


    return {
        members:
            query.data ?? [],

        isLoading:
            query.isLoading,

        error:
            query.error ?? null,

        updateRole:
            updateRoleMutation.mutateAsync,

        removeMember:
            removeMutation.mutateAsync,

        isUpdating:
            updateRoleMutation.isPending ||
            removeMutation.isPending,

        mutationError:
            updateRoleMutation.error ??
            removeMutation.error ??
            null,
    };
}