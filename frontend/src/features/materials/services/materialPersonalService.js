import {
    getMaterialPersonalState as getApiMaterialPersonalState,
    updateMaterialPersonalState as updateApiMaterialPersonalState,

    getMaterialComments as getApiMaterialComments,
    createMaterialComment as createApiMaterialComment,
    updateMaterialComment as updateApiMaterialComment,
    deleteMaterialComment as deleteApiMaterialComment,

    recordMaterialVisit as recordApiMaterialVisit,
} from "../../../api/endpoints/materialPersonal";


import {
    getMockMaterialPersonalState,
    updateMockMaterialPersonalState,
    recordMockMaterialVisit,

    getMockMaterialComments,
    createMockMaterialComment,
    updateMockMaterialComment,
    deleteMockMaterialComment,
} from "./mockMaterialPersonalApi";


const USE_MOCK_API =
    import.meta.env.VITE_USE_MOCK_API === "true";


const repository = USE_MOCK_API
    ? {
        getState:
            getMockMaterialPersonalState,

        updateState:
            updateMockMaterialPersonalState,

        recordVisit:
            recordMockMaterialVisit,

        getComments:
            getMockMaterialComments,

        createComment:
            createMockMaterialComment,

        updateComment:
            updateMockMaterialComment,

        deleteComment:
            deleteMockMaterialComment,
    }
    : {
        getState:
            getApiMaterialPersonalState,

        updateState:
            updateApiMaterialPersonalState,

        recordVisit:
            recordApiMaterialVisit,

        getComments:
            getApiMaterialComments,

        createComment:
            createApiMaterialComment,

        updateComment:
            updateApiMaterialComment,

        deleteComment:
            deleteApiMaterialComment,
    };


export function getMaterialPersonalState(materialId) {
    return repository.getState(materialId);
}


export function updateMaterialPersonalState(materialId, data) {
    return repository.updateState(materialId, data);
}


export function recordMaterialVisit(materialId) {
    return repository.recordVisit(materialId);
}


export function getMaterialComments(materialId) {
    return repository.getComments(materialId);
}


export function createMaterialComment(materialId, data) {
    return repository.createComment(materialId, data);
}


export function updateMaterialComment(materialId, commentId, data) {
    return repository.updateComment(materialId, commentId, data);
}


export function deleteMaterialComment(materialId, commentId) {
    return repository.deleteComment(materialId, commentId);
}