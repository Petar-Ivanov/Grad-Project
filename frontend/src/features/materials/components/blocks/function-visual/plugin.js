import { FunctionVisualIcon } from "../../../../../components/icons/index.jsx";

export default {
    type: "function-visual",
    label: "Function Visual",
    icon: FunctionVisualIcon,

    createDefaultData() {
        return {
            formula: "x^2",
            caption: "Graph of f(x) = x²",
            xMin: -5,
            xMax: 5,
            yMin: -2,
            yMax: 10,
        };
    },

    loadComponent: () =>
        import("./FunctionBlock.jsx"),
};