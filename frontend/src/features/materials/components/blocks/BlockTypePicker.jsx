import { useEffect, useRef, useState } from "react";
import { getAllBlockLabelsData } from "./blockRegistry";

export default function BlockTypePicker({
    onSelect,
    disabled = false,
    className = "",
}) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const blockTypes = getAllBlockLabelsData();

    useEffect(() => {
        if (!isOpen) return;

        function handleClickOutside(event) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    function handleSelect(type) {
        setIsOpen(false);
        onSelect?.(type);
    }

    return (
        <div
            ref={containerRef}
            className={`relative w-full ${className}`}
        >
            {/* Document insertion surface */}
            <button
                type="button"
                disabled={disabled}
                onClick={() => setIsOpen((open) => !open)}
                className="
                    group
                    flex w-full items-center justify-center
                    rounded-xl
                    border border-dashed
                    border-slate-300
                    bg-transparent
                    px-6 py-5
                    text-sm font-medium
                    text-slate-400
                    transition-all duration-150
                    hover:border-slate-400
                    hover:bg-slate-50/70
                    hover:text-slate-600
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    dark:border-slate-700
                    dark:text-slate-500
                    dark:hover:border-slate-600
                    dark:hover:bg-slate-900/40
                    dark:hover:text-slate-300
                "
                aria-expanded={isOpen}
                aria-haspopup="menu"
            >
                <span
                    className="
                        flex items-center gap-2
                        transition-transform duration-150
                        group-hover:scale-[1.01]
                    "
                >
                    <span
                        className="
                            flex h-7 w-7 items-center justify-center
                            rounded-full
                            text-base
                            leading-none
                        "
                    >
                        +
                    </span>

                    <span>Add New</span>
                </span>
            </button>

            {isOpen && (
                <div
                    className="
                        absolute bottom-full left-1/2 z-50 mb-3
                        w-80
                        -translate-x-1/2
                        overflow-hidden
                        rounded-xl
                        border border-slate-200
                        bg-white
                        shadow-xl
                        ring-1 ring-black/5
                        dark:border-slate-700
                        dark:bg-slate-900
                        dark:ring-white/5
                    "
                    role="menu"
                >
                    <div
                        className="
                            border-b border-slate-100
                            px-3 py-2.5
                            dark:border-slate-800
                        "
                    >
                        <div
                            className="
                                text-xs font-semibold
                                uppercase tracking-wide
                                text-slate-400
                            "
                        >
                            Add a block
                        </div>
                    </div>

                    <div
                        className="
                            h-56
                            overflow-y-scroll
                            overscroll-contain
                            p-2
                        "
                    >
                        <div className="grid grid-cols-2 gap-1">
                            {blockTypes.map((block) => {
                                const Icon = block.Icon;

                                return (
                                    <button
                                        key={block.type}
                                        type="button"
                                        onClick={() => handleSelect(block.type)}
                                        className="
                                            flex min-w-0 items-center gap-2
                                            rounded-lg
                                            px-3 py-2.5
                                            text-left text-sm
                                            text-slate-700
                                            transition-colors
                                            hover:bg-slate-100
                                            dark:text-slate-200
                                            dark:hover:bg-slate-800
                                        "
                                        role="menuitem"
                                    >
                                        {Icon && (
                                            <Icon
                                                className="
                                                    h-4 w-4 shrink-0
                                                    text-slate-400
                                                    dark:text-slate-500
                                                "
                                            />
                                        )}

                                        <span className="truncate">
                                            {block.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}