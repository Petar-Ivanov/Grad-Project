import {
    getMockCurrentUserId,
} from "../../../../../mock/auth";

import {
    loadMockSources,
    saveMockSources,
} from "../../../../../mock/storage";

import {
    saveMockFile,
    deleteMockFile,
} from "../../../../../mock/fileStorage";

import {
    getMockTopic,
    getMockTopicPermission,
} from "../../../services/mockTopicAuthorization";

import {
    mockSources,
} from "../../../../../mock/seeds/sources/sources";


export const MAX_SOURCES = 7;

const MAX_FILE_SIZE = 10 * 1024 * 1024;


const ALLOWED_FILE_TYPES = {
    "application/pdf": "pdf",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",

    "text/plain": "txt",
};


function delay(ms = 200) {
    return new Promise((resolve) =>
        setTimeout(resolve, ms)
    );
}


function createError(message, status) {
    const error = 
        new Error(message);

    error.status = status;

    return error;
}


function getCurrentUserId() {
    const userId = 
        getMockCurrentUserId();

    if (!userId) {
        throw createError("Not authenticated.", 401);
    }

    return Number(userId);
}


function getSourceDatabase() {
    let sources = 
        loadMockSources();

    if (Object.keys(sources).length === 0) {
        sources = structuredClone(mockSources);

        saveMockSources(sources);
    }

    return sources;
}


function getNextSourceId(sources) {
    const ids =
        Object.keys(sources).map(Number).filter(Number.isFinite);

    return ids.length > 0
        ? Math.max(...ids) + 1
        : 1;
}


function assertCanManageSources(topicId) {
    const userId = 
        getCurrentUserId();

    const topic = 
        getMockTopic(topicId);

    if (!topic) {
        throw createError("Topic not found.", 404);
    }

    const permission =
        getMockTopicPermission(topicId, userId);

    if (permission !== "owner") {
        throw createError("You do not have permission to manage sources in this topic.", 403);
    }

    return userId;
}


function getTopicSources(topicId) {
    const sources = 
        getSourceDatabase();

    return Object.values(sources).filter((source) =>
            Number(source.topic_id) === Number(topicId)
    );
}


/* GET /topics/:topicId/sources */

export async function getMockTopicSources(topicId) {
    await delay();

    assertCanManageSources(topicId);

    return structuredClone(
        getTopicSources(topicId)
    );
}


/* POST file source */

export async function createMockFileSource(topicId, file) {
    await delay(300);

    const userId = 
        assertCanManageSources(topicId);

    if (!(file instanceof File)) {
        throw createError("A file is required.", 400);
    }

    if (!ALLOWED_FILE_TYPES[file.type]) {
        throw createError("Unsupported file type. Only PDF, DOCX, and TXT files are allowed.", 400);
    }

    if (file.size > MAX_FILE_SIZE) {
        throw createError("File exceeds the 10 MB size limit.", 400);
    }

    const sources = 
        getSourceDatabase();

    const topicSources = 
        getTopicSources(topicId);

    if (topicSources.length >= MAX_SOURCES) {
        throw createError(`A topic can have at most ${MAX_SOURCES} sources.`, 400);
    }

    const id = 
        getNextSourceId(sources);

    await saveMockFile(id, file);

    const now = 
        new Date().toISOString();

    const source = {
        id,

        topic_id:
            Number(topicId),

        owner_id:
            userId,

        type:
            "file",

        name:
            file.name,

        file: {
            original_name:
                file.name,

            mime_type:
                file.type,

            size:
                file.size,

            storage_id:
                String(id),
        },

        created_at:
            now,

        updated_at:
            now,
    };

    sources[String(id)] = source;

    saveMockSources(sources);

    return structuredClone(source);
}


/* POST link source */

export async function createMockLinkSource(topicId, data) {
    await delay(200);

    const userId = 
        assertCanManageSources(topicId);

    const name = 
        data?.name?.trim();

    const url =  
        data?.url?.trim();

    if (!name) {
        throw createError("Source name is required.", 400);
    }

    if (!url) {
        throw createError("Source URL is required.", 400);
    }

    try {
        new URL(url);
    } catch {
        throw createError("Source URL is invalid.", 400);
    }

    const sources = 
        getSourceDatabase();

    if (getTopicSources(topicId).length >= MAX_SOURCES) {
        throw createError(`A topic can have at most ${MAX_SOURCES} sources.`, 400);
    }

    const id = 
        getNextSourceId(sources);

    const now = 
        new Date().toISOString();

    const source = {
        id,

        topic_id:
            Number(topicId),

        owner_id:
            userId,

        type:
            "link",

        name,

        url,

        created_at:
            now,

        updated_at:
            now,
    };


    sources[String(id)] = source;

    saveMockSources(sources);

    return structuredClone(source);
}


/* POST free-text source */

export async function createMockTextSource(topicId, data) {
    await delay(200);

    const userId =
        assertCanManageSources(topicId);

    const name =
        data?.name?.trim();

    const content =
        data?.content?.trim();

    if (!name) {
        throw createError("Source name is required.", 400);
    }

    if (!content) {
        throw createError("Source content is required.",400);
    }

    const sources = 
        getSourceDatabase();

    if (getTopicSources(topicId).length >= MAX_SOURCES) {
        throw createError(`A topic can have at most ${MAX_SOURCES} sources.`, 400);
    }

    const id = 
        getNextSourceId(sources);

    const now = 
        new Date().toISOString();

    const source = {
        id,

        topic_id:
            Number(topicId),

        owner_id:
            userId,

        type:
            "text",

        name,

        content,

        created_at:
            now,

        updated_at:
            now,
    };


    sources[String(id)] = source;

    saveMockSources(sources);

    return structuredClone(source);
}


/* PATCH source */

export async function updateMockSource(sourceId, data) {
    await delay(200);

    const sources = 
        getSourceDatabase();

    const source = 
        sources[String(sourceId)];

    if (!source) {
        throw createError("Source not found.", 404 );
    }

    assertCanManageSources(source.topic_id);

    const allowedFields = [
        "name",
        "url",
        "content",
    ];

    const update = {};

    for (const field of allowedFields) {
        if (Object.prototype.hasOwnProperty.call(data, field)) {
            update[field] = structuredClone(data[field]); 
        }
    }

    if (Object.prototype.hasOwnProperty.call(update, "name")) {
        update.name = update.name.trim();

        if (!update.name) {
            throw createError("Source name is required.", 400);
        }
    }

    if (source.type === "link" && update.url !== undefined) {
        try {
            new URL(update.url.trim());
        } catch {
            throw createError("Source URL is invalid.", 400);
        }

        update.url = update.url.trim();
    }

    if (source.type === "text" && update.content !== undefined) {
        update.content = update.content.trim();

        if (!update.content) {
            throw createError("Source content is required.", 400);
        }
    }


    const updated = {
        ...source,

        ...update,

        id:
            source.id,

        topic_id:
            source.topic_id,

        owner_id:
            source.owner_id,

        type:
            source.type,

        created_at:
            source.created_at,

        updated_at:
            new Date().toISOString(),
    };

    sources[String(sourceId)] = updated;

    saveMockSources(sources);

    return structuredClone(updated);
}


/* DELETE source */

export async function deleteMockSource(sourceId) {
    await delay(200);

    const sources = 
        getSourceDatabase();

    const source =
        sources[String(sourceId)];

    if (!source) {
        throw createError(
            "Source not found.",
            404
        );
    }
    assertCanManageSources(source.topic_id);

    delete sources[String(sourceId)];

    saveMockSources(sources);

    if (source.type === "file") {
        await deleteMockFile(source.id);
    }

    return null;
}