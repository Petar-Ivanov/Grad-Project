{/*
    categories:
    computer science & technology, mathematics, languages, literature, biology, physics, chemistry, astronomy, history, geography, 
    social science, arts & design, music & audio, film & media, engineering, economics, business & finance, sports, health & psychology, 
    philosophy & ethics, law & government, life & career skills
*/}

export const mockTopics = {
    1: {
        id: 1,

        owner_id: 1,

        name: "Cellular Respiration",

        description:
            "Biology study materials covering cellular respiration.",

        category: "biology",

        is_public: false,

        viewer_code: "CELL-VIEW-001",

        editor_code: "CELL-EDIT-001",

        created_at:
            "2026-08-11T14:00:00Z",

        updated_at:
            "2026-08-11T14:00:00Z",
    },

    2: {
        id: 2,

        owner_id: 1,

        name: "Introduction to Astrobiology",

        description:
            "Habitable zones, extremophile organisms, and the search for life.",

        category: "astronomy",

        is_public: true,

        viewer_code: "ASTRO-VIEW-001",

        editor_code: "ASTRO-EDIT-001",

        created_at:
            "2026-08-12T14:00:00Z",

        updated_at:
            "2026-08-20T14:00:00Z",
    },

    3: {
        id: 3,

        owner_id: 2,

        name: "Quantum Mechanics Fundamentals",

        description:
            "Wave equations, Hermitian operators, and matrix mechanics.",

        category: "physics",

        is_public: true,

        viewer_code: "QUANT-VIEW-001",

        editor_code: "QUANT-EDIT-001",

        created_at:
            "2026-08-10T14:00:00Z",

        updated_at:
            "2026-08-19T12:00:00Z",
    },

    4: {
        id: 4,

        owner_id: 2,

        name: "Private Physics Notes",

        description:
            "Private study material for advanced physics.",

        category: "physics",

        is_public: false,

        viewer_code: "PRIV-VIEW-001",

        editor_code: "PRIV-EDIT-001",

        created_at:
            "2026-08-09T14:00:00Z",

        updated_at:
            "2026-08-18T12:00:00Z",
    },

    5: {
        id: 5,

        owner_id: 3,

        name: "Computational Neuroscience",

        description:
            "Spiking neural models, synaptic weights, and learning dynamics.",

        category:
            "computer science & technology",

        is_public: false,

        viewer_code: "NEURO-VIEW-001",

        editor_code: "NEURO-EDIT-001",

        created_at:
            "2026-08-05T14:00:00Z",

        updated_at:
            "2026-08-17T12:00:00Z",
    },
};