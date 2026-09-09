import { ShapesIcon } from "../../../../../components/icons/index.jsx";

export default {
    type: "2d-shape",
    label: "2D Shape",
    icon: ShapesIcon,

    createDefaultData() {
        return {
            shapeType: "triangle",

            parameters: {
                base: 6,
                height: 4,
            },

            labels: ["A", "B", "C"],

            caption: "A triangle.",
        };
    },

    loadComponent: () => import("./2DShapeBlock.jsx"),
};