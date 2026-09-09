import {
    loadMockMaterialUserState,
    saveMockMaterialUserState,

    loadMockComments,
    saveMockComments,
} from "../../../mock/storage";



export function deleteMockMaterialPersonalData(materialId) {
    deleteMockMaterialUserState(materialId);

    deleteMockMaterialComments(materialId);
}

function deleteMockMaterialUserState(materialId) {
    const states =
        loadMockMaterialUserState();

    for (const [key, state] of Object.entries(states)) {
        if (Number(state.material_id) === Number(materialId)) {
            delete states[key];
        }
    }

    saveMockMaterialUserState(states);
}


function deleteMockMaterialComments(materialId) {
    const comments =
        loadMockComments();

    for (const [id, comment] of Object.entries(comments)) {
        if (Number(comment.material_id) === Number(materialId)) {
            delete comments[id];
        }
    }

    saveMockComments(comments);
}