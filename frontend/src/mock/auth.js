import { loadMockSession } from "./storage";

export function getMockCurrentUserId() {
    const session = loadMockSession();

    if (!session?.user_id) {
        return null;
    }

    return Number(session.user_id);
}
