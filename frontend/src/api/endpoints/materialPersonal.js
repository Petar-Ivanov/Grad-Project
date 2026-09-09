import { api } from "../client";


/* Material user state */

export async function getMaterialPersonalState(materialId) {
    return api.get(`/materials/${materialId}/personal-state`);
}

export async function updateMaterialPersonalState(materialId, data) {
    return api.patch(`/materials/${materialId}/personal-state`, data);
}

export async function recordMaterialVisit(materialId) {
    return api.post(`/materials/${materialId}/visit`);
}


/* Private comments */

export async function getMaterialComments(materialId) {
    return api.get(`/materials/${materialId}/comments`);
}

export async function createMaterialComment(materialId, data) {
    return api.post(`/materials/${materialId}/comments`, data);
}

export async function updateMaterialComment(materialId, commentId, data) {
    return api.patch(`/materials/${materialId}/comments/${commentId}`, data);
}

export async function deleteMaterialComment(materialId, commentId) {
    return api.delete(`/materials/${materialId}/comments/${commentId}`);
}