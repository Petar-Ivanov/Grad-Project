import { api } from "../client";


export async function getTopics() {
    return api.get("/topics");
}


export async function getTopic(topicId) {
    return api.get(`/topics/${topicId}`);
}


export async function createTopic(data) {
    return api.post("/topics", data);
}


export async function updateTopic(topicId, data) {
    return api.patch(`/topics/${topicId}`, data);
}


export async function deleteTopic(topicId) {
    return api.delete(`/topics/${topicId}`);
}


/* Current user's access */
export async function getMyTopicAccess(topicId) {
    return api.get(`/topics/${topicId}/access/me`);
}


/* Topic members */
export async function getTopicMembers(topicId) {
    return api.get(`/topics/${topicId}/members`);
}


export async function removeTopicMember(topicId, userId) {
    return api.delete(`/topics/${topicId}/members/${userId}`);
}


export async function followTopic(topicId) {
    return api.post(`/topics/${topicId}/follow`);
}


export async function unfollowTopic(topicId) {
    return api.delete(`/topics/${topicId}/follow`);
}

export async function joinTopic(code) {
    return api.post("/topics/join", {code,});
}

export async function updateTopicMemberRole(topicId, userId, role) {
    return api.patch(`/topics/${topicId}/members/${userId}`, { role });
}

//
export async function regenerateTopicInviteCode(topicId, type) {
    return api.post(`/topics/${topicId}/invite-codes/${type}/regenerate`);
}