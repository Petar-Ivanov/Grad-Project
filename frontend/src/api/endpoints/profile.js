import { api } from "../client";


export async function getMyProfile() {
    return api.get("/users/me");
}

export async function updateMyProfile(data) {
    return api.patch("/users/me", data);
}

export async function deleteMyProfile() {
    return api.delete("/users/me");
}