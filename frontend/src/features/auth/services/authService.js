import {
    register as registerApi,
    login as loginApi,
    getCurrentUser as getCurrentUserApi,
    logout as logoutApi,
} from "../../../api/endpoints/auth";


import {
    registerMockUser,
    loginMockUser,
    getMockCurrentUser,
    logoutMockUser,
} from "./mockAuthApi";


const USE_MOCK_API =
    import.meta.env.VITE_USE_MOCK_API === "true";


const repository =
    USE_MOCK_API
        ? {
            register:
                registerMockUser,

            login:
                loginMockUser,

            currentUser:
                getMockCurrentUser,

            logout:
                logoutMockUser,
        }
        : {
            register:
                registerApi,

            login:
                loginApi,

            currentUser:
                getCurrentUserApi,

            logout:
                logoutApi,
        };


export function register(data) {
    return repository.register(data);
}


export function login(data) {
    return repository.login(data);
}


export function getCurrentUser() {
    return repository.currentUser();
}


export function logout() {
    return repository.logout();
}