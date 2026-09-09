import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMaterial, updateMaterial, deleteMaterial } from "../services/materialService";
import { createNewBlock } from "../components/blocks/blockFactory";
import {
    insertBlock,
    updateBlockInList,
    moveBlockInList,
    deleteBlockFromList,
} from "../components/blocks/blockOperations";

import {
    materialUserStateQueryKey,
    commentsQueryKey,
} from "./useStudyDocumentPersonalState";

// query key
const materialQueryKey = (materialId) => [
    "material",
    String(materialId),
];

// hook
export function useStudyDocument(materialId) {

    const queryClient = useQueryClient();
    const queryKey = materialQueryKey(materialId);

    // material query 
    const query = useQuery({
        queryKey,
        queryFn: () => getMaterial(materialId),
        enabled: Boolean(materialId),
    });

    // persisting the document as a whole
    const updateMutation = useMutation({
        mutationKey: ["update-material", materialId],

        mutationFn: (blocks) => {
            return updateMaterial(materialId, {
                content_json: { blocks },
            });
        },

        /* serializing all writes for this material */
        scope: {
            id: `material:${materialId}`,
        },

        // optimistic update
        onMutate: async (blocks) => {
            /* canceling an in-flight refetch */
            await queryClient.cancelQueries({
                queryKey,
            });

            const previousDocument = queryClient.getQueryData(queryKey);

            if (!previousDocument) {
                return { previousDocument };
            }

            const optimisticDocument = {
                ...previousDocument,

                content_json: {
                    ...previousDocument?.content_json,
                    blocks,
                },
            };

            /* updating TanStack Query cache */
            queryClient.setQueryData(queryKey, optimisticDocument);

            // editorDocumentRef.current = optimisticDocument;

            return {
                previousDocument,
            };
        },

        // rolling back on failed save
        onError: (_error, _blocks, context) => {
            if (!context?.previousDocument) {
                return;
            }

            queryClient.setQueryData(queryKey, context.previousDocument);
        },

        // turning the backend into the new source of truth
        onSuccess: (savedDocument) => {
            /* server response becomes the confirmed source of truth */
            queryClient.setQueryData(queryKey, savedDocument);
            //editorDocumentRef.current = savedDocument;
        },
    });

    // central persistence function for block operations
    const updateBlocks = useCallback(
        async (blocks) => {
            return updateMutation.mutateAsync(blocks);
        },
        [updateMutation]
    );

    const updateBlock = useCallback(
        async (blockId, newData) => {
            const document = queryClient.getQueryData(queryKey);

            if (!document) {
                return null;
            }

            const currentBlocks = document.content_json?.blocks ?? [];

            const blocks = updateBlockInList(
                currentBlocks,
                blockId,
                newData
            );

            return updateBlocks(blocks);
        },
        [queryClient, queryKey, updateBlocks]
    );

    const addBlock = useCallback(
        async (type, position, targetBlockId) => {
            const document = queryClient.getQueryData(queryKey);

            if (!document) {
                return null;
            }

            const currentBlocks = document.content_json?.blocks ?? [];

            // using the factory to create a new block
            const newBlock = createNewBlock(type);

            const blocks = insertBlock(
                currentBlocks,
                newBlock,
                position,
                targetBlockId
            );

            if (blocks === currentBlocks) {
                return null;
            }

            await updateBlocks(blocks);

            return newBlock;
        },
        [queryClient, queryKey, updateBlocks]
    );

    const moveBlock = useCallback(
        async (blockId, direction) => { 
            const document = queryClient.getQueryData(queryKey);

            if (!document) {
                return;
            }

            const currentBlocks = document.content_json?.blocks ?? [];

            const blocks = moveBlockInList(
                    currentBlocks,
                    blockId,
                    direction
                );

            if (blocks === currentBlocks) {
                return null;
            }

            return updateBlocks(blocks);
        },
        [queryClient, queryKey, updateBlocks]
    );

    const deleteBlock = useCallback(
        async (blockId) => {
            const document = queryClient.getQueryData(queryKey);

            if (!document) {
                return null;
            }

            const currentBlocks = document.content_json?.blocks ?? [];

            const blocks = deleteBlockFromList(
                    currentBlocks,
                    blockId
                );

            if (blocks.length === currentBlocks.length) {
                return null;
            }

            return updateBlocks(blocks);
        },
        [
            queryClient,
            queryKey,
            updateBlocks,
        ]
    );

    const deleteMutation = useMutation({
        mutationKey: [
            "delete-material",
            materialId,
        ],

        mutationFn: () =>
            deleteMaterial(materialId),

        onSuccess: () => {
            queryClient.removeQueries({queryKey,});

            queryClient.removeQueries({
                queryKey:
                    materialUserStateQueryKey(materialId),
            });

            queryClient.removeQueries({
                queryKey:
                    commentsQueryKey(materialId),
            });
        },
    });

    return {
        // server state
        document: query.data ?? null,

        // loading state 
        isLoading: query.isLoading,

        // saving state
        isSaving: updateMutation.isPending,

        // error state
        error:
            query.error ??
            updateMutation.error ??
            deleteMutation.error ??
            null,

        // block operation
        addBlock,
        moveBlock,
        updateBlock,
        deleteBlock,

        // material operations //
        deleteMaterial:
            deleteMutation.mutateAsync,
    };


}