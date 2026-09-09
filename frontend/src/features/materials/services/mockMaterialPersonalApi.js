import { mockMaterialUserState } from "../../../mock/seeds/materials/materialUserState";

import {
    loadMockMaterialUserState,
    saveMockMaterialUserState,
    loadMockComments,
    saveMockComments,
    //loadMockMaterials,
    //loadMockPersonalState,
    //saveMockPersonalState,
} from "../../../mock/storage";

import { getMockCurrentUserId } from "../../../mock/auth";
import { getMockMaterial } from "./mockMaterialApi";

// import {
//     assertCanViewTopic,
// } from "../../topics/services/mockTopicAuthorization";

function delay(ms = 150) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

/* Authentication */

function getCurrentUserId() {
    const userId = 
        getMockCurrentUserId();

    if (!userId) {
        const error = 
            new Error("Not authenticated.");

        error.status = 401;

        throw error;
    }

    return userId;
}

/* Material user state */

function getStateKey(userId, materialId) {
    return `${Number(userId)}:${Number(materialId)}`;
}

function createInitialMaterialUserStateDatabase() {
    const database =
        structuredClone(mockMaterialUserState);

    saveMockMaterialUserState(database);

    return database;
}

function getMaterialUserStateDatabase() {
    const database =
        loadMockMaterialUserState();

    if (Object.keys(database).length === 0) {
        return createInitialMaterialUserStateDatabase();
    }

    return database;
}

function createDefaultMaterialUserState(materialId, userId) {
    const now =
        new Date().toISOString();

    return {
        user_id:
            Number(userId),

        material_id:
            Number(materialId),

        last_visited_at:
            null,

        pinned_block_ids:
            [],

        hidden_block_ids:
            [],

        created_at:
            now,

        updated_at:
            now,
    };
}

async function getAccessibleMaterial(materialId) {
    return getMockMaterial(materialId);
}


/* GET /materials/:id/personal-state */

export async function getMockMaterialPersonalState(materialId) {
    const material =
        await getAccessibleMaterial(materialId);

    await delay();

    const userId =
        getCurrentUserId();

    const database =
        getMaterialUserStateDatabase();

    const key =
        getStateKey(userId, material.id);

    const state =
        database[key];

    if (!state) {
        return createDefaultMaterialUserState(material.id, userId);
    }

    return structuredClone(state);
}


/* PATCH /materials/:id/personal-state */

export async function updateMockMaterialPersonalState(materialId, data) {
    const material =
        await getAccessibleMaterial(materialId);

    await delay();

    const userId =
        getCurrentUserId();

    const database =
        getMaterialUserStateDatabase();

    const key =
        getStateKey(userId, material.id);

    const current =
        database[key] ??
        createDefaultMaterialUserState(material.id, userId);

    const updated = {
        ...current,

        ...structuredClone(data),

        user_id:
            Number(userId),

        material_id:
            Number(material.id),

        updated_at:
            new Date().toISOString(),
    };

    database[key] = updated;

    saveMockMaterialUserState(database);

    return structuredClone(updated);
}

/* POST /materials/:id/visit */

export async function recordMockMaterialVisit(materialId) {
    const material =
        await getAccessibleMaterial(materialId);

    await delay(100);

    const userId =
        getCurrentUserId();

    const database =
        getMaterialUserStateDatabase();

    const key =
        getStateKey(userId, material.id);

    const current =
        database[key] ??
        createDefaultMaterialUserState(material.id, userId);

    const now =
        new Date().toISOString();

    const updated = {
        ...current,

        last_visited_at:
            now,

        updated_at:
            now,
    };

    database[key] = updated;

    saveMockMaterialUserState(database);

    return structuredClone(updated);
}


/* GET /materials/:id/comments */

