import { useEffect, useMemo, useState } from "react";
import {useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";

import HeadingEditor from "./HeadingEditor";
import {
    getHeadingData,
    getHeadingEditorData,
    getHeadingStyle,
    normalizeHeadingLevel,
} from "./headingUtils";

import { highlightHTML } from "../../../utils/highlightHTML";


export default function HeadingBlock({ data, isEditing, setIsEditing, onUpdate, onDelete, searchTerm = "" }) {
    const normalizedData = useMemo(() => getHeadingData(data), [data]);

    const [level, setLevel] = useState(normalizedData.level || 2);

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
        content: normalizedData.text, 
        editable: isEditing,
        editorProps: {
            attributes: {
                class: 'focus:outline-none',
            },
        }
    });

    // synchronizing editor with block state
    useEffect(() => {
        if (!editor) return;

        if (editor.isEditable !== isEditing) {
            editor.setEditable(isEditing);
        }

        if (!isEditing) {
            return;
        }

        const timeout = setTimeout(() => {
            if (!editor.isDestroyed) {
                try {
                    editor.commands.focus("end");
                } catch (error) {
                    console.warn("Unable to focus heading editor.", error);
                }
            }
        }, 50);

        return () => clearTimeout(timeout);
    }, [editor, isEditing]);

    // synchronizing external data with editor when block is not being edited
    // useEffect(() => {
    //     if (!editor || isEditing) {
    //         return;
    //     }

    //     const incomingText = normalizedData.text;

    //     if (editor.getHTML() !== incomingText) {
    //         editor.commands.setContent(incomingText, false);
    //     }

    //     setLevel(normalizedData.level);
    // }, [
    //     editor,
    //     normalizedData.text,
    //     normalizedData.level,
    //     isEditing,
    // ]);

    // generating highlighted html on search
    const highlightedHtml = useMemo(() => {
        if (!editor || isEditing) {
            return "";
        }

        return highlightHTML(normalizedData.text, searchTerm);
    }, [
        editor,
        normalizedData.text,
        searchTerm,
        isEditing,
    ]);

    const handleSave = () => {
        if (!editor) return;

        const updatedData = getHeadingEditorData(editor, normalizedData, level);

        onUpdate?.(updatedData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        if (!editor) return;

        editor.commands.setContent(normalizedData.text, false);

        setLevel(
            normalizeHeadingLevel(normalizedData.level || 2)
        );

        setIsEditing(false);
    };

    const handleDelete = () => {
        onDelete?.();
    };

    if (!editor) return null;

    const currentLevel = 
        isEditing 
        ? level 
        : (normalizedData.level || 2);

    const headingStyle = getHeadingStyle(currentLevel);

    return(
        <div className={`transition-all 
            ${isEditing 
            ? "rounded-lg border border-indigo-200 bg-white shadow-sm dark:border-indigo-900 dark:bg-slate-900 overflow-hidden" 
            : ""}`}
        >
            {/* Editor toolbar */}
            {isEditing && (
                <HeadingEditor
                    editor={editor}
                    level={level}
                    setLevel={setLevel}
                />
            )}

            {/* The Editor Area */}
            <div className={`text-slate-900 dark:text-slate-100 ${isEditing ? "p-4" : ""} 
                max-w-none outline-none ${headingStyle}
                /* Global Paragraph Spacing */
                [&_p]:m-0 [&_p]:leading-relaxed
                
                /* Bullet Lists */
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2 [&_ul]:space-y-1
                
                /* Numbered Lists */
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2 [&_ol]:space-y-1
                
                [&_li>p]:inline-block [&_li>p]:m-0 [&_li]:marker:text-slate-500`}
            >

                {
                    isEditing ? (
                        <EditorContent editor={editor}/>
                    ) : (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: highlightedHtml,
                            }}
                        />
                    )
                }

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
