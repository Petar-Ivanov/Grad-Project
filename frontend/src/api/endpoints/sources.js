import { api } from "../client";


export async function getTopicSources(topicId) {
    return api.get(`/topics/${topicId}/sources`);
}


export async function createFileSource(topicId, file) {
    const formData =
        new FormData();

    formData.append("file", file);

    return api.post(`/topics/${topicId}/sources/files`, formData);
}


export async function createLinkSource(topicId, data) {
    return api.post(`/topics/${topicId}/sources/links`, data);
}


export async function createTextSource(topicId, data) {
    return api.post(`/topics/${topicId}/sources/text`, data);
}


export async function updateSource(sourceId, data) {
    return api.patch(`/sources/${sourceId}`, data);
}


export async function deleteSource(sourceId) {
    return api.delete(`/sources/${sourceId}`);
}