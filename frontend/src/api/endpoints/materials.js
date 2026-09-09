import { api } from "../client";

export async function getMaterials() {
    return api.get("/materials");
}

export async function getMaterial(materialId) {
    return api.get(`/materials/${materialId}`);
}

export async function createMaterial(data) {
    return api.post("/materials", data);
}

export async function updateMaterial(materialId, data) {
    return api.patch(`/materials/${materialId}`, data);
}

export async function deleteMaterial(materialId) {
    return api.delete(`/materials/${materialId}`);
}

export async function duplicateMaterial(materialId) {
    return api.post(`/materials/${materialId}/duplicate`);
}

export async function recordMaterialVisit(materialId) {
    return api.post(`/materials/${materialId}/visit`);
}