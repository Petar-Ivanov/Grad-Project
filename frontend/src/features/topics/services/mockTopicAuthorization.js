import { getMockCurrentUserId } from "../../../mock/auth";

import {
    loadMockTopics,
    saveMockTopics,

    loadMockTopicAccess,
    saveMockTopicAccess,
} from "../../../mock/storage";

import { mockTopics } from "../../../mock/seeds/topics/topics";
import { mockTopicAccess } from "../../../mock/seeds/topics/access";


function ensureTopicDatabase() {
    let topics = loadMockTopics();

    if (Object.keys(topics).length === 0) {
        topics = structuredClone(mockTopics);

        saveMockTopics(topics);
    }

    return topics;
}


function ensureTopicAccessDatabase() {
    let access = loadMockTopicAccess();

    if (Object.keys(access).length === 0) {
        access = structuredClone(mockTopicAccess);

        saveMockTopicAccess(access);
    }

    return access;
}


export function getMockTopic(topicId) {
    const topics = ensureTopicDatabase();

    return (
        topics[String(topicId)] ?? null
    );
}


export function getMockTopicPermission(topicId, userId = getMockCurrentUserId()) {
    const topic = getMockTopic(topicId);

    if (!topic) {
        return "none";
    }

    if (!userId) {
        return "none";
    }

    if (Number(topic.owner_id) === Number(userId)) {
        return "owner";
    }

    const access = ensureTopicAccessDatabase();

    const membership =
        access[
            `${topicId}:${userId}`
        ];

    if (membership) {
        return membership.role;
    }

    if (topic.is_public) {
        return "viewer";
    }


    return "none";
}


export function getMockTopicAccessForUser(topicId, userId = getMockCurrentUserId()) {
    const topic = getMockTopic(topicId);

    if (!topic) {
        return {
            topic_id: Number(topicId),

            user_id:
                userId
                ? Number(userId)
                : null,

            role: "none",

            can_view: false,

            can_edit: false,

            is_followed: false,
        };
    }

    const role =
        getMockTopicPermission(topicId, userId);

    let isFollowed = false;

    if (userId) {
        const access = ensureTopicAccessDatabase();

        isFollowed = Boolean(
            access[`${topicId}:${userId}`]
        );
    }

    return {
        topic_id: Number(topicId),
        user_id: 
            userId
            ? Number(userId)
            : null,
        role,
        can_view: role !== "none",
        can_edit:
            role === "owner" ||
            role === "editor",

        is_followed: isFollowed,
    };
}


export function assertCanViewTopic(topicId, userId = getMockCurrentUserId()) {
    const topic =
        getMockTopic(topicId);

    if (!topic) {
        const error = new Error("Topic not found.");

        error.status = 404;

        throw error;
    }


    const permission =
        getMockTopicPermission(topicId, userId);

    if (permission === "none") {
        const error =
            new Error("You do not have access to this topic.");

        error.status = 403;

        throw error;
    }

    return permission;
}


export function assertCanEditTopic(topicId, userId = getMockCurrentUserId()) {
    const permission =
        getMockTopicPermission(topicId, userId);

    if (permission !== "owner" && permission !== "editor") {
        const error =
            new Error("You do not have editing permission for this topic."
        );

        error.status = 403;

        throw error;
    }

    return permission;
}