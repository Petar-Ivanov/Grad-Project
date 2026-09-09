import { useEffect, useState } from "react";

import {
    useTopicSources,
} from "../hooks/useTopicSources";

import SourceUploader from "./sources-section/SourceUploader";
import SourceItem from "./sources-section/SourceItem";

import TextSourceModal from "./sources-section/modals/TextSourceModal";
import LinkSourceModal from "./sources-section/modals/LinkSourceModal";
import FileSourceModal from "./sources-section/modals/FileSourceModal";
import DeleteSourceModal from "./sources-section/modals/DeleteSourceModal";

import { MAX_SOURCES } from "../services/mockSourceApi";

//const MAX_SOURCES = 10;

export default function SourcesSection({
    topicId,
    theme,
    canEdit,
    onSelectionChange,
}) {

    const {
        sources,
        isLoading,
        error,
        createFileSource,
        createLinkSource,
        createTextSource,
        updateSource,
        deleteSource,
        isMutating,
        mutationError,
    } = useTopicSources(topicId);


    const [selectedIds, setSelectedIds] = 
        useState(new Set());

    useEffect(() => {
        onSelectionChange?.(Array.from(selectedIds));
    }, [selectedIds, onSelectionChange]);

    // Modal State Manager
    const [activeModal, setActiveModal] = 
        useState({ type: null, item: null });

    const isAtLimit = 
        sources.length >= MAX_SOURCES;

    const closeModal = () => {
        setActiveModal({
            type: null,
            item: null,
        });
    };

    // Action Handlers

    const handleToggleActive = (sourceId) => {
        setSelectedIds((previous) => {
            const next = new Set(previous);

            if (next.has(sourceId)) {
                next.delete(sourceId);
            } else {
                next.add(sourceId);
            }

            return next;
        });
    };


    const handleFileUpload = async (file) => {
        if (!canEdit || isAtLimit) {
            return;
        }

        try {
            const source =
                await createFileSource(file);

            // selecting new sources automatically
            setSelectedIds((previous) => {
                const next = 
                    new Set(previous);

                next.add(source.id);

                return next;
            });
        } catch (error) {
            console.error("Failed to upload source:", error);
        }
    };

    //
    const handleSaveLink = async (data) => {
        try {
            if (activeModal.item) {
                await updateSource({
                    sourceId: activeModal.item.id,
                    data,
                });
            } else {
                const source =
                    await createLinkSource(data);

                setSelectedIds((previous) => {
                    const next = new Set(previous);

                    next.add(source.id);

                    return next;
                });
            }

            closeModal();
        } catch (error) {
            console.error("Failed to save link source:", error);
        }
    };


    const handleSaveText = async (data) => {
        try {
            if (activeModal.item) {
                await updateSource({
                    sourceId: activeModal.item.id,
                    data,
                });
            } else {
                const source =
                    await createTextSource(data);

                setSelectedIds((previous) => {
                    const next = new Set(previous);

                    next.add(source.id);

                    return next;
                });
            }

            closeModal();
        } catch (error) {
            console.error("Failed to save text source:", error);
        }
    };

    const handleSaveFile = async (data) => {
        if (!activeModal.item) {
            return;
        }

        try {
            await updateSource({
                sourceId: activeModal.item.id,
                data,
            });

            closeModal();
        } catch (error) {
            console.error("Failed to update file source:", error);
        }
    };


    const handleDelete = async () => {
        if (!activeModal.item) {
            return;
        }

        try {
            await deleteSource(activeModal.item.id);

            setSelectedIds((previous) => {
                const next = new Set(previous);

                next.delete(activeModal.item.id);

                return next;
            });

            closeModal();
        } catch (error) {
            console.error("Failed to delete source:", error);
        }
    };


    if (isLoading) {
        return (
            <div className="py-6 text-sm text-slate-400">
                Loading sources...
            </div>
        );
    }


    if (error) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
                Failed to load sources. {error.message}
            </div>
        );
    }


    return (
        <div className="space-y-8">

            {mutationError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
                    {mutationError.message}
                </div>
            )}
            
            {/* Upload Area */}
            {canEdit && (
                <SourceUploader
                    onFileSelect={handleFileUpload}
                    onOpenLinkModal={() =>
                        setActiveModal({type: "link", item: null})
                    }
                    onOpenTextModal={() =>
                        setActiveModal({type: "text", item: null})
                    }
                    theme={theme}
                    disabled={isAtLimit || isMutating}
                />
            )}

            {/* Source List */}
            {sources.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-end justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            Sources ({sources.length}/{MAX_SOURCES})
                        </h4>

                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            {selectedIds.size}{" "}
                            selected
                        </span>
                    </div>


                    <div className="flex flex-col gap-2">
                        {sources.map((source) => (
                                <SourceItem
                                    key={source.id}
                                    item={{
                                        ...source,
                                        isActive: selectedIds.has(source.id),
                                    }}
                                    onToggleActive={() =>
                                        handleToggleActive(source.id)
                                    }
                                    onEdit={() =>
                                        setActiveModal({
                                            type: source.type,
                                            item: source,
                                        })
                                    }
                                    onDelete={() =>
                                        setActiveModal({
                                            type: "delete",
                                            item: source,
                                        })
                                    }
                                    theme={theme}
                                    canEdit={canEdit}
                                />
                            )
                        )}

                    </div>
                </div>
            )}

            {/* Modals */}
            {/* Edit Link */}
            <LinkSourceModal
                isOpen={activeModal.type === "link"}
                initialData={activeModal.item}
                onSave={handleSaveLink}
                onCancel={closeModal}
                theme={theme}
                isSubmitting={isMutating}
            />

            {/* Edit Text */}
            <TextSourceModal
                isOpen={activeModal.type === "text"}
                initialData={activeModal.item}
                onSave={handleSaveText}
                onCancel={closeModal}
                theme={theme}
                isSubmitting={isMutating}
            />

            {/* Edit File */}
            <FileSourceModal
                isOpen={activeModal.type === "file"}
                initialData={activeModal.item}
                onSave={handleSaveFile}
                onCancel={closeModal}
                theme={theme}
                isSubmitting={isMutating}
            />

            <DeleteSourceModal
                isOpen={activeModal.type === "delete"}
                itemName={activeModal.item?.name}
                onConfirm={handleDelete}
                onCancel={closeModal}
                isSubmitting={isMutating}
            />

        </div>
    );
}