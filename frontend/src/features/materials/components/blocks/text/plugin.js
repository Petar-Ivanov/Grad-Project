import { TextIcon } from "../../../../../components/icons/index.jsx";
import { DEFAULT_TEXT_DATA } from "./textUtils";

export default {
    type: "text",
    label: "Text",
    icon: TextIcon,

    createDefaultData() {
        return {
            ...DEFAULT_TEXT_DATA,
        };
    },

    loadComponent: () =>
        import("./EditableTextBlock.jsx"),
};