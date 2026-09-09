const DEFAULT_LABELS = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
];

export const SHAPE_TYPES = {
    triangle: {
        label: "Triangle",
        parameters: [
            {
                key: "base",
                label: "Base",
                min: 1,
                max: 20,
                step: 0.1,
                default: 6,
            },
            {
                key: "height",
                label: "Height",
                min: 1,
                max: 20,
                step: 0.1,
                default: 4,
            },
        ],
    },

    square: {
        label: "Square",
        parameters: [
            {
                key: "side",
                label: "Side",
                min: 1,
                max: 20,
                step: 0.1,
                default: 5,
            },
        ],
    },

    rectangle: {
        label: "Rectangle",
        parameters: [
            {
                key: "width",
                label: "Width",
                min: 1,
                max: 20,
                step: 0.1,
                default: 7,
            },
            {
                key: "height",
                label: "Height",
                min: 1,
                max: 20,
                step: 0.1,
                default: 4,
            },
        ],
    },

    parallelogram: {
        label: "Parallelogram",
        parameters: [
            {
                key: "base",
                label: "Base",
                min: 1,
                max: 20,
                step: 0.1,
                default: 7,
            },
            {
                key: "side",
                label: "Side",
                min: 1,
                max: 20,
                step: 0.1,
                default: 4,
            },
            {
                key: "height",
                label: "Height",
                min: 1,
                max: 20,
                step: 0.1,
                default: 3,
            },
        ],
    },

    rhombus: {
        label: "Rhombus",
        parameters: [
            {
                key: "diagonalA",
                label: "Diagonal 1",
                min: 1,
                max: 20,
                step: 0.1,
                default: 6,
            },
            {
                key: "diagonalB",
                label: "Diagonal 2",
                min: 1,
                max: 20,
                step: 0.1,
                default: 4,
            },
        ],
    },

    trapezoid: {
        label: "Trapezoid",
        parameters: [
            {
                key: "baseA",
                label: "Base A",
                min: 1,
                max: 20,
                step: 0.1,
                default: 8,
            },
            {
                key: "baseB",
                label: "Base B",
                min: 1,
                max: 20,
                step: 0.1,
                default: 5,
            },
            {
                key: "height",
                label: "Height",
                min: 1,
                max: 20,
                step: 0.1,
                default: 4,
            },
        ],
    },

    kite: {
        label: "Kite",
        parameters: [
            {
                key: "diagonalA",
                label: "Diagonal 1",
                min: 1,
                max: 20,
                step: 0.1,
                default: 6,
            },
            {
                key: "diagonalB",
                label: "Diagonal 2",
                min: 1,
                max: 20,
                step: 0.1,
                default: 4,
            },
        ],
    },

    regularPolygon: {
        label: "Regular Polygon",
        parameters: [
            {
                key: "sides",
                label: "Number of Sides",
                min: 3,
                max: 12,
                step: 1,
                default: 6,
            },
            {
                key: "side",
                label: "Side Length",
                min: 1,
                max: 20,
                step: 0.1,
                default: 4,
            },
        ],
    },

    circle: {
        label: "Circle",
        parameters: [
            {
                key: "radius",
                label: "Radius",
                min: 1,
                max: 20,
                step: 0.1,
                default: 4,
            },
        ],
    },
};

export function normalizeShapeData(data = {}) {
    const shapeType =
        SHAPE_TYPES[data.shapeType]
            ? data.shapeType
            : "triangle";

    const definition = SHAPE_TYPES[shapeType];

    const parameters = {};

    definition.parameters.forEach((parameter) => {
        const value = Number(data.parameters?.[parameter.key]);

        parameters[parameter.key] =
            Number.isFinite(value)
                ? value
                : parameter.default;
    });

    return {
        shapeType,
        parameters,
        labels:
            Array.isArray(data.labels) && data.labels.length
                ? data.labels
                : DEFAULT_LABELS.slice(0, getPointCount(shapeType, parameters)),
        caption: data.caption ?? "",
    };
}

export function getPointCount(shapeType, parameters) {
    switch (shapeType) {
        case "triangle":
            return 3;

        case "square":
        case "rectangle":
        case "parallelogram":
        case "rhombus":
        case "trapezoid":
        case "kite":
            return 4;

        case "regularPolygon":
            return Math.max(3, Math.round(parameters.sides || 3));

        case "circle":
            return 1;

        default:
            return 3;
    }
}

