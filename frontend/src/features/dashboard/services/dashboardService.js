import { getContinueLearning as getApiContinueLearning } from "../../../api/endpoints/dashboard";
import { getMockContinueLearning } from "./mockDashboardApi";


const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === "true";

const repository = USE_MOCK_API
    ? {
        getContinueLearning:
            getMockContinueLearning,
    }
    : {
        getContinueLearning:
            getApiContinueLearning,
    };

export function getContinueLearning(limit = 6) {
    return repository.getContinueLearning(limit);
}