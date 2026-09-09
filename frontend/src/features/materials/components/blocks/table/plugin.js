import { TableIcon } from "../../../../../components/icons/index.jsx";

export default {
    type: "table",
    label: "Table",
    icon: TableIcon,

    createDefaultData() {
        return {
            columns: ["Column 1", "Column 2",],

            rows: [
                ["Value 1", "Value 2",],
                ["Value 3", "Value 4",],
            ],

            caption: "New Table Caption",
        };
    },

    loadComponent: () => import("./TableBlock.jsx"),
};