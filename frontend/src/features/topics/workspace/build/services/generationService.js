import {
    generatePlan as generateApiPlan,
    buildMaterial as buildApiMaterial,
} from "../../../../../api/endpoints/generation";

import {
    generateMockPlan,
    buildMockMaterial,
} from "./mockGenerationApi";


const USE_MOCK_API =
    import.meta.env.VITE_USE_MOCK_API === "true";

const repository =
    USE_MOCK_API
        ? {
            generatePlan:
                generateMockPlan,

            buildMaterial:
                buildMockMaterial,
        }
        : {
            generatePlan:
                generateApiPlan,

            buildMaterial:
                buildApiMaterial,
        };

export function generatePlan(data) {
    return repository.generatePlan(data);
}

export function buildMaterial(data) {
    return repository.buildMaterial(data);
}