import { useEffect, useState } from "react";
import { EditorContent } from "@tiptap/react";

import {
    getActiveLinkUrl,
    applyLink,
} from "./textUtils";

import { LinkIcon } from "../../../../../components/icons/index.jsx";

export default function TextEditor({editor}) {
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState("");

    useEffect(() => {
        if (!editor) return;

        if (editor.isEditable) {
            setTimeout(() => {
                if (!editor.isDestroyed) {
                    try {
                        editor.commands.focus("end");
                    } catch (error) {
                        console.warn(
                            "Unable to focus text editor.",
                            error
                        );
                    }
                }
            }, 50);
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    const handleLinkToggle = () => {
        if (!showLinkInput) {
            setLinkUrl(getActiveLinkUrl(editor));
        }

        setShowLinkInput((previous) => !previous);
    };

    const handleApplyLink = () => {
        applyLink(editor, linkUrl);

        setShowLinkInput(false);
        setLinkUrl("");
    };

    const handleLinkKeyDown = (event) => {
        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();
        handleApplyLink();
    };

    const buttonClass = (active = false) => `
        px-2.5 py-1 rounded transition-colors
        ${
            active
                ? "bg-slate-300 text-slate-900 dark:bg-slate-700 dark:text-white"
                : "text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
        }
    `;

    return (
        <div className="flex flex-col border-b border-slate-100 bg-slate-50 dark:bg-slate-950 dark:border-slate-800">

            {/* Toolbar */}
            <div className="flex items-center gap-1 p-1.5 flex-wrap">

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleBold().run()
                    }
                    className={`${buttonClass(editor.isActive("bold"))} text-sm font-bold`}
                >
                    B
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleItalic().run()
                    }
                    className={`${buttonClass(editor.isActive("italic"))} text-sm italic`}
                >
                    I
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                    className={`${buttonClass(editor.isActive("underline"))} text-sm underline`}
                >
                    U
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleStrike().run()
                    }
                    className={`${buttonClass(editor.isActive("strike"))} text-sm line-through`}
                >
                    S
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleHighlight().run()
                    }
                    className={`
                        px-2 py-1 text-xs font-semibold rounded transition-colors
                        ${
                            editor.isActive("highlight")
                                ? "bg-yellow-300 text-slate-900"
                                : "text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
                        }
                    `}
                >
                    HL
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={`${buttonClass(editor.isActive("bulletList"))} text-sm`}
                >
                    • List
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className={`${buttonClass(editor.isActive("orderedList"))} text-sm`}
                >
                    1. List
                </button>

                <button
                    type="button"
                    onClick={handleLinkToggle}
                    className={`
                        flex items-center justify-center px-2.5 py-1 rounded transition-colors
                        ${
                            editor.isActive("link") ||
                            showLinkInput
                                ? "bg-slate-300 text-slate-900 dark:bg-slate-700 dark:text-white"
                                : "text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
                        }
                    `}
                    aria-label="Edit link"
                >
                    <LinkIcon className="h-4 w-4" />
                </button>
            </div>

            {/* Link input */}
            {showLinkInput && (
                <div className="flex items-center gap-2 p-2 bg-slate-100 border-t border-slate-200 dark:bg-slate-900 dark:border-slate-800">

                    <input
                        type="url"
                        placeholder="https://example.com"
                        value={linkUrl}
                        onChange={(event) =>
                            setLinkUrl(event.target.value)
                        }
                        onKeyDown={handleLinkKeyDown}
                        autoFocus
                        className="
                            flex-1 px-2 py-1 text-sm rounded
                            border border-slate-300 bg-white
                            text-slate-900
                            focus:outline-none focus:border-indigo-500
                            dark:bg-slate-950
                            dark:border-slate-700
                            dark:text-slate-100
                        "
                    />

                    <button
                        type="button"
                        onClick={handleApplyLink}
                        className="
                            px-3 py-1 bg-slate-800
                            text-white text-xs rounded
                            hover:bg-slate-700
                            dark:bg-slate-700
                            dark:hover:bg-slate-600
                        "
                    >
                        Apply
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setShowLinkInput(false);
                            setLinkUrl("");
                        }}
                        className="
                            px-3 py-1 text-slate-600
                            text-xs hover:text-slate-900
                            dark:text-slate-400
                            dark:hover:text-slate-100
                        "
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}