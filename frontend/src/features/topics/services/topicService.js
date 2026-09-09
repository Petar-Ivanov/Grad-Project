import {
    getTopics as getApiTopics,
    getTopic as getApiTopic,
    createTopic as createApiTopic,
    updateTopic as updateApiTopic,
    deleteTopic as deleteApiTopic,

    getMyTopicAccess as getApiMyTopicAccess,
    getTopicMembers as getApiTopicMembers,
    removeTopicMember as removeApiTopicMember,

    followTopic as followApiTopic,
    unfollowTopic as unfollowApiTopic,
    joinTopic as joinApiTopic,

    updateTopicMemberRole as updateApiTopicMemberRole,
    regenerateTopicInviteCode as regenerateApiTopicInviteCode,
} from "../../../api/endpoints/topics";


import {
    getMockTopics,
    getMockTopicById,
    createMockTopic,
    updateMockTopic,
    deleteMockTopic,

    getMockMyTopicAccess,
    getMockTopicMembers,
    removeMockTopicMember,

    followMockTopic,
    unfollowMockTopic,
    joinMockTopic,

    updateMockTopicMemberRole,
    regenerateMockTopicInviteCode,
} from "./mockTopicApi";


const USE_MOCK_API =
    import.meta.env.VITE_USE_MOCK_API === "true";


const repository =
    USE_MOCK_API
        ? {
            list: getMockTopics,
            get: getMockTopicById,
            create: createMockTopic,
            update: updateMockTopic,
            delete: deleteMockTopic,
            getMyAccess: getMockMyTopicAccess,
            getMembers: getMockTopicMembers,
            removeMember: removeMockTopicMember,
            follow: followMockTopic,
            unfollow: unfollowMockTopic,
            join: joinMockTopic,
            updateMemberRole: updateMockTopicMemberRole,
            regenerateInviteCode: regenerateMockTopicInviteCode,
        }
        : {
            list: getApiTopics,
            get: getApiTopic,
            create: createApiTopic,
            update: updateApiTopic,
            delete: deleteApiTopic,
            getMyAccess: getApiMyTopicAccess,
            getMembers: getApiTopicMembers,
            removeMember: removeApiTopicMember,
            follow: followApiTopic,
            unfollow: unfollowApiTopic,
            join: joinApiTopic,
            updateMemberRole: updateApiTopicMemberRole, 
            regenerateInviteCode: regenerateApiTopicInviteCode,
        };


export function getTopics() {
    return repository.list();
}

export function getTopic(topicId) {
    return repository.get(topicId);
}

export function createTopic(data) {
    return repository.create(data);
}

export function updateTopic(topicId, data) {
    return repository.update(topicId, data);
}

export function deleteTopic(topicId) {
    return repository.delete(topicId);
}

export function getMyTopicAccess(topicId) {
    return repository.getMyAccess(topicId);
}

export function getTopicMembers(topicId) {
    return repository.getMembers(topicId);
}

export function removeTopicMember(topicId, userId) {
    return repository.removeMember(topicId, userId);
}

export function followTopic(topicId) {
    return repository.follow(topicId);
}

export function unfollowTopic(topicId) {
    return repository.unfollow(topicId);
}

export function joinTopic(code) {
    return repository.join(code);
}

export function updateTopicMemberRole(topicId, userId, role) {
    return repository.updateMemberRole(topicId, userId, role);
}

export function regenerateTopicInviteCode(topicId, type) {
    return repository.regenerateInviteCode(topicId, type);
}