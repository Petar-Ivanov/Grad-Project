import { getMockCurrentUserId } from "../../../mock/auth";

import {
    loadMockUsers,
    loadMockMaterials,

    loadMockTopics,
    saveMockTopics,

    loadMockTopicAccess,
    saveMockTopicAccess,

    loadMockTopicUserState,
    saveMockTopicUserState,
} from "../../../mock/storage";

import { mockTopics } from "../../../mock/seeds/topics/topics";
import { mockTopicAccess } from "../../../mock/seeds/topics/access";

import {
    getMockTopic,
    getMockTopicPermission,
    getMockTopicAccessForUser,
    assertCanViewTopic,
    assertCanEditTopic,
} from "./mockTopicAuthorization";


function delay(ms = 200) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function createError(message, status) {
    const error = new Error(message);

    error.status = status;

    return error;
}


function getCurrentUserId() {
    const userId = getMockCurrentUserId();

    if (!userId) {
        throw createError("Not authenticated.", 401);
    }

    return userId;
}


function getDatabase() {
    const topics = loadMockTopics();

    if (Object.keys(topics).length === 0) {
        const seeded = structuredClone(mockTopics);

        saveMockTopics(seeded);

        return seeded;
    }

    return topics;
}


function getAccessDatabase() {
    const access = loadMockTopicAccess();

    if (Object.keys(access).length === 0) {
        const seeded = structuredClone(mockTopicAccess);

        saveMockTopicAccess(seeded);

        return seeded;
    }

    return access;
}


/* Topic listing */

export async function getMockTopics() {
    await delay();

    const userId = getCurrentUserId();

    const users = loadMockUsers();

    const materials = loadMockMaterials();

    const topics = getDatabase();

    const access = getAccessDatabase();

    const userState = loadMockTopicUserState();

    return structuredClone(
        Object.values(topics).filter((topic) => {
                const permission = getMockTopicPermission(topic.id, userId);

                return permission !== "none";
            })
            .map((topic) => {
                const key = `${topic.id}:${userId}`;

                const membership = access[key];

                const state = userState[key];

                const owner = users[String(topic.owner_id)];

                const materialsCount =
                    Object.values(materials).filter((material) =>
                            Number(material.topic_id) === Number(topic.id)
                    ).length;


                return {
                    ...topic,

                    owner:
                        owner
                            ? {
                                id: owner.id,

                                username: owner.username,
                            }
                            : null,

                    role: getMockTopicPermission(topic.id, userId),

                    is_followed: Boolean(membership),

                    last_visited_at: state?.last_visited_at ?? null,

                    materials_count: materialsCount,
                };
            })
    );
}


export async function getMockTopicById(topicId) {
    await delay();

    assertCanViewTopic(topicId);

    const topic = getMockTopic(topicId);

    const users = loadMockUsers();

    const owner = users[String(topic.owner_id)];

    return structuredClone({
        ...topic,

        owner:
            owner
                ? {
                    id: owner.id,
                    username: owner.username,
                }
                : null,
    });
}

export async function getMockTopicMembers(topicId) {
    await delay(150);

    const permission = getMockTopicPermission(topicId);

    if (permission !== "owner") {
        throw createError("Only the topic owner can manage topic access.", 403);
    }

    const topic = getMockTopic(topicId);

    if (!topic) {
        throw createError("Topic not found.", 404);
    }

    const access = getAccessDatabase();

    const users = loadMockUsers();

    const owner = users[String(topic.owner_id)];

    const members = [];

    if (owner) {
        members.push({
            topic_id: Number(topicId),

            user_id: Number(owner.id),

            role: "owner",

            user: {
                id: owner.id,
                username: owner.username,
                email: owner.email,
            },
        });
    }

    Object.values(access).filter((entry) =>
            Number(entry.topic_id) === Number(topicId)
        ).forEach((entry) => {
            const user = users[String(entry.user_id)];

            if (!user) {
                return;
            }

            members.push({
                ...entry,

                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                },
            });
        });

    return structuredClone(members);
}


