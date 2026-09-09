import { useState, useEffect, useMemo } from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";

import TextEditor from "./TextEditor";
import {
    getEditorData,
    hasTextContent,
} from "./textUtils";

import { highlightHTML } from "../../../utils/highlightHTML";

export default function EditableTextBlock({ data, isEditing, setIsEditing, onUpdate, onDelete, searchTerm = "" }) {
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState("");

    // initializing TipTap
    const editor = useEditor({
        extensions: [
            StarterKit, 
            Underline,
            Highlight.configure({ multicolor: true }),
            Link.configure({
                openOnClick: false, 
                HTMLAttributes: { class: 'text-indigo-600 underline dark:text-indigo-400' },
            }),
        ],
        content: data?.text ?? "",
        editable: isEditing,
        editorProps: {
            attributes: {
                class: 'focus:outline-none',
            },
        }
    });

    // synchronized with wrapper
    useEffect(() => {
        if (!editor) return;

        if (editor.isEditable !== isEditing) {
            editor.setEditable(isEditing);
        }

        if (!isEditing) {
            return;
        }

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
    }, [editor, isEditing]);

    const highlightedHtml = useMemo(() => {
        if (!editor || isEditing) {
            return "";
        }

        return highlightHTML(
            data?.text ?? "",
            searchTerm
        );
    }, [editor, data?.text, searchTerm, isEditing]);

    if (!editor) return null;

    // saving changes
    const handleSave = () => {
        const updatedData = getEditorData(editor, data);

        onUpdate?.(updatedData);
        setIsEditing(false);
    };


    // cancel changes / revert to original data
    const handleCancel = () => {
        editor.commands.setContent(data?.text ?? "", false);
        setIsEditing(false);
        setShowLinkInput(false);
    }

    const handleDelete = () => {
        onDelete?.();
    };

    if (!isEditing && !hasTextContent(data?.text)) {
        return null;
    }

    return(
        <div 
            className={`transition-all 
            ${
                isEditing 
                ? "rounded-lg border border-indigo-200 bg-white shadow-sm dark:border-indigo-900 dark:bg-slate-900 overflow-hidden" 
                : ""
            }`}
        >
            {/* Editing Toolbar */}
            {isEditing && (
                <TextEditor editor={editor} />
            )}

            {/* The Editor Area */}
            <div className={`text-slate-900 dark:text-slate-100 ${isEditing ? "p-4" : ""} 
                max-w-none outline-none
                /* Global Paragraph Spacing */
                [&_p]:m-0 [&_p]:leading-relaxed
                
                /* Bullet Lists */
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2 [&_ul]:space-y-1
                
                /* Numbered Lists */
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2 [&_ol]:space-y-1
                
                [&_li>p]:inline-block [&_li>p]:m-0 [&_li]:marker:text-slate-500`}
            >

                {
                isEditing 
                ? (
                    <EditorContent editor={editor} />
                ) 
                : (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: highlightedHtml,
                        }}
                    />
                )}


            </div> 

            {/* Block Actions */}
            {isEditing && (
                <div className="flex justify-end gap-2 p-2 mt-2 border-t border-slate-100 bg-slate-50 dark:bg-slate-900/50 dark:border-slate-800">
                    <button
                        onClick={handleDelete}
                        className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 rounded transition-colors"
                    >
                        Delete
                    </button>

                    <div className="flex-1"/>

                    <button
                        onClick={handleCancel}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded transition-colors"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded hover:bg-indigo-500 transition-colors shadow-sm"
                    >
                        Save
                    </button>
                </div>
            )}

        </div>
    );
}
