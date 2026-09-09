import { useCallback } from "react";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getMaterialPersonalState,
    updateMaterialPersonalState,

    getMaterialComments,
    createMaterialComment,
    updateMaterialComment,
    deleteMaterialComment,
} from "../services/materialPersonalService";


/* Query keys */

export const materialUserStateQueryKey = (materialId) => [
    "material-user-state",
    String(materialId),
];

export const commentsQueryKey = (materialId) => [
    "material-comments",
    String(materialId),
];


/* Hook */

export function useStudyDocumentPersonalState(materialId) {
    const queryClient = useQueryClient();


    /* Material user state */

    const stateQuery =
        useQuery({
            queryKey: materialUserStateQueryKey(materialId),

            queryFn: () => getMaterialPersonalState(materialId),

            enabled: Boolean(materialId),
        });


    /* Private comments */

    const commentsQuery =
        useQuery({
            queryKey: commentsQueryKey(materialId),

            queryFn: () => getMaterialComments(materialId),

            enabled: Boolean(materialId),
        });


    /* Personal state mutation */
    
    const stateMutation =
        useMutation({
            mutationKey: [
                "update-material-user-state",
                String(materialId),
            ],

            mutationFn: (data) => 
                updateMaterialPersonalState(materialId, data),

            scope: {
                id: `material-user-state:${materialId}`,
            },

            onMutate: async (data) => {
                const queryKey =
                    materialUserStateQueryKey(materialId);

                await queryClient.cancelQueries({queryKey});

                const previous =
                    queryClient.getQueryData(queryKey);

                if (!previous) {
                    return {
                        previous,
                    };
                }

                const optimistic = {
                    ...previous,
                    ...data,
                };

                queryClient.setQueryData(queryKey, optimistic);

                return {
                    previous,
                };
            },

            onError: (_error, _data, context) => {
                if (!context?.previous) {
                    return;
                }

                queryClient.setQueryData(
                    materialUserStateQueryKey(materialId),
                    context.previous
                );
            },

            onSuccess: (savedState) => {
                queryClient.setQueryData(
                    materialUserStateQueryKey(materialId),
                    savedState
                );
            },
        });


    /* Create comment */
    const createCommentMutation =
        useMutation({
            mutationKey: [
                "create-material-comment",
                String(materialId),
            ],

            mutationFn: (data) => 
                createMaterialComment(materialId, data),

            onSuccess: (newComment) => {
                queryClient.setQueryData(
                    commentsQueryKey(materialId),
                    (current = []) => [
                        ...current,
                        newComment,
                    ]
                );
            },
        });


    /* Update comment */

    const updateCommentMutation =
        useMutation({
            mutationKey: [
                "update-material-comment",
                String(materialId),
            ],

            mutationFn: ({commentId, data,}) =>
                updateMaterialComment(materialId, commentId, data),

            onSuccess: (updatedComment) => {
                    queryClient.setQueryData(commentsQueryKey(materialId),
                        (current = []) => current.map((comment) =>
                            comment.id === updatedComment.id
                                ? updatedComment
                                : comment
                        )
                    );
                },
        });

        
    /* Delete comment */

    const deleteCommentMutation =
        useMutation({
            mutationKey: [
                "delete-material-comment",
                String(materialId),
            ],

            mutationFn: (commentId) =>
                deleteMaterialComment(materialId, commentId),

            onSuccess: (_result, commentId) => {
                queryClient.setQueryData(commentsQueryKey(materialId),
                    (current = []) =>
                        current.filter((comment) =>
                            comment.id !== commentId
                        )
                );
            },
        });


    /* Pin */

    const togglePin = 
        useCallback( async (blockId) => {
                const state =
                    queryClient.getQueryData(
                        materialUserStateQueryKey(materialId)
                    );

                if (!state) {
                    return null;
                }

                const pinned = 
                    state.pinned_block_ids ?? [];

                const isPinned = 
                    pinned.includes(blockId);

                const nextPinned =
                    isPinned
                        ? pinned.filter(
                            (id) => id !== blockId
                        )
                        : [
                            ...pinned,
                            blockId,
                        ];

                return stateMutation.mutateAsync({
                    pinned_block_ids: nextPinned,
                });
            },
            [
                materialId,
                queryClient,
                stateMutation,
            ]
        );


    /* Hide block */

    const toggleBlockHidden = 
        useCallback( async (blockId) => {
                const state =
                    queryClient.getQueryData(
                        materialUserStateQueryKey(materialId)
                    );

                if (!state) {
                    return null;
                }

                const hidden = 
                    state.hidden_block_ids ?? [];

                const isHidden = 
                    hidden.includes(blockId);

                const nextHidden =
                    isHidden
                        ? hidden.filter((id) => 
                            id !== blockId
                        )
                        : [
                            ...hidden,
                            blockId,
                        ];

                return stateMutation.mutateAsync({
                    hidden_block_ids: nextHidden,
                });
            },
            [
                materialId,
                queryClient,
                stateMutation,
            ]
        );


    /* Comments */

    const getCommentForBlock = 
        useCallback( (blockId) => {
                const comments = commentsQuery.data ?? [];

                return (
                    comments.find((comment) => 
                        comment.block_id === blockId
                    ) ?? null
                );
            },
            [commentsQuery.data]
        );

    /* Save comment */

    const saveComment = 
        useCallback( async ({commentId, blockId, content_json,}) => {
                if (commentId) {
                    return updateCommentMutation.mutateAsync({
                        commentId,
                        data: {
                            content_json,
                        },
                    });
                }

                return createCommentMutation.mutateAsync({
                    block_id: blockId,
                    content_json,
                });
            },
            [
                createCommentMutation,
                updateCommentMutation,
            ]
        );


    /* Hide comment */

    const hideComment =
        useCallback( async (commentId) => {
                return updateCommentMutation.mutateAsync({
                    commentId,
                    data: {
                        is_hidden: true,
                    },
                });
            },
            [updateCommentMutation]
        );


    /* Show comment */

    const showComment =
        useCallback( async (commentId) => {
                return updateCommentMutation.mutateAsync({
                    commentId,
                    data: {
                        is_hidden: false,
                    },
                });
            },
            [updateCommentMutation]
        );


    /* Delete comment */
    
    const deleteComment =
        useCallback( async (commentId) => {
                return deleteCommentMutation.mutateAsync(commentId);
            },
            [deleteCommentMutation]
        );


    const personalState =
        stateQuery.data ?? null;

    const comments =
        commentsQuery.data ?? [];


    return {
        personalState:
            stateQuery.data ?? null,

        comments:
            commentsQuery.data ?? [],

        getCommentForBlock,

        togglePin,
        toggleBlockHidden,

        saveComment,
        hideComment,
        showComment,
        deleteComment,

        isLoading:
            stateQuery.isLoading ||
            commentsQuery.isLoading,

        isSaving:
            stateMutation.isPending ||
            createCommentMutation.isPending ||
            updateCommentMutation.isPending ||
            deleteCommentMutation.isPending,

        error:
            stateQuery.error ??
            commentsQuery.error ??
            stateMutation.error ??
            createCommentMutation.error ??
            updateCommentMutation.error ??
            deleteCommentMutation.error ??
            null,
    };
}