import {
    getMockCurrentUserId,
} from "../../../../../mock/auth";

import {
    loadMockMaterials,
    saveMockMaterials,
} from "../../../../../mock/storage";

import {
    mockMaterials,
} from "../../../../../mock/seeds/materials/materials";

import {
    getMockTopic,
    assertCanEditTopic,
} from "../../../services/mockTopicAuthorization";


function delay(ms = 200) {
    return new Promise((resolve) =>
        setTimeout(resolve, ms)
    );
}


function createError(message, status) {
    const error = new Error(message);

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


function getMaterialDatabase() {
    let database =
        loadMockMaterials();

    if (Object.keys(database).length === 0) {
        database = structuredClone(mockMaterials);

        saveMockMaterials(database);
    }

    return database;
}


function getNextMaterialId(database) {
    const ids =
        Object.keys(database).map(Number).filter(Number.isFinite);

    return ids.length > 0
        ? Math.max(...ids) + 1
        : 1;
}


function validateGenerationContext(data) {
    const topicId =
        Number(data?.topic_id);

    if (!topicId) {
        throw createError("topic_id is required.", 400);
    }

    const topic =
        getMockTopic(topicId);

    if (!topic) {
        throw createError("Topic not found.", 404);
    }

    assertCanEditTopic(topicId);

    if (!data?.parameters) {
        throw createError("Generation parameters are required.", 400);
    }

    return {
        topicId,
        topic,
    };
}


function validatePlan(plan) {
    if (typeof plan !== "string") {
        throw createError("Plan must be a string.", 400);
    }

    const trimmedPlan =
        plan.trim();

    if (!trimmedPlan) {
        throw createError("A material plan is required.", 400);
    }

    return trimmedPlan;
}


function buildMockPlan(data, topic) {
    const parameters =
        data.parameters;

    const title =
        parameters.title?.trim() || 
        "Generated Study Material";

    const format =
        parameters.format === "presentation"
            ? "presentation"
            : "studydoc";

    const sourceCount =
        Array.isArray(data.source_ids)
            ? data.source_ids.length
            : 0;

    const contextLines = [];

    if (parameters.use_personal_context) {
        contextLines.push(
            "6. Personalized learning guidance and adaptation"
        );
    }

    if (parameters.use_topic_description) {
        contextLines.push(
            "7. Topic-specific context and connections"
        );
    }

    const basePlan = [
        `1. Introduction to ${title}`,
        "2. Core Concepts & Definitions",
        "3. Detailed Explanation of the Main Mechanisms",
        "4. Examples, Applications & Connections",
        "5. Summary & Key Takeaways",
        ...contextLines,
    ];

    if (sourceCount > 0) {
        basePlan.splice(1, 0, `2. Source-Grounded Background & Context`);

        return basePlan.map((item, index) => {
            const number = index + 1;

            return item.replace(/^\d+\./, `${number}.`);
        }).join("\n");
    }

    return basePlan.join("\n");
}


function createGeneratedMaterial(data) {
    const userId =
        getCurrentUserId();

    const database =
        getMaterialDatabase();

    const nextId =
        getNextMaterialId(database);

    const now =
        new Date().toISOString();

    const type =
        data.parameters?.format === "presentation"
            ? "presentation"
            : "studydoc";

    const name =
        data.parameters?.title?.trim() || 
        "Generated Material";

    const template =
        Object.values(database).find((material) =>
            material.type === type
        )
        ??
        Object.values(database)[0];

    const content =
        structuredClone(
            template?.content_json ?? {
                title: name,
                description: "",
                blocks: [],
            }
        );

    content.title = name;

    content.description =
        `Mock-generated material for ${name}.`;

    const material = {
        id: nextId,

        topic_id:
            Number(data.topic_id),

        owner_id:
            userId,

        name,

        type,

        status:
            "completed",

        created_at:
            now,

        updated_at:
            now,

        content_json:
            content,

        generation_metadata: {
            source_ids:
                Array.isArray(data.source_ids)
                    ? [...data.source_ids]
                    : [],

            parameters:
                structuredClone(data.parameters),

            plan:
                data.plan,
        },
    };

    database[String(nextId)] = material;

    saveMockMaterials(database);

    return structuredClone(material);
}


/* POST /generation/plan */

export async function generateMockPlan(data) {
    await delay(2500);

    const { topic } =
        validateGenerationContext(data);

    return {
        plan:
            buildMockPlan(data, topic),
    };
}


/* POST /generation/material */

export async function buildMockMaterial(data) {
    await delay(5000);

    const { topicId } =
        validateGenerationContext(data);

    const plan =
        validatePlan(data?.plan);

    const payload = {
        ...data,

        topic_id:
            topicId,

        plan,
    };

    return createGeneratedMaterial(payload);
}