import { mockMaterials } from "../../../mock/seeds/materials/materials";
import {
    loadMockMaterials,
    saveMockMaterials,
} from "../../../mock/storage";

import { deleteMockMaterialPersonalData } from "./mockMaterialCleanup";

import {
    getMockTopicPermission,
    assertCanViewTopic,
    assertCanEditTopic,
} from "../../topics/services/mockTopicAuthorization";

import { getMockCurrentUserId } from "../../../mock/auth";

// import { mockMaterialVisits } from "../../../mock/seeds/materials/materialVisits";
// import {
//     loadMockMaterialVisits,
//     saveMockMaterialVisits,
// } from "../../../mock/storage";



function delay(ms = 200) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function getCurrentUserId() {
    const userId = getMockCurrentUserId();

    if (!userId) {
        const error = new Error("Not authenticated.");
        error.status = 401;
        throw error;
    }

    return userId;
}

function createInitialDatabase() {
    const database = structuredClone(mockMaterials);

    saveMockMaterials(database);

    return database;
}

function getDatabase() {
    const database = loadMockMaterials();

    if (Object.keys(database).length === 0) {
        return createInitialDatabase();
    }

    return database;
}


function getMaterialFromDatabase(materialId) {
    const database = getDatabase();

    return (database[String(materialId)] ?? null);
}


function saveMaterialToDatabase(material) {
    const database = getDatabase();

    database[String(material.id)] = material;

    saveMockMaterials(database);
}


function removeMaterialFromDatabase(materialId) {
    const database = getDatabase();

    delete database[String(materialId)];

    saveMockMaterials(database);
}

function assertCanViewMaterial(material) {
    if (!material) {
        const error = new Error("Material not found.");

        error.status = 404;

        throw error;
    }

    assertCanViewTopic(material.topic_id);
}


function assertCanEditMaterial(material) {
    if (!material) {
        const error = new Error("Material not found.");

        error.status = 404;

        throw error;
    }

    assertCanEditTopic(material.topic_id);
}


/* GET /materials */

export async function getMockMaterials() {
    await delay();

    const database = getDatabase();

    const materials = Object.values(database);

    return structuredClone(
        materials.filter((material) => {
            const permission = getMockTopicPermission(material.topic_id);

            return permission !== "none";
        })
    );
}


/* GET /materials/:id */

export async function getMockMaterial(materialId) {
    await delay(300);

    const material = getMaterialFromDatabase(materialId);

    assertCanViewMaterial(material);

    return structuredClone(material);
}


/* POST /materials */

export async function createMockMaterial(data) {
    await delay(300);

    const topicId = Number(data?.topic_id);

    if (!topicId) {
        throw createError("topic_id is required.", 400);
    }

    const userId = getCurrentUserId();

    const topicPermission = getMockTopicPermission(topicId, userId);

    if (topicPermission !== "owner") {
        throw createError("Only the topic owner can create materials.", 403);
    }

    const database = getDatabase();

    const ids = Object.keys(database).map(Number).filter(Number.isFinite);

    const nextId =
        ids.length > 0
            ? Math.max(...ids) + 1
            : 1;

    const now = new Date().toISOString();

    const type =
        data.type === "presentation"
            ? "presentation"
            : "studydoc";

    const defaultName =
        type === "presentation"
            ? "Untitled Presentation"
            : "Untitled Study Doc";

    const name =
        data.name?.trim() || defaultName;

    const material = {
        id: nextId,

        topic_id: topicId,

        owner_id: userId,

        name,

        type,

        status: "draft",

        created_at: now,

        updated_at: now,

        content_json: {
            title: name,

            description:
                "",

            blocks:
                [],
        },
    };

    database[String(nextId)] = material;

    saveMockMaterials(database);

    return structuredClone(material);
}


/* PATCH /materials/:id */

export async function updateMockMaterial(materialId, data) {
    await delay(200);

    const currentMaterial = getMaterialFromDatabase(materialId);

    assertCanEditMaterial(currentMaterial);

    //
    if (Object.prototype.hasOwnProperty.call(data, "name")) {
        const userId = getCurrentUserId();

        if (Number(currentMaterial.owner_id) !== Number(userId)) {
            throw createError("Only the topic owner can rename materials.", 403);
        }
    }

    const updatedMaterial = {
        ...currentMaterial,

        ...structuredClone(data),

        content_json: {
            ...currentMaterial.content_json,

            ...(data.content_json ?? {}),
        },

        updated_at: new Date().toISOString(),
    };

    saveMaterialToDatabase(updatedMaterial);

    return structuredClone(updatedMaterial);
}


/* DELETE /materials/:id */

export async function deleteMockMaterial(materialId) {
    await delay(200);

    const material = getMaterialFromDatabase(materialId);

    assertCanEditMaterial(material);

    const userId = getCurrentUserId();

    if (Number(material.owner_id) !== Number(userId)) {
        throw createError("Only the topic owner can delete materials.", 403);
    }

    removeMaterialFromDatabase(materialId);

    deleteMockMaterialPersonalData(materialId);

    return null;
}


/* POST /materials/:id/duplicate */

export async function duplicateMockMaterial(materialId) {
    await delay(300);

    const source = getMaterialFromDatabase(materialId);

    assertCanEditMaterial(source);

    const userId = getCurrentUserId();

    if (Number(source.owner_id) !== Number(userId)) {
        throw createError("Only the topic owner can duplicate materials.", 403);
    }

    const database = getDatabase();

    const ids = Object.keys(database).map(Number).filter(Number.isFinite);

    const nextId =
        ids.length > 0
            ? Math.max(...ids) + 1
            : 1;

    const now = new Date().toISOString();

    const duplicate = {
        ...structuredClone(source),

        id: nextId,

        owner_id: userId,

        name: `${source.name} (Copy)`,

        status: "draft",

        created_at: now,

        updated_at: now,
    };

    database[String(nextId)] = duplicate;

    saveMockMaterials(database);

    return structuredClone(duplicate);
}

/* POST /materials/:id/visit */

// export async function recordMockMaterialVisit(materialId) {
//     await delay(100);

//     const material = getMaterialFromDatabase(materialId);

//     assertCanViewMaterial(material);

//     const userId = getCurrentUserId();
//     const database = getMaterialVisitDatabase();
//     const key = `${userId}:${material.id}`;

//     const visit = {
//         user_id: userId,

//         material_id: Number(material.id),

//         last_visited_at:
//             new Date().toISOString(),
//     };

//     database[key] = visit;

//     saveMockMaterialVisits(database);

//     return structuredClone(visit);
// }

// function createInitialMaterialVisitDatabase() {
//     const database = structuredClone(mockMaterialVisits);

//     saveMockMaterialVisits(database);

//     return database;
// }

// function getMaterialVisitDatabase() {
//     const database = loadMockMaterialVisits();

//     if (Object.keys(database).length === 0) {
//         return createInitialMaterialVisitDatabase();
//     }

//     return database;
// }