/* Private comments */
export async function getMockMaterialComments(materialId) {
    await getAccessibleMaterial(materialId);

    await delay(200);

    const comments =
        loadMockComments();

    const userId =
        getCurrentUserId();

    const materialComments =
        Object.values(comments).filter((comment) =>
            Number(comment.material_id) === Number(materialId) &&
            Number(comment.user_id) === Number(userId)
        );

    return structuredClone(materialComments);
}


/* GET /materials/:id/comments */

export async function createMockMaterialComment(materialId, data) {
    await getAccessibleMaterial(materialId);

    await delay(200);

    const comments = 
        loadMockComments();

    const ids = 
        Object.keys(comments).map(Number).filter(Number.isFinite);

    const nextId =
        ids.length > 0
            ? Math.max(...ids) + 1
            : 1;

    const now = 
        new Date().toISOString();

    const comment = {
        id: nextId,

        material_id: Number(materialId),

        user_id: getCurrentUserId(),

        block_id: data.block_id,

        content_json: structuredClone(data.content_json ),

        is_hidden: Boolean(data.is_hidden ?? false),

        created_at: now,
        updated_at: now,
    };

    comments[String(nextId)] = comment;

    saveMockComments(comments);

    return structuredClone(comment);
}


/* PATCH /materials/:id/comments/:commentId */

export async function updateMockMaterialComment(materialId, commentId, data) {
    await getAccessibleMaterial(materialId);

    await delay(150);

    const comments =
        loadMockComments();

    const current =
        comments[String(commentId)];

    const userId =
        getCurrentUserId();

    if (
        !current ||
        Number(current.material_id) !== Number(materialId) ||
        Number(current.user_id) !== Number(userId)
    ) {
        const error =
            new Error("Comment not found.");

        error.status = 404;

        throw error;
    }

    const updated = {
        ...current,

        ...structuredClone(data),

        id:
            current.id,

        material_id:
            current.material_id,

        user_id:
            current.user_id,

        updated_at:
            new Date().toISOString(),
    };

    comments[String(commentId)] = updated;

    saveMockComments(comments);

    return structuredClone(updated);
}


/* DELETE /materials/:id/comments/:commentId */

export async function deleteMockMaterialComment(materialId, commentId) {
    await getAccessibleMaterial(materialId);

    await delay(150);

    const comments =
        loadMockComments();

    const current =
        comments[String(commentId)];

    const userId =
        getCurrentUserId();

    if (
        !current ||
        Number(current.material_id) !== Number(materialId) ||
        Number(current.user_id) !== Number(userId)
    ) {
        const error =
            new Error("Comment not found.");

        error.status = 404;

        throw error;
    }

    delete comments[String(commentId)];

    saveMockComments(comments);

    return null;
}

// function getMaterialForPersonalData(materialId) {
//     const materials = loadMockMaterials();

//     const material =
//         materials[String(materialId)] ?? null;

//     if (!material) {
//         const error = new Error("Material not found.");
//         error.status = 404;
//         throw error;
//     }

//     assertCanViewTopic(
//         material.topic_id,
//         getCurrentUserId()
//     );

//     return material;
// }

/* Personal state */

// function createDefaultPersonalState(materialId) {
//     const userId = getCurrentUserId();

//     return {
//         material_id: Number(materialId),
//         user_id: userId,

//         pinned_block_ids: [],
//         hidden_block_ids: [],

//         created_at: new Date().toISOString(),

//         updated_at: new Date().toISOString(),
//     };
// }

// function getOrCreatePersonalState(materialId) {
//     //const states = loadMockPersonalState();
//     const states = loadMockMaterialUserState();

//     const key = getStateKey(materialId);

//     if (!states[key]) {
//         states[key] = createDefaultPersonalState(materialId);
//         //saveMockPersonalState(states);
//         saveMockMaterialUserState(states);
//     }

//     return states[key];
// }

// export async function getMockMaterialPersonalState(materialId) {
//     await delay();

//     const material =
//         getMaterialFromDatabase(materialId);

//     assertCanViewMaterial(material);

