import { CodeIcon } from "../../../../../components/icons/index.jsx";

export default {
    type: "code",
    label: "Code",
    icon: CodeIcon,

    createDefaultData() {
        return {
            language: "javascript",
            code: `
            function helloWorld() {
                console.log("Hello, world!");
            }
            `,
            caption: "A simple JavaScript example.",
        };
    },

    loadComponent: () => import("./CodeBlock.jsx"),
};