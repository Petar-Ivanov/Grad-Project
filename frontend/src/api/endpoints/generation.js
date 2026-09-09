import { api } from "../client";


export async function generatePlan(data) {
    return api.post("/generation/plan", data);
}

export async function buildMaterial(data) {
    return api.post("/generation/material", data);
}