//     const userId =
//         getCurrentUserId();

//     const database =
//         getMaterialUserStateDatabase();

//     const key =
//         `${userId}:${material.id}`;

//     const state =
//         database[key] ?? {
//             user_id: userId,
//             material_id: Number(material.id),

//             last_visited_at: null,

//             pinned_block_ids: [],
//             hidden_block_ids: [],
//         };

//     return structuredClone(state);
// }

// export async function getMockMaterialPersonalState(materialId) {
//     getMaterialForPersonalData(materialId);

//     await delay(150);

//     return structuredClone(
//         getOrCreatePersonalState(materialId)
//     );
// }

// export async function updateMockMaterialPersonalState(materialId, data) {
//     await delay();

//     const material =
//         getMaterialFromDatabase(materialId);

//     assertCanViewMaterial(material);

//     const userId =
//         getCurrentUserId();

//     const database =
//         getMaterialUserStateDatabase();

//     const key =
//         `${userId}:${material.id}`;

//     const current =
//         database[key] ?? {
//             user_id: userId,
//             material_id: Number(material.id),

//             last_visited_at: null,

//             pinned_block_ids: [],
//             hidden_block_ids: [],
//         };

//     const updated = {
//         ...current,
//         ...structuredClone(data),
//     };

//     database[key] = updated;

//     saveMockMaterialUserState(database);

//     return structuredClone(updated);
// }

// export async function updateMockMaterialPersonalState(materialId, data) {
//     getMaterialForPersonalData(materialId);

//     await delay(150);

//     //const states = loadMockPersonalState();
//     const states = loadMockMaterialUserState();
//     const key = getStateKey(materialId);
//     const current =
//         states[key] ?? createDefaultPersonalState(materialId);

//     const updated = {
//         ...current,
//         ...structuredClone(data),
//         material_id: Number(materialId),
//         user_id: getCurrentUserId(),
//         updated_at: new Date().toISOString(),
//     };

//     states[key] = updated;

//     //saveMockPersonalState(states);
//     saveMockMaterialUserState(states);

//     return structuredClone(updated);
// }

// export async function getMockMaterialComments(materialId) {
//     getMaterialForPersonalData(materialId);

//     await delay(200);

//     const comments = loadMockComments()

//     const materialComments =
//         Object.values(comments).filter((comment) =>
//             Number(comment.material_id) === Number(materialId) &&
//             Number(comment.user_id) === getCurrentUserId()
//         );

//     return structuredClone(materialComments);
// }

// resetting / clearing up mockup data
// export function deleteMockMaterialPersonalData(materialId) {

//     //const states = loadMockPersonalState();
//     const states = loadMockMaterialUserState();

//     for (const key of Object.keys(states)) {
//         if (key.startsWith(`${materialId}:`)) {
//             delete states[key];
//         }
//     }

//     //saveMockPersonalState(states);
//     saveMockMaterialUserState(states);

//     const comments = loadMockComments();

//     for (const [id, comment] of Object.entries(comments)) {
//         if (Number(comment.material_id) === Number(materialId)) {
//             delete comments[id];
//         }
//     }

//     saveMockComments(comments);
// }

// export async function recordMockMaterialVisit(materialId) {
//     await delay(100);

//     const material =
//         getMaterialFromDatabase(materialId);

//     assertCanViewMaterial(material);

//     const userId =
//         getCurrentUserId();

//     const database =
//         getMaterialUserStateDatabase();

//     const key =
//         `${userId}:${material.id}`;

//     const current =
//         database[key] ?? {
//             user_id: userId,
//             material_id: Number(material.id),

//             last_visited_at: null,

//             pinned_block_ids: [],
//             hidden_block_ids: [],
//         };

//     const updated = {
//         ...current,

//         last_visited_at:
//             new Date().toISOString(),
//     };

//     database[key] = updated;

//     saveMockMaterialUserState(database);

//     return structuredClone(updated);
// }