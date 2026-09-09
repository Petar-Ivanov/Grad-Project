import { useState, useMemo } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import TopicHeader from "../features/topics/workspace/components/TopicHeader";
import TopicTabs from "../features/topics/workspace/components/TopicTabs";

import { useTopic } from "../features/topics/hooks/useTopic";
import { useTopicAccess } from "../features/topics/hooks/useTopicAccess";

import { getCategoryTheme } from "../utils/themeHelper.js";

export default function TopicLayout() {
    // Mock Data
    const { id } = useParams();
    // const currentUser = "Petar Ivanov";
    // const [topic, setTopic] = useState({
    //     id: id || "1",
    //     name: "Introduction to Astrobiology",
    //     category: "geography",
    //     owner: "John Smith",
    //     materialsCount: 4,
    //     isShared: false,
    //     //bannerUrl: "https://cdn.mos.cms.futurecdn.net/fuydkvSA3LQ95RsT5mqosm.jpg",
    //     bannerUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP7kDEpHJatOTBqphHhvCRPjpMp1rjy0x5rbMmWUfEYBYd4WNFIaWDCek&s=10",
    //     //bannerUrl: "https://assets.videomaker.com/2025/03/0Bzivdmp-vintage-film-projector-and-film-screening-FSH2PGV-scaled-1-1392x700-1-696x392.jpg",
    // });
    const navigate = useNavigate();

    const {
        topic,
        isLoading: isTopicLoading,
        error: topicError,
        followTopic,
        unfollowTopic,
        isFollowing,
    } = useTopic(id);

    const {
        access,
        role,
        canView,
        canEdit,
        isFollowed,
        isLoading: isAccessLoading,
        error: accessError,
    } = useTopicAccess(id);


    const isLoading = isTopicLoading || isAccessLoading;


    const error = topicError || accessError || null;


    const theme = getCategoryTheme(topic?.category);


    const handleToggleFollow = async () => {
        if (!topic || role === "owner") {
            return;
        }

        if (isFollowed) {
            await unfollowTopic();
        } else {
            await followTopic();
        }
    };


    if (isLoading) {
        return (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-sm text-slate-400">
                    Loading topic...
                </div>
            </div>
        );
    }


    if (error) {
        return (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                    Failed to load topic.{" "}
                    {error.message}
                </div>
            </div>
        );
    }


    if (!topic || !canView) {
        return (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                    You do not have access to this topic.
                </div>
            </div>
        );
    }


    return (
        <div className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8 py-0 sm:py-8">
            <div className="flex flex-col sm:rounded-2xl border-0 sm:border border-slate-200 bg-white shadow-none sm:shadow-sm dark:border-slate-800 dark:bg-slate-950 overflow-hidden">
                <TopicHeader
                    topic={topic}
                    access={access}
                    role={role}
                    isFollowed={isFollowed}
                    isFollowing={isFollowing}
                    onToggleFollow={handleToggleFollow}
                    theme={theme}
                />

                <TopicTabs 
                    theme={theme}
                    role={role}
                />

                {/* Dynamic Sub-Page */}
                <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900/30 min-h-[500px]">
                    <Outlet context={{
                        topic,
                        theme,
                        access,
                        role,
                        canView,
                        canEdit,
                        isFollowed,
                    }}
                    />
                </div>
            </div>
        </div>
    );

}