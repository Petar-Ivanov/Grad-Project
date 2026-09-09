import {
    loadMockUsers,
    saveMockUsers,
    clearMockSession,
} from "../../../mock/storage";

import {
    getMockCurrentUserId,
} from "../../../mock/auth";


function delay(ms = 250) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}


function getCurrentUserId() {
    const userId = getMockCurrentUserId();

    if (!userId) {
        const error =
            new Error("Not authenticated.");

        error.status = 401;

        throw error;
    }

    return userId;
}


function getCurrentUser() {
    const users = loadMockUsers();

    const userId = getCurrentUserId();

    const user = users[String(userId)];

    if (!user) {
        const error = new Error("User not found.");

        error.status = 404;

        throw error;
    }

    return {
        users,
        userId,
        user,
    };
}


function sanitizeUser(user) {
    if (!user) {
        return null;
    }

    const {
        password,
        ...safeUser
    } = user;

    return structuredClone(safeUser);
}


/* GET /users/me */

export async function getMockMyProfile() {
    await delay();

    const { user } = getCurrentUser();

    return sanitizeUser(user);
}


/* PATCH /users/me */

export async function updateMockMyProfile(data) {
    await delay(300);

    const {
        users,
        userId,
        user,
    } = getCurrentUser();

    const allowedFields = [
        "username",
        "email",
        "password",
        "birthday",
        "educationLevel",
        "learningStyle",
        "bio",
    ];


    const update = {};

    for (const field of allowedFields) {
        if (Object.prototype.hasOwnProperty.call(data, field)) {
            update[field] = data[field];
        }
    }


    // unique username
    if (update.username) {
        const username = update.username.trim().toLowerCase();

        const taken =
            Object.values(users).some((candidate) =>
                Number(candidate.id) !== Number(userId) &&
                candidate.username.trim().toLowerCase() === username
            );

        if (taken) {
            const error =
                new Error("This username is already taken.");

            error.status = 409;

            throw error;
        }
    }


    // unique email
    if (update.email) {
        const email = update.email.trim().toLowerCase();

        const taken =
            Object.values(users).some((candidate) =>
                Number(candidate.id) !== Number(userId) &&
                candidate.email.trim().toLowerCase() === email
            );

        if (taken) {
            const error =
                new Error("This email is already registered.");

            error.status = 409;

            throw error;
        }
    }


    const updatedUser = {
        ...user,
        ...update,

        id: user.id,

        created_at: user.created_at,

        updated_at:
            new Date().toISOString(),
    };


    users[String(userId)] = updatedUser;

    saveMockUsers(users);


    return sanitizeUser(updatedUser);
}


/* DELETE /users/me */

export async function deleteMockMyProfile() {
    await delay(400);

    const {
        users,
        userId,
    } = getCurrentUser();

    delete users[String(userId)];

    saveMockUsers(users);

    // logging out a deleted user
    clearMockSession();


    return null;
}