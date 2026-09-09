import {
    loadMockMaterials,
    loadMockMaterialUserState,
    loadMockTopics,
} from "../../../mock/storage";

import { getMockCurrentUserId } from "../../../mock/auth";
import { getMockTopicPermission } from "../../topics/services/mockTopicAuthorization";


function delay(ms = 200) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}


function normalizeLimit(limit) {
    const parsed =
        Number(limit);

    if (!Number.isFinite(parsed)) {
        return 6;
    }

    return Math.min(
        Math.max(Math.floor(parsed), 1), 
        6
    );
}


export async function getMockContinueLearning(limit = 6) {
    await delay();

    const userId =
        getMockCurrentUserId();

    if (!userId) {
        const error =
            new Error("Not authenticated.");

        error.status = 401;

        throw error;
    }

    const materials =
        loadMockMaterials();

    const materialUserState =
        loadMockMaterialUserState();

    const topics =
        loadMockTopics();

    const topicById =
        new Map(Object.values(topics).map((topic) => [
            Number(topic.id),
            topic,
        ]));


    const accessibleMaterials =
        Object.values(materials).filter((material) => {
            const permission =
                getMockTopicPermission(material.topic_id, userId);

            return permission !== "none";
        });


    const recentMaterials =
        accessibleMaterials.map((material) => {
            const key =
                `${Number(userId)}:${Number(material.id)}`;

            const state =
                materialUserState[key];

            if (!state?.last_visited_at) {
                return null;
            }

            const topic =
                topicById.get(Number(material.topic_id));

            return {
                id:
                    Number(material.id),

                topic_id:
                    Number(material.topic_id),

                owner_id:
                    Number(material.owner_id),

                name:
                    material.name,

                type:
                    material.type,

                status:
                    material.status,

                created_at:
                    material.created_at,

                updated_at:
                    material.updated_at,

                category:
                    topic?.category ?? null,

                last_visited_at:
                    state.last_visited_at,
            };
        })
        .filter(Boolean)
        .sort((a, b) => {
            const aTime =
                new Date(a.last_visited_at).getTime();

            const bTime =
                new Date(b.last_visited_at).getTime();

            return bTime - aTime;
        });


    return structuredClone(
        recentMaterials.slice(0, normalizeLimit(limit))
    );
}