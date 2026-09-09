import { HeadingIcon } from "../../../../../components/icons/index.jsx";
import { DEFAULT_HEADING_DATA } from "./headingUtils";

export default {
    type: "heading",
    label: "Heading",
    icon: HeadingIcon,

    createDefaultData() {
        return {
            ...DEFAULT_HEADING_DATA,
        };
    },

    loadComponent: () =>
        import("./HeadingBlock.jsx"),
};