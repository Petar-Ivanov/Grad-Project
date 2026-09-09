import { api } from "../client";


export async function register(data) {
    return api.post("/auth/register", data);
}


export async function login(data) {
    return api.post("/auth/login", data);
}


export async function getCurrentUser() {
    return api.get("/auth/me");
}


export async function logout() {
    return api.post("/auth/logout");
}