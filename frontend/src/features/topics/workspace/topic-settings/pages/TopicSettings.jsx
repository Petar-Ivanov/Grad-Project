import { useEffect, useState } from "react";
import {
    useNavigate,
    useOutletContext,
} from "react-router-dom";

import TopicSettingsHeader from "../components/TopicSettingsHeader";
import TopicSettingsView from "../components/TopicSettingsView";
import TopicSettingsForm from "../components/TopicSettingsForm";

import DangerZone from "../../../../../components/ui/DangerZone";
import ConfirmationModal from "../../../../../components/ui/ConfirmationModal";

import { useTopic } from "../../../hooks/useTopic";

async function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = () => {
            reject(new Error("Failed to read image."));
        };

        reader.readAsDataURL(file);
    });
}

export default function TopicSettings() {
    const navigate = useNavigate();

    const {
        topic,
        theme,
        role,
    } = useOutletContext();

    const {
        updateTopic,
        deleteTopic,
        isUpdating,
        isDeleting,
        mutationError,
    } = useTopic(topic.id);

    const isOwner =
        role === "owner";

    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(topic.banner_url ?? null);
    
    const [formData, setFormData] = useState({
        name:
            topic.name ?? "",

        description:
            topic.description ?? "",

        category:
            topic.category ?? "",

        banner_url:
            topic.banner_url ?? null,
    });


    useEffect(() => {
        setFormData({
            name:
                topic.name ?? "",

            description:
                topic.description ?? "",

            category:
                topic.category ?? "",

            banner_url:
                topic.banner_url ?? null,
        });

        setPreviewUrl(topic.banner_url ?? null);
    }, [topic]);
    ////
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: value 
        }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            return;
        }

        try {
            const dataUrl = await fileToDataUrl(file);

            setPreviewUrl(dataUrl);

            setFormData((prev) => ({
                ...prev,
                banner_url: dataUrl,
            }));
        } catch (error) {
            console.error("Failed to load image:", error);
        }
    };

    const removeImage = () => {
        setPreviewUrl(null);
        setFormData(prev => ({ 
            ...prev, 
            banner_url: null 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isOwner) {
            return;
        }

        try {
            await updateTopic({
                name:
                    formData.name.trim(),

                description:
                    formData.description.trim() || null,

                category:
                    formData.category,

                banner_url:
                    formData.banner_url,
            });

            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update topic:", error);
        }
    };

    const handleCancel = () => {
        setFormData({
            name:
                topic.name ?? "",

            description:
                topic.description ?? "",

            category:
                topic.category ?? "",

            banner_url:
                topic.banner_url ?? null,
        });

        setPreviewUrl(
            topic.banner_url ?? null
        );

        setIsEditing(false);
    };

    const handleDelete = async () => {
        try {
            await deleteTopic();

            navigate("/topics");
        } catch (error) {
            console.error(
                "Failed to delete topic:",
                error
            );
        }
    };

    const createdDate =
        new Date(topic.created_at).toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "long",
                day: "numeric",
            }
        );

    const updatedDate =
        new Date(topic.updated_at).toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "long",
                day: "numeric",
            }
        );

    return (
        <div className="mx-auto max-w-4xl pb-32">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950 transition-all">
                
                <TopicSettingsHeader
                    isEditing={isEditing}
                    isOwner={isOwner}
                    onEditClick={() =>
                        setIsEditing(true)
                    }
                />

                {mutationError && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                        {mutationError.message}
                    </div>
                )}

                {
                    isEditing 
                    ? (
                        <TopicSettingsForm
                            formData={formData}
                            previewUrl={previewUrl}
                            theme={theme}
                            onChange={handleChange}
                            onImageChange={handleImageChange}
                            onRemoveImage={removeImage}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                            isSubmitting={isUpdating}
                        />
                    ) : (
                        <TopicSettingsView
                            topic={topic}
                            formData={formData}
                            theme={theme}
                            createdDate={createdDate}
                            updatedDate={updatedDate}
                        />
                    )
                }
                
            </div>

            {isOwner && (
                <DangerZone
                    actionTitle="Delete Topic"
                    description="Permanently remove this topic, its materials, and all access relationships."
                    actionLabel="Delete Topic"
                    onAction={() =>
                        setIsDeleteModalOpen(true)
                    }
                    isLoading={isDeleting}
                />
            )}


            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                title="Delete Topic?"
                message={`Are you sure you want to permanently delete "${topic.name}"? This action cannot be undone.`}
                confirmLabel="Delete Topic"
                cancelLabel="Cancel"
                onConfirm={handleDelete}
                onCancel={() =>
                    setIsDeleteModalOpen(false)
                }
                isSubmitting={isDeleting}
            />


        </div>
    );
}