// creating coordinated for mafs
export function createShapePoints(shapeType, parameters) {
    switch (shapeType) {
        case "triangle": {
            const base = Math.max(parameters.base, 0.1);
            const height = Math.max(parameters.height, 0.1);

            return [
                [-base / 2, 0],
                [base / 2, 0],
                [0, height],
            ];
        }

        case "square": {
            const side = Math.max(parameters.side, 0.1);
            const h = side / 2;

            return [
                [-h, -h],
                [h, -h],
                [h, h],
                [-h, h],
            ];
        }

        case "rectangle": {
            const width = Math.max(parameters.width, 0.1);
            const height = Math.max(parameters.height, 0.1);

            return [
                [-width / 2, -height / 2],
                [width / 2, -height / 2],
                [width / 2, height / 2],
                [-width / 2, height / 2],
            ];
        }

        case "parallelogram": {
            const base = Math.max(parameters.base, 0.1);
            const side = Math.max(parameters.side, 0.1);
            const height = Math.min(Math.max(parameters.height, 0.1), side);

            const horizontalOffset = Math.sqrt(
                Math.max(side ** 2 - height ** 2, 0)
            );

            return [
                [0, 0],
                [base, 0],
                [base + horizontalOffset, height],
                [horizontalOffset, height],
            ].map(([x, y]) => [
                x - (base + horizontalOffset) / 2,
                y - height / 2,
            ]);
        }

        case "rhombus": {
            const diagonalA = Math.max(parameters.diagonalA, 0.1);

            const diagonalB = Math.max(parameters.diagonalB, 0.1);

            return [
                [0, diagonalB / 2],
                [diagonalA / 2, 0],
                [0, -diagonalB / 2],
                [-diagonalA / 2, 0],
            ];
        }

        case "trapezoid": {
            const baseA = Math.max(parameters.baseA, 0.1);
            const baseB = Math.max(parameters.baseB, 0.1);
            const height = Math.max(parameters.height, 0.1);

            const offset = (baseA - baseB) / 2;

            return [
                [-baseA / 2, 0],
                [baseA / 2, 0],
                [baseB / 2, height],
                [-baseB / 2, height],
            ];
        }

        case "kite": {
            const diagonalA = Math.max(parameters.diagonalA, 0.1);

            const diagonalB = Math.max(parameters.diagonalB, 0.1);

            return [
                [0, diagonalB / 2],
                [diagonalA / 2, 0],
                [0, -diagonalB / 2],
                [-diagonalA / 2, 0],
            ];
        }

        case "regularPolygon": {
            const sides = Math.max(3, Math.round(parameters.sides || 3));

            const side = Math.max(parameters.side, 0.1);

            const radius = side / (2 * Math.sin(Math.PI / sides));

            return Array.from(
                { length: sides },
                (_, index) => {
                    const angle = Math.PI / 2 - (2 * Math.PI * index) / sides;

                    return [
                        radius * Math.cos(angle),
                        radius * Math.sin(angle),
                    ];
                }
            );
        }

        default:
            return [];
    }
}

export function getSideLengths(points) {
    if (!points || points.length < 2) {
        return [];
    }

    return points.map((point, index) => {
        const next = points[(index + 1) % points.length];

        const dx = next[0] - point[0];
        const dy = next[1] - point[1];

        return Math.sqrt(dx * dx + dy * dy);
    });
}

function midpoint(a, b) {
    return [
        (a[0] + b[0]) / 2,
        (a[1] + b[1]) / 2,
    ];
}

function distance(a, b) {
    return Math.sqrt(
        (b[0] - a[0]) ** 2 +
        (b[1] - a[1]) ** 2
    );
}

export function getLabelPositions(points) {
    if (!points?.length) {
        return [];
    }

    const center = points.reduce(
        (sum, point) => [
            sum[0] + point[0],
            sum[1] + point[1],
        ],
        [0, 0]
    ).map((value) => value / points.length);

    return points.map((point) => {
        const dx = point[0] - center[0];
        const dy = point[1] - center[1];

        const length = Math.sqrt(dx * dx + dy * dy) || 1;

        const offset = 0.3;

        return [
            point[0] + (dx / length) * offset,
            point[1] + (dy / length) * offset,
        ];
    });
}

export function getSideLabelPositions(points) {
    if (!points || points.length < 2) {
        return [];
    }

    const center = points.reduce(
        (sum, point) => [
            sum[0] + point[0],
            sum[1] + point[1],
        ],
        [0, 0]
    ).map((value) => value / points.length);

    return points.map((point, index) => {
        const next = points[(index + 1) % points.length];

        const middle = midpoint(point, next);

        const dx = next[0] - point[0];
        const dy = next[1] - point[1];

        const length = Math.sqrt(dx * dx + dy * dy) || 1;

        // perpendicular vector
        let normal = [
            -dy / length,
            dx / length,
        ];

        // label outside polygon
        const toCenter = [
            center[0] - middle[0],
            center[1] - middle[1],
        ];

        if (normal[0] * toCenter[0] + normal[1] * toCenter[1] > 0) {
            normal = [-normal[0], -normal[1]];
        }

        const offset = 0.22;

        return [
            middle[0] + normal[0] * offset,
            middle[1] + normal[1] * offset,
        ];
    });
}

export function getViewBox(points, padding = 1.5) {
    if (!points?.length) {
        return {
            x: [-5, 5],
            y: [-5, 5],
        };
    }

    const xs = points.map((point) => point[0]);
    const ys = points.map((point) => point[1]);

    let minX = Math.min(...xs);
    let maxX = Math.max(...xs);
    let minY = Math.min(...ys);
    let maxY = Math.max(...ys);

    // no 0 sized boxes
    if (minX === maxX) {
        minX -= 1;
        maxX += 1;
    }

    if (minY === maxY) {
        minY -= 1;
        maxY += 1;
    }

    return {
        x: [
            minX - padding,
            maxX + padding,
        ],
        y: [
            minY - padding,
            maxY + padding,
        ],
    };
}

export function formatLength(value) {
    if (!Number.isFinite(value)) {
        return "";
    }

    return Number(value.toFixed(2)).toString();
}

export function getShapeParameters(shapeType) {
    return SHAPE_TYPES[shapeType]?.parameters ?? [];
}