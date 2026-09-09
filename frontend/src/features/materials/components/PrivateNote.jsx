import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import ConfirmModal from "./ConfirmModal";
import { NoteIcon, LinkIcon } from "../../../components/icons/index.jsx";

export default function PrivateNote({
    initialData,
    comment,

    onSave,
    onCancel,
    onDelete,
    onHide,
}) {
    const [isEditing, setIsEditing] = useState(!initialData);
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit, 
            Underline,
            Highlight.configure({ multicolor: true }),
            Link.configure({
                openOnClick: true, 
                HTMLAttributes: { class: 'text-indigo-600 underline dark:text-indigo-400' },
            })
        ],
        content: initialData || "",
        editable: isEditing,
        editorProps: {
            attributes: {
                class: 'focus:outline-none min-h-[60px]',
            },
        }
    });

    useEffect(() => {
        if (editor) {
            editor.setEditable(isEditing);
            if (isEditing) {
                editor.commands.focus('end');
            }
            else{
                setShowLinkInput(false);
            }
        }
    }, [isEditing, editor]);

    const handleSave = () => {
        const json = editor.getJSON();
        if (editor.getText().trim() === "") {
            onDelete();
        } else {
            onSave(json);
            setIsEditing(false);
            setShowLinkInput(false);
        }
    };

    const handleCancelClick = () => {
        if (!initialData) {
            onCancel(); 
        } else {
            editor.commands.setContent(initialData);
            setIsEditing(false);
            setShowLinkInput(false);
        }
    };

    const handleLinkToggle = () => {
        if (!showLinkInput) {
            const previousUrl = editor.getAttributes('link').href;
            setLinkUrl(previousUrl || "");
        }
        setShowLinkInput(!showLinkInput);
    };

    const applyLink = () => {
        if (linkUrl.trim() === "") {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
        } else {
            editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
        }
        setShowLinkInput(false);
        setLinkUrl("");
    };

    if (!editor) return null;

    return(
        <div className="mt-4 ml-2 border-l-2 border-indigo-300 pl-4 py-1">
            <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    <NoteIcon className="h-3.5 w-3.5"/>
                    Private Note
                </span>

                {/* Actions when NOT editing */}
                {!isEditing && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-[10px] uppercase font-bold text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                            Edit
                        </button>

                        <button 
                            onClick={onHide}
                            className="text-[10px] uppercase font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        >
                            Hide
                        </button>

                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="text-[10px] uppercase font-bold text-slate-400 hover:text-red-500 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            <div className={`transition-all rounded-md bg-indigo-50/50 dark:bg-indigo-950/20 border ${
                isEditing 
                ? "border-indigo-200 dark:border-indigo-800 shadow-sm bg-white dark:bg-slate-900" 
                : "border-indigo-100/50 dark:border-indigo-900/30"
            }`}>
                {/* Formatting Toolbar */}
                {isEditing && (
                    <div className="flex flex-col border-b border-indigo-100 bg-indigo-50/50 dark:bg-slate-950 dark:border-slate-800">
                        <div className="flex items-center gap-1 p-1.5 flex-wrap">
                            <button 
                                onClick={() => editor.chain().focus().toggleBold().run()} 
                                className={
                                    `px-2 py-1 text-xs font-bold rounded transition-colors 
                                    ${editor.isActive('bold') 
                                        ? 'bg-indigo-200 text-indigo-900 dark:bg-indigo-900 dark:text-white' 
                                        : 'text-slate-600 hover:bg-indigo-100 dark:text-slate-300 dark:hover:bg-slate-800'
                                    }
                                `}
                            >
                                B
                            </button>

                            <button 
                                onClick={() => editor.chain().focus().toggleItalic().run()} 
                                className={
                                    `px-2 py-1 text-xs italic rounded transition-colors 
                                    ${editor.isActive('italic') 
                                        ? 'bg-indigo-200 text-indigo-900 dark:bg-indigo-900 dark:text-white' 
                                        : 'text-slate-600 hover:bg-indigo-100 dark:text-slate-300 dark:hover:bg-slate-800'
                                    }
                                `}
                            >
                                I
                            </button>

                            <button 
                                onClick={() => editor.chain().focus().toggleUnderline().run()} 
                                className={
                                    `px-2 py-1 text-xs underline rounded transition-colors 
                                    ${editor.isActive('underline') 
                                        ? 'bg-indigo-200 text-indigo-900 dark:bg-indigo-900 dark:text-white' 
                                        : 'text-slate-600 hover:bg-indigo-100 dark:text-slate-300 dark:hover:bg-slate-800'
                                    }
                                `}
                            >
                                U
                            </button>
                            <button 
                                onClick={() => editor.chain().focus().toggleStrike().run()} 
                                className={
                                    `px-2 py-1 text-xs line-through rounded transition-colors 
                                    ${editor.isActive('strike') 
                                        ? 'bg-indigo-200 text-indigo-900 dark:bg-indigo-900 dark:text-white' 
                                        : 'text-slate-600 hover:bg-indigo-100 dark:text-slate-300 dark:hover:bg-slate-800'
                                    }
                                `}
                            >
                                S
                            </button>

                            <button 
                                onClick={() => editor.chain().focus().toggleHighlight().run()} 
                                className={
                                    `px-2 py-1 text-xs font-semibold rounded transition-colors 
                                    ${editor.isActive('highlight') 
                                        ? 'bg-yellow-300 text-slate-900' 
                                        : 'text-slate-600 hover:bg-indigo-100 dark:text-slate-300 dark:hover:bg-slate-800'
                                    }
                                `}
                            >
                                HL
                            </button>

                            <button 
                                onClick={() => editor.chain().focus().toggleBulletList().run()} 
                                className={
                                    `px-2 py-1 text-xs rounded transition-colors 
                                    ${editor.isActive('bulletList') 
                                        ? 'bg-indigo-200 text-indigo-900 dark:bg-indigo-900 dark:text-white' 
                                        : 'text-slate-600 hover:bg-indigo-100 dark:text-slate-300 dark:hover:bg-slate-800'
                                    }
                                `}
                            >
                                • List
                            </button>

                            <button 
                                onClick={() => editor.chain().focus().toggleOrderedList().run()} 
                                className={
                                    `px-2 py-1 text-xs rounded transition-colors 
                                    ${editor.isActive('orderedList') 
                                        ? 'bg-indigo-200 text-indigo-900 dark:bg-indigo-900 dark:text-white' 
                                        : 'text-slate-600 hover:bg-indigo-100 dark:text-slate-300 dark:hover:bg-slate-800'
                                    }
                                `}
                            >
                                1. List
                            </button>

                            <button 
                                onClick={handleLinkToggle} 
                                className={`flex items-center justify-center px-2 py-1 text-xs rounded transition-colors 
                                    ${
                                        editor.isActive('link') || showLinkInput 
                                        ? 'bg-indigo-200 text-indigo-900 dark:bg-indigo-900 dark:text-white' 
                                        : 'text-slate-600 hover:bg-indigo-100 dark:text-slate-300 dark:hover:bg-slate-800'
                                    }
                                `}
                                title="Link"
                            >
                                <LinkIcon className="h-3.5 w-3.5"/>
                            </button>
                        </div>

                        {showLinkInput && (
                            <div className="flex items-center gap-2 p-2 bg-slate-100/50 border-t border-indigo-100/50 dark:bg-slate-900 dark:border-slate-800">
                                <input 
                                    type="url" 
                                    placeholder="https://example.com" 
                                    value={linkUrl} 
                                    onChange={(e) => setLinkUrl(e.target.value)} 
                                    autoFocus 
                                    className="flex-1 px-2 py-1 text-xs rounded border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-indigo-500 dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100" 
                                />

                                <button 
                                    onClick={applyLink} 
                                    className="px-2 py-1 bg-slate-800 text-white text-xs rounded hover:bg-slate-700 transition-colors"
                                >
                                    Apply
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Editor Area */}
                <div className={`text-sm text-slate-800 dark:text-slate-200 
                    ${isEditing ? "p-3" : "p-3"} 
                    max-w-none outline-none

                    /* Global Paragraph Spacing */
                    [&_p]:m-0 [&_p]:leading-relaxed 

                    /* Bullet Lists */
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-1 [&_ul]:space-y-1 

                    /* Numbered Lists */
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-1 [&_ol]:space-y-1 

                    [&_li>p]:inline-block [&_li>p]:m-0`}
                >
                    <EditorContent editor={editor} />
                </div>

                {/* Footer Actions */}
                {isEditing && (
                    <div className="flex justify-end gap-2 p-2 border-t border-indigo-100 bg-indigo-50/30 dark:bg-slate-900/50 dark:border-slate-800">
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 rounded transition-colors"
                        >
                            Delete
                        </button>

                        <div className="flex-1" />

                        <button
                            onClick={handleCancelClick}
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

            {/* Note Deletion Modal */}
            <ConfirmModal 
                isOpen={showDeleteConfirm}
                title="Delete Note"
                message="Are you sure you want to delete this private note? This cannot be undone."
                onConfirm={() => {
                    onDelete();
                    setShowDeleteConfirm(false);
                }}
                onCancel={() => setShowDeleteConfirm(false)}
            />

        </div>
    );
}