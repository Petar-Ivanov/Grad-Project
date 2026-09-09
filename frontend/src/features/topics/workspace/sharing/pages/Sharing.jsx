// import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import CollaboratorList from "../components/CollaboratorList";
import AccessControlPanel from "../components/AccessControlPanel";

import { useTopic } from "../../../hooks/useTopic";
import { useTopicMembers } from "../hooks/useTopicMembers";

export default function Sharing() {
    const {
        topic,
        theme,
        role,
    } = useOutletContext();

    const {
        updateTopic,
        regenerateInviteCode,
        isUpdating: isUpdatingTopic,
        isRegeneratingCode,
        mutationError: topicMutationError,
    } = useTopic(topic.id);

    const {
        members,
        isLoading,
        error,
        updateRole,
        removeMember,
        isUpdating: isUpdatingMembers,
        mutationError: memberMutationError,
    } = useTopicMembers(topic.id);

    if (role !== "owner") {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                Only the topic owner can manage sharing settings.
            </div>
        );
    }

    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateRole({
                userId,
                role: newRole,
            });
        } catch (error) {
            console.error("Failed to update member role:", error);
        }
    };

    const handleRemove = async (userId) => {
        try {
            await removeMember(userId);
        } catch (error) {
            console.error("Failed to remove topic member:", error);
        }
    };

    const handleVisibilityChange = async (isPublic) => {
        try {
            await updateTopic({
                is_public: isPublic,
            });
        } catch (error) {
            console.error("Failed to update topic visibility:", error);
        }
    };

    const handleRegenerateCode = async (type) => {
        try {
            await regenerateInviteCode(type);
        } catch (error) {
            console.error("Failed to regenerate invite code:", error);
        }
    };

    const combinedError = error || topicMutationError || memberMutationError;

    return (
        <div className="grid grid-cols-1 gap-8 pb-32 lg:grid-cols-3">

            {combinedError && (
                <div className="lg:col-span-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                    {combinedError.message}
                </div>
            )}

            <div className="space-y-8 lg:col-span-2">

                {isLoading 
                ? (
                    <div className="text-sm text-slate-400">
                        Loading collaborators...
                    </div>
                ) : (
                    <CollaboratorList
                        list={members}
                        onRoleChange={handleRoleChange}
                        onRemove={handleRemove}
                        theme={theme}
                        isUpdating={isUpdatingMembers}
                    />
                )}

            </div>

            <div className="space-y-8">

                <AccessControlPanel
                    topic={topic}
                    theme={theme}
                    onVisibilityChange={handleVisibilityChange}
                    onRegenerateCode={handleRegenerateCode}
                    isUpdating={isUpdatingTopic}
                    isRegenerating={isRegeneratingCode}
                />

            </div>

        </div>
    );
}