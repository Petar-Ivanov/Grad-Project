import {useQuery,} from "@tanstack/react-query";

import { getMyTopicAccess,} from "../services/topicService";


export function topicAccessQueryKey(topicId) {
    return [
        "topic-access",
        String(topicId),
    ];
}


export function useTopicAccess(topicId) {
    const query =
        useQuery({
            queryKey: topicAccessQueryKey(topicId),

            queryFn: () => getMyTopicAccess(topicId),

            enabled: Boolean(topicId),
        });


    return {
        access: query.data ?? null,

        role: query.data?.role ?? "none",

        canView: query.data?.can_view ?? false,

        canEdit: query.data?.can_edit ?? false,

        isFollowed: query.data?.is_followed ?? false,

        isLoading: query.isLoading,

        error: query.error ?? null,
    };
}