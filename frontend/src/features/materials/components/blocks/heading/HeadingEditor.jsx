import { useState, useEffect } from "react";
import TextEditor from "../text/TextEditor";
import {
    HEADING_LEVELS,
    normalizeHeadingLevel,
} from "./headingUtils";

export default function HeadingEditor({editor, level, setLevel}) {
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState("");

    useEffect(() => {
        if (!editor) return;

        if (!showLinkInput) {
            setLinkUrl("");
        }
    }, [editor, showLinkInput]);

    const handleLevelChange = (event) => {
        const nextLevel = normalizeHeadingLevel(event.target.value);

        setLevel(nextLevel);
    };

    const handleLinkToggle = () => {
        if (!showLinkInput) {
            const previousUrl = editor.getAttributes("link").href;

            setLinkUrl(previousUrl || "");
        }

        setShowLinkInput((current) => !current);
    };

    const applyLink = () => {
        const trimmedUrl = linkUrl.trim();

        if (trimmedUrl === "") {
            editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .unsetLink()
                .run();
        } else {
            editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: trimmedUrl })
                .run();
        }

        setShowLinkInput(false);
        setLinkUrl("");
    };

    const handleLinkKeyDown = (event) => {
        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();
        applyLink();
    };

    return (
        <div className="flex flex-col border-b border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">

            {/* Heading-specific controls */}
            <div className="flex items-center gap-2 p-1.5">
                <select
                    value={level}
                    onChange={handleLevelChange}
                    className="
                        px-2 py-1
                        text-sm
                        bg-white
                        border border-slate-300
                        rounded
                        focus:outline-none
                        focus:border-indigo-500
                        dark:bg-slate-900
                        dark:border-slate-700
                        dark:text-white
                    "
                    aria-label="Heading level"
                >
                    {Object.entries(HEADING_LEVELS).map(
                        ([value, label]) => (
                            <option
                                key={value}
                                value={value}
                            >
                                {label}
                            </option>
                        )
                    )}
                </select>
            </div>

            {/* Generic rich-text editor */}
            <TextEditor
                editor={editor}
                showLinkInput={showLinkInput}
                linkUrl={linkUrl}
                onLinkToggle={handleLinkToggle}
                onLinkUrlChange={setLinkUrl}
                onApplyLink={applyLink}
                onLinkKeyDown={handleLinkKeyDown}
                onCancelLink={() => {
                    setShowLinkInput(false);
                    setLinkUrl("");
                }}
            />
        </div>
    );
}