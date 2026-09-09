import {
    getMyProfile as getApiMyProfile,
    updateMyProfile as updateApiMyProfile,
    deleteMyProfile as deleteApiMyProfile,
} from "../../../api/endpoints/profile";

import {
    getMockMyProfile,
    updateMockMyProfile,
    deleteMockMyProfile,
} from "./mockProfileApi";


const USE_MOCK_API =
    import.meta.env.VITE_USE_MOCK_API === "true";


const repository =
    USE_MOCK_API
        ? {
            get:
                getMockMyProfile,

            update:
                updateMockMyProfile,

            delete:
                deleteMockMyProfile,
        }
        : {
            get:
                getApiMyProfile,

            update:
                updateApiMyProfile,

            delete:
                deleteApiMyProfile,
        };


export function getMyProfile() {
    return repository.get();
}

export function updateMyProfile(data) {
    return repository.update(data);
}

export function deleteMyProfile() {
    return repository.delete();
}