export async function createMockTopic(data) {
    await delay();

    const userId = getCurrentUserId();

    const topics = getDatabase();

    if (!data?.name?.trim()) {
        throw createError("Topic name is required.", 400);
    }

    const ids =
        Object.keys(topics).map(Number).filter(Number.isFinite);

    const nextId =
        ids.length > 0
            ? Math.max(...ids) + 1
            : 1;

    const now = new Date().toISOString();

    // server generated
    const viewerCode =
        `VIEW-${nextId}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const editorCode =
        `EDIT-${nextId}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    const topic = {
        id: nextId,

        owner_id: userId,

        name: data.name?.trim() ?? "",

        description: data.description?.trim() || null,

        category: data.category ?? null,

        is_public: Boolean(data.is_public),

        banner_url: data.banner_url ?? null,

        viewer_code: viewerCode,

        editor_code: editorCode,

        created_at: now,

        updated_at: now,
    };

    topics[String(nextId)] = topic;

    saveMockTopics(topics);

    return structuredClone(topic);
}


export async function updateMockTopic(topicId, data) {
    await delay();

    const topics = getDatabase();

    const topic = topics[String(topicId)];

    if (!topic) {
        throw createError("Topic not found.", 404);
    }

    assertCanEditTopic(topicId);

    const allowedFields = [
        "name",
        "description",
        "category",
        "is_public",
        "banner_url",
        "viewer_code",
        "editor_code",
    ];


    const update = {};

    for (const field of allowedFields) {
        if (Object.prototype.hasOwnProperty.call(data, field)) {
            update[field] = structuredClone(data[field]);
        }
    }

    if (update.name !== undefined) {
        update.name = update.name.trim();

        if (!update.name) {
            throw createError("Topic name is required.", 400);
        }
    }

    const updated = {
        ...topic,

        ...update,

        id: topic.id,

        owner_id: topic.owner_id,

        created_at: topic.created_at,

        updated_at: new Date().toISOString(),
    };


    topics[String(topicId)] = updated;

    saveMockTopics(topics);


    return structuredClone(updated);
}


export async function deleteMockTopic(topicId) {
    await delay();

    const topics = getDatabase();

    const topic = topics[String(topicId)];

    if (!topic) {
        throw createError("Topic not found.", 404);
    }

    assertCanEditTopic(topicId);

    delete topics[String(topicId)];

    saveMockTopics(topics);


    const access = getAccessDatabase();

    for (const key of Object.keys(access)) {
        if (key.startsWith(`${topicId}:`)) {
            delete access[key];
        }
    }

    saveMockTopicAccess(access);


    const state = loadMockTopicUserState();

    for (const key of Object.keys(state)) {
        if (key.startsWith(`${topicId}:`)) {
            delete state[key];
        }
    }

    saveMockTopicUserState(state);


    return null;
}


/* Current user's permission */

export async function getMockMyTopicAccess(topicId) {
    await delay(100);

    return structuredClone(
        getMockTopicAccessForUser(topicId)
    );
}

export async function followMockTopic(topicId) {
    await delay(150);

    const topic = getMockTopic(topicId);

    if (!topic) {
        throw createError("Topic not found.", 404);
    }


    const userId = getCurrentUserId();


    if (Number(topic.owner_id) === Number(userId)) {
        throw createError("Topic owners cannot follow their own topic.", 400);
    }

    if (!topic.is_public) {
        throw createError("Only public topics can be followed.", 403);
    }

    const access = getAccessDatabase();

    const key = `${topicId}:${userId}`;


    if (!access[key]) {
        access[key] = {
            topic_id: Number(topicId),

            user_id: Number(userId),

            role: "viewer",
        };

        saveMockTopicAccess(access);
    }


    return structuredClone(access[key]);
}


export async function unfollowMockTopic(topicId) {
    await delay(150);

    const topic = getMockTopic(topicId);

    if (!topic) {
        throw createError("Topic not found.", 404);
    }


    const userId = getCurrentUserId();


    if (Number(topic.owner_id) === Number(userId)) {
        throw createError("Topic owners cannot unfollow their own topic.", 400);
    }


    const access = getAccessDatabase();

    const key = `${topicId}:${userId}`;

    delete access[key];

    saveMockTopicAccess(access);


    // deleting the topic from user's recents as well
    const state = loadMockTopicUserState();

    delete state[key];

    saveMockTopicUserState(state);

    return null;
}


/* join with access code */
export async function joinMockTopic(code) {
    await delay(150);

    const userId = getCurrentUserId();

    const topics = getDatabase();

    const normalizedCode = code?.trim().toUpperCase();


    if (!normalizedCode) {
        throw createError("Access code is required.", 400);
    }


    const topic =
        Object.values(topics).find((candidate) =>
            candidate.viewer_code?.toUpperCase() === normalizedCode ||
            candidate.editor_code?.toUpperCase() === normalizedCode
        );


    if (!topic) {
        throw createError("Invalid topic access code.", 404);
    }


    if (Number(topic.owner_id) === Number(userId)) {
        throw createError("You already own this topic.", 400);
    }


    const role =
        topic.editor_code?.toUpperCase() === normalizedCode
        ? "editor"
        : "viewer";


    const access = getAccessDatabase();

    const key = `${topic.id}:${userId}`;

    const existing = access[key];

    if (existing?.role ===  "editor") {
    } else {
        access[key] = {
            topic_id: Number(topic.id),

            user_id: Number(userId),

            role,
        };
    }


    saveMockTopicAccess(access);


    return {
        topic: structuredClone(topic),

        access: structuredClone(access[key]),
    };
}


export async function removeMockTopicMember(topicId, userId) {
    await delay(150);

    const permission = getMockTopicPermission(topicId);

    if (permission !== "owner") {
        throw createError("Only the topic owner can manage topic access.", 403);
    }

    const access = getAccessDatabase();
    const key = `${topicId}:${userId}`;

    delete access[key];

    saveMockTopicAccess(access);

    const state = loadMockTopicUserState();

    delete state[key];

    saveMockTopicUserState(state);


    return null;
}

export async function updateMockTopicMemberRole(topicId, userId, role) {
    await delay(150);

    const permission = getMockTopicPermission(topicId);

    if (permission !== "owner") {
        throw createError(
            "Only the topic owner can manage topic access.",
            403
        );
    }

    if (!["viewer", "editor"].includes(role)) {
        throw createError(
            "Invalid member role.",
            400
        );
    }

    const topic = getMockTopic(topicId);

    if (!topic) {
        throw createError(
            "Topic not found.",
            404
        );
    }

    const access = getAccessDatabase();

    const key = `${topicId}:${userId}`;

    const membership = access[key];

    if (!membership) {
        throw createError(
            "Topic member not found.",
            404
        );
    }

    access[key] = {
        ...membership,
        role,
    };

    saveMockTopicAccess(access);

    return structuredClone(access[key]);
}

//

function generateInviteCode(prefix) {
    return `${prefix}-${crypto
        .randomUUID()
        .replace(/-/g, "")
        .slice(0, 12)
        .toUpperCase()}`;
}

function isInviteCodeTaken(topics, code, ignoredTopicId) {
    const normalizedCode = code.toUpperCase();

    return Object.values(topics).some((topic) =>
        (
            Number(topic.id) !== Number(ignoredTopicId)
        ) 
        &&
        (
            topic.viewer_code?.toUpperCase() === normalizedCode ||
            topic.editor_code?.toUpperCase() === normalizedCode
        )
    );
}

function generateUniqueInviteCode(topics, prefix, topicId) {
    let code;

    do {
        code = generateInviteCode(prefix);
    } while (
        isInviteCodeTaken(topics, code, topicId)
    );

    return code;
}

export async function regenerateMockTopicInviteCode(topicId, type) {
    await delay(150);

    const topics = getDatabase();
    const topic = topics[String(topicId)];

    if (!topic) {
        throw createError("Topic not found.", 404);
    }

    assertCanEditTopic(topicId);

    if (type !== "viewer" && type !== "editor") {
        throw createError("Invalid invite code type.", 400);
    }

    const prefix =
        type === "editor"
            ? "EDIT"
            : "VIEW";

    const field =
        type === "editor"
            ? "editor_code"
            : "viewer_code";

    topic[field] =
        generateUniqueInviteCode(topics, prefix, topicId);

    topic.updated_at = new Date().toISOString();

    topics[String(topicId)] = topic;

    saveMockTopics(topics);

    return structuredClone(topic);
}