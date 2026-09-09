import Prism from "prismjs";

// built-in Prism.js languages
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp"; 

import "prismjs/components/prism-sql";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-powershell";

export const CODE_LANGUAGES = [
    {
        value: "javascript",
        label: "JavaScript",
    },
    {
        value: "typescript",
        label: "TypeScript",
    },
    {
        value: "python",
        label: "Python",
    },
    {
        value: "java",
        label: "Java",
    },
    {
        value: "csharp",
        label: "C#",
    },
    {
        value: "cpp",
        label: "C++",
    },
    {
        value: "c",
        label: "C",
    },
    {
        value: "markup",
        label: "HTML / XML",
    },
    {
        value: "css",
        label: "CSS",
    },
    {
        value: "json",
        label: "JSON",
    },
    {
        value: "sql",
        label: "SQL",
    },
    {
        value: "bash",
        label: "Bash",
    },
    {
        value: "powershell",
        label: "PowerShell",
    },
    {
        value: "none",
        label: "Plain Text",
    },
];

export function normalizeCodeData(data) {
    return {
        language: data?.language || "javascript",
        code: data?.code || "",
        caption:
            typeof data?.caption === "string"
                ? data.caption
                : "",
    };
}

export function highlightCode(code, language) {
    const source = code ?? "";
    const languageId = language || "none";

    const grammar = Prism.languages[languageId];

    // plain text or unsupported language
    if (!grammar) {
        return escapeHtml(source);
    }

    return Prism.highlight(source, grammar, languageId);
}

export function getLanguageLabel(language) {
    return (
        CODE_LANGUAGES.find((item) => 
            item.value === language
        )?.label || "Plain Text"
    );
}

export function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export function hasCodeContent(code) {
    return typeof code === "string" && code.trim().length > 0;
}