import { lazy, Suspense, useState } from "react";
import { getBlockPlugin } from "./blocks/blockRegistry";
import StudyBlockWrapper from "./blocks/StudyBlockWrapper";
import BlockTypePicker from "./blocks/BlockTypePicker";

const blockComponentCache = {};

function BlockLoadingFallback() {
    return (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-400 dark:border-slate-800 dark:bg-slate-900">
            Loading block...
        </div>
    );
}

function UnsupportedBlock({type}) {
    return (
        <div className="rounded-lg border border-dashed border-red-300 bg-red-50 p-4 text-xs text-red-500 dark:border-red-900 dark:bg-red-950/20 dark:text-red-400">
            Unsupported block type: {type}
        </div>
    );
}

function BlockRenderer({
    block,
    mode,
    searchTerm,

    canEdit,

    onAddBlock,
    onMoveBlock,
    onUpdateBlock,
    onDeleteBlock,

    personalState,
    getCommentForBlock,

    onTogglePin,
    onToggleBlockHidden,

    onSaveComment,
    onHideComment,
    onShowComment,
    onDeleteComment,

    autoEditBlockId,
    onClearAutoEdit,
}) {

    const plugin = getBlockPlugin(block.type);

    if (!plugin) {
        return <UnsupportedBlock type={block.type} />;
    }

    if (!blockComponentCache[block.type]) {
        blockComponentCache[block.type] = lazy(plugin.loadComponent);
    }

    const BlockComponent = blockComponentCache[block.type];

    const isPinned =
        personalState?.pinned_block_ids?.includes(block.id) ?? false;

    const isHidden =
        personalState?.hidden_block_ids?.includes(block.id) ?? false;

    const comment =
        getCommentForBlock?.(block.id) ?? null;

    return (
        <Suspense fallback={<BlockLoadingFallback />}>
            <StudyBlockWrapper
                blockId={block.id}
                mode={mode}
                canEdit={canEdit}

                onAddBlock={onAddBlock}
                onMoveBlock={onMoveBlock}
                onDeleteBlock={onDeleteBlock}

                autoEditBlockId={autoEditBlockId}
                onClearAutoEdit={onClearAutoEdit}

                isPinned={isPinned}
                isHidden={isHidden}
                comment={comment}

                onTogglePin={onTogglePin}
                onToggleBlockHidden={onToggleBlockHidden}

                onSaveComment={onSaveComment}
                onHideComment={onHideComment}
                onShowComment={onShowComment}
                onDeleteComment={onDeleteComment}
            >
                <BlockComponent
                    data={block.data}
                    blockId={block.id}
                    searchTerm={searchTerm}
                    onUpdate={(newData) =>
                        onUpdateBlock(block.id, newData)
                    }
                />
            </StudyBlockWrapper>
        </Suspense>
    );
}

export default function DocumentRenderer({
    blocks,
    mode = "study",
    searchTerm = "",

    canEdit,

    onAddBlock,
    onMoveBlock,
    onUpdateBlock,
    onDeleteBlock,

    personalState,
    getCommentForBlock,

    onTogglePin,
    onToggleBlockHidden,

    onSaveComment,
    onHideComment,
    onShowComment,
    onDeleteComment,
}) {
    const [autoEditBlockId, setAutoEditBlockId] = useState(null);

    const handleAddBlock = async (type, position, targetBlockId) => {
        const newBlock = await onAddBlock(type, position, targetBlockId);
        if (newBlock) {
            setAutoEditBlockId(newBlock.id);
        }
    }

    const handleAddBlockAtEnd = async (type) => {
        await handleAddBlock(type, "end", null);
    };
    // const handleAddBlockAtEnd = async (type) => {
    //     if (blocks?.length > 0) {
    //         const lastBlock = blocks[blocks.length - 1];

    //         await handleAddBlock(type, "below", lastBlock.id);

    //         return;
    //     }

    //     await handleAddBlock(type, "end", null);
    // };

    if (!blocks || blocks.length === 0) {
        return (
            <div className="flex min-h-[240px] items-center justify-center py-12">
                {canEdit ? (
                    <BlockTypePicker
                        onSelect={handleAddBlockAtEnd}
                    />
                ) : (
                    <div className="text-center text-sm text-slate-400">
                        This document has no blocks yet.
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {blocks.map((block) => (
                <div
                    id={block.id}
                    key={block.id}
                    className="scroll-mt-24"
                >
                    <BlockRenderer
                        block={block}
                        mode={mode}
                        searchTerm={searchTerm}

                        canEdit={canEdit}

                        onAddBlock={handleAddBlock}
                        onMoveBlock={onMoveBlock}
                        onUpdateBlock={onUpdateBlock}
                        onDeleteBlock={onDeleteBlock}

                        personalState={personalState}
                        getCommentForBlock={getCommentForBlock}

                        onTogglePin={onTogglePin}
                        onToggleBlockHidden={onToggleBlockHidden}

                        onSaveComment={onSaveComment}
                        onHideComment={onHideComment}
                        onShowComment={onShowComment}
                        onDeleteComment={onDeleteComment}

                        autoEditBlockId={autoEditBlockId}

                        onClearAutoEdit={() =>
                            setAutoEditBlockId(null)
                        }
                    />
                </div>
            ))}

            {canEdit && (
                <div className="pt-2">
                    <BlockTypePicker
                        onSelect={handleAddBlockAtEnd}
                    />
                </div>
            )}
        </div>
    );
}
