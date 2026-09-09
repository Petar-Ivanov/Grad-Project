import { mockUsers } from "../../../mock/seeds/users/users.js";

import {
    loadMockUsers,
    saveMockUsers,

    loadMockSession,
    saveMockSession,
    clearMockSession,
} from "../../../mock/storage";


function delay(ms = 300) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function createInitialUsers() {
    const users = structuredClone(mockUsers);

    saveMockUsers(users);

    return users;
}

function getUserDatabase() {
    const users = loadMockUsers();

    if (Object.keys(users).length === 0) {
        return createInitialUsers();
    }

    return users;
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

function createAuthError(message, status) {
    const error = new Error(message);

    error.status = status;

    return error;
}


/* Register */

export async function registerMockUser(data) {
    await delay(500);

    const users = getUserDatabase();

    const email =
        data.email.trim().toLowerCase();

    const username =
        data.username.trim();

    const existingEmail =
        Object.values(users).find((user) => 
            user.email.toLowerCase() === email
        );

    if (existingEmail) {
        throw createAuthError(
            "This email is already registered.",
            409
        );
    }

    const existingUsername =
        Object.values(users).find((user) =>
            user.username.toLowerCase() === username.toLowerCase()
        );

    if (existingUsername) {
        throw createAuthError(
            "This username is already taken.",
            409
        );
    }

    const ids =
        Object.keys(users).map(Number).filter(Number.isFinite);

    const nextId =
        ids.length > 0
        ? Math.max(...ids) + 1
        : 1;

    const now =
        new Date().toISOString();

    const user = {
        id: nextId,

        username,

        email,

        password:
            data.password,

        birthday:
            data.birthday ?? "",

        educationLevel:
            data.educationLevel ?? "",

        learningStyle:
            data.learningStyle ?? "",

        bio:
            data.bio ?? "",

        created_at:
            now,

        updated_at:
            now,
    };


    users[String(nextId)] = user;

    saveMockUsers(users);


    // registration logs the user in
    saveMockSession({
        user_id: nextId,
        created_at: now,
    });


    return sanitizeUser(user);
}


/* Login */

export async function loginMockUser({email, password,}) {
    await delay(500);

    const users = getUserDatabase();

    const normalizedEmail =
        email.trim().toLowerCase();

    const user =
        Object.values(users).find((candidate) =>
            candidate.email.toLowerCase() === normalizedEmail
        );

    if (!user || user.password !== password) {
        throw createAuthError(
            "The email or password you entered is incorrect.",
            401
        );
    }

    saveMockSession({
        user_id: user.id,

        created_at: new Date().toISOString(),
    });


    return sanitizeUser(user);
}


/* Current user */

export async function getMockCurrentUser() {
    await delay(200);

    const session = loadMockSession();

    if (!session) {
        throw createAuthError(
            "Not authenticated.",
            401
        );
    }

    const users = getUserDatabase();

    const user =
        users[String(session.user_id)];

    if (!user) {
        clearMockSession();

        throw createAuthError(
            "Not authenticated.",
            401
        );
    }

    return sanitizeUser(user);
}


/* Logout */

export async function logoutMockUser() {
    await delay(200);

    clearMockSession();

    return null;
}