import { MathFormulaIcon } from "../../../../../components/icons/index.jsx";

export default {
    type: "formula",
    label: "Formula",
    icon: MathFormulaIcon,

    createDefaultData() {
        return {
            formula: "x^2 + 2x + 1",
            displayMode: true,
            caption: "",
        };
    },

    loadComponent: () => import("./MathFormulaBlock.jsx"),
};