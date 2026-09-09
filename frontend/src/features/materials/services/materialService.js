import {
    getMaterials as getApiMaterials,
    getMaterial as getApiMaterial,
    createMaterial as createApiMaterial,
    updateMaterial as updateApiMaterial,
    deleteMaterial as deleteApiMaterial,
    duplicateMaterial as duplicateApiMaterial,
} from "../../../api/endpoints/materials";

import {
    getMockMaterials,
    getMockMaterial,
    createMockMaterial,
    updateMockMaterial,
    deleteMockMaterial,
    duplicateMockMaterial,
} from "./mockMaterialApi";

const USE_MOCK_API =
    import.meta.env.VITE_USE_MOCK_API === "true";

const repository = USE_MOCK_API
    ? {
        list: 
            getMockMaterials,
        get: 
            getMockMaterial,
        create: 
            createMockMaterial,
        update: 
            updateMockMaterial,
        delete: 
            deleteMockMaterial,
        duplicate: 
            duplicateMockMaterial,
    }
    : {
        list: 
            getApiMaterials,
        get: 
            getApiMaterial,
        create: 
            createApiMaterial,
        update: 
            updateApiMaterial,
        delete: 
            deleteApiMaterial,
        duplicate: 
            duplicateApiMaterial,
    };


export function getMaterials() {
    return repository.list();
}

export function getMaterial(materialId) {
    return repository.get(materialId);
}

export function createMaterial(data) {
    return repository.create(data);
}

export function updateMaterial(materialId, data) {
    return repository.update(materialId, data);
}

export function deleteMaterial(materialId) {
    return repository.delete(materialId);
}

export function duplicateMaterial(materialId) {
    return repository.duplicate(materialId);
}