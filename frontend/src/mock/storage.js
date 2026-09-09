const STORAGE_KEYS = {
    users: "pale-blue:mock-users",
    session: "pale-blue:mock-session",

    materials: "pale-blue:mock-materials",
    //materialVisits: "pale-blue:mock-material-visits",

    //personalState: "pale-blue:mock-material-personal-state",
    materialUserState: "pale-blue:mock-material-user-state",
    comments: "pale-blue:mock-private-comments",

    topics: "pale-blue:mock-topics",
    topicAccess: "pale-blue:mock-topic-access",
    topicUserState: "pale-blue:mock-topic-user-state",

    sources: "pale-blue:mock-sources",
};

const MOCK_DATABASE_VERSION = "1";


const SHOULD_PERSIST =
    import.meta.env.VITE_SHOULD_MOCK_PERSIST !== "false";


function readStorage(key, fallback) {
    if (!SHOULD_PERSIST) {
        return fallback;
    }

    try {
        const raw = localStorage.getItem(key);

        if (!raw) {
            return fallback;
        }

        const parsed = JSON.parse(raw);

        return parsed ?? fallback;
    } catch (error) {
        console.error(`Failed to read mock storage "${key}":`, error);

        return fallback;
    }
}


function writeStorage(key, value) {
    if (!SHOULD_PERSIST) {
        return;
    }

    localStorage.setItem(key, JSON.stringify(value));
}


/* Users */

export function loadMockUsers() {
    return readStorage(STORAGE_KEYS.users, {});
}

export function saveMockUsers(users) {
    writeStorage(STORAGE_KEYS.users, users);
}


/* Session */

export function loadMockSession() {
    return readStorage(STORAGE_KEYS.session, null);
}

export function saveMockSession(session) {
    writeStorage(STORAGE_KEYS.session, session);
}

export function clearMockSession() {
    if (!SHOULD_PERSIST) {
        return;
    }

    localStorage.removeItem(STORAGE_KEYS.session);
}


/* Materials */

export function loadMockMaterials() {
    return readStorage(STORAGE_KEYS.materials, {});
}

export function saveMockMaterials(materials) {
    writeStorage(STORAGE_KEYS.materials, materials);
}


/* Material User State */

export function loadMockMaterialUserState() {
    return readStorage(STORAGE_KEYS.materialUserState, {});
}

export function saveMockMaterialUserState(state) {
    writeStorage(STORAGE_KEYS.materialUserState, state);
}


/* Comments */

export function loadMockComments() {
    return readStorage(STORAGE_KEYS.comments, {});
}

export function saveMockComments(comments) {
    writeStorage(STORAGE_KEYS.comments, comments);
}


/* Topics */

export function loadMockTopics() {
    return readStorage(STORAGE_KEYS.topics, {});
}

export function saveMockTopics(topics) {
    writeStorage(STORAGE_KEYS.topics, topics);
}


/* Topic access */

export function loadMockTopicAccess() {
    return readStorage(STORAGE_KEYS.topicAccess, {});
}

export function saveMockTopicAccess(access) {
    writeStorage(STORAGE_KEYS.topicAccess, access);
}


/* Topic user state */

export function loadMockTopicUserState() {
    return readStorage(STORAGE_KEYS.topicUserState, {});
}

export function saveMockTopicUserState(state) {
    writeStorage(STORAGE_KEYS.topicUserState, state);
}

/* Sources */

export function loadMockSources() {
    return readStorage(STORAGE_KEYS.sources, {});
}

export function saveMockSources(sources) {
    writeStorage(STORAGE_KEYS.sources, sources);
}


/* Database reset */

export function resetMockDatabase() {
    Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
    });
}


/* Database inspection */

export function getMockDatabaseSnapshot() {
    return {
        version: MOCK_DATABASE_VERSION,

        users: loadMockUsers(),

        session: loadMockSession(),

        materials: loadMockMaterials(),

        materialUserState: loadMockMaterialUserState(),

        comments: loadMockComments(),

        topics: loadMockTopics(),

        topicAccess: loadMockTopicAccess(),

        topicUserState: loadMockTopicUserState(),

        sources: loadMockSources(),
    };
}


/* Development helpers */

if (import.meta.env.DEV) {
    window.__mockDB = {
        reset:
            resetMockDatabase,

        snapshot:
            getMockDatabaseSnapshot,

        clear:
            resetMockDatabase,
    };
}

//__mockDB.reset()

//__mockDB.snapshot()