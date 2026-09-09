import { api } from "../client";

export async function getContinueLearning(limit = 6) {
    return api.get(`/dashboard/continue-learning?limit=${limit}`);
}