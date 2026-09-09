import {
    getTopicSources as getApiTopicSources,
    createFileSource as createApiFileSource,
    createLinkSource as createApiLinkSource,
    createTextSource as createApiTextSource,
    updateSource as updateApiSource,
    deleteSource as deleteApiSource,
} from "../../../../../api/endpoints/sources";

import {
    getMockTopicSources,
    createMockFileSource,
    createMockLinkSource,
    createMockTextSource,
    updateMockSource,
    deleteMockSource,
} from "./mockSourceApi";


const USE_MOCK_API =
    import.meta.env.VITE_USE_MOCK_API === "true";


const repository =
    USE_MOCK_API
        ? {
            list:
                getMockTopicSources,

            createFile:
                createMockFileSource,

            createLink:
                createMockLinkSource,

            createText:
                createMockTextSource,

            update:
                updateMockSource,

            delete:
                deleteMockSource,
        }
        : {
            list:
                getApiTopicSources,

            createFile:
                createApiFileSource,

            createLink:
                createApiLinkSource,

            createText:
                createApiTextSource,

            update:
                updateApiSource,

            delete:
                deleteApiSource,
        };


export function getTopicSources(topicId) {
    return repository.list(topicId);
}


export function createFileSource(topicId, file) {
    return repository.createFile(topicId, file);
}


export function createLinkSource(topicId, data) {
    return repository.createLink(topicId, data);
}


export function createTextSource(topicId, data) {
    return repository.createText(topicId, data);
}


export function updateSource(sourceId, data) {
    return repository.update(sourceId, data);
}


export function deleteSource(sourceId) {
    return repository.delete(sourceId);
}