// checking for meaningful content
export function hasTextContent(html) {
    if (!html) return false;

    const text = html
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim();

    return text.length > 0;
}

// get link from editor
export function getActiveLinkUrl(editor) {
    if (!editor) return "";

    return editor.getAttributes("link")?.href || "";
}

// apply or remove link
export function applyLink(editor, url) {
    if (!editor) return;

    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .unsetLink()
            .run();

        return;
    }

    editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({
            href: trimmedUrl,
        })
        .run();
}

// return html to be persisted
export function getEditorData(editor, currentData) {
    if (!editor) {
        return currentData;
    }

    return {
        ...currentData,
        text: editor.getHTML(),
    };
}

export const DEFAULT_TEXT_DATA = {
    text: "<p>This is a new text block. Click the edit icon to change this content.</p>",
};
