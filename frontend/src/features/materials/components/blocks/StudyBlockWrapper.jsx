import React, { useState, useEffect } from "react";
import PrivateNote from "../PrivateNote";
import ConfirmModal from "../ConfirmModal";
import {getAllBlockLabelsData} from "./BlockRegistry";
import { SettingsIcon, HideIcon, PinIcon, CommentIcon, EditIcon, MoveIcon, PlusIcon, BinIcon, UpArrow, DownArrow } from "../../../../components/icons/index.jsx";
import { HiddenBlockUI } from "./HiddenBlock.jsx";
import { BlockActionMenu } from "./BlockActionMenu.jsx";


function useGlobalMenu(blockId, onMenuClose) {
    useEffect(() => {
        const handleGlobalMenu = (e) => {
            if (e.detail !== blockId) {
                onMenuClose();
            }
        };
        window.addEventListener('menu-opened', handleGlobalMenu);
        return () => window.removeEventListener('menu-opened', handleGlobalMenu);
    }, [blockId, onMenuClose]);
}

function useMobileIdle(delay = 3000) {
    const [isMobileIdle, setIsMobileIdle] = useState(false);

    useEffect(() => {
        if (window.matchMedia("(hover: hover)").matches) return;

        let timeoutId;
        const wakeUpUI = () => {
            setIsMobileIdle(false);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setIsMobileIdle(true), delay); 
        };

        wakeUpUI();
        window.addEventListener("scroll", wakeUpUI, { passive: true });
        window.addEventListener("touchstart", wakeUpUI, { passive: true });

        return () => {
            window.removeEventListener("scroll", wakeUpUI);
            window.removeEventListener("touchstart", wakeUpUI);
            clearTimeout(timeoutId);
        };
    }, [delay]);

    return isMobileIdle;
}

export default function StudyBlockWrapper({ 
    blockId, mode, children, canEdit, 
    onAddBlock, onMoveBlock, onDeleteBlock, 
    autoEditBlockId, onClearAutoEdit, 
    isPinned, isHidden, comment, 
    onTogglePin, onToggleBlockHidden, 
    onSaveComment, onHideComment, onShowComment, onDeleteComment 
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showNotes, setShowNotes] = useState(false);

    const isMobileIdle = useMobileIdle();

    // Custom hook manages global closing of menus
    useGlobalMenu(blockId, () => setIsMenuOpen(false));

    useEffect(() => {
        if (autoEditBlockId === blockId) {
            setIsEditing(true);
            onClearAutoEdit?.();
        }
    }, [autoEditBlockId, blockId, onClearAutoEdit]);

    useEffect(() => {
        if (!comment) {
            setShowNotes(false);
            return;
        }
        setShowNotes(!comment.is_hidden);
    }, [comment]);

    useEffect(() => {
        if (!canEdit) {
            setIsEditing(false);
            setIsMenuOpen(false);
        }
    }, [canEdit]);

    const handleMenuToggle = () => {
        const newState = !isMenuOpen;
        setIsMenuOpen(newState);
        if (newState) {
            window.dispatchEvent(new CustomEvent('menu-opened', { detail: blockId }));
        }
    };

    if (mode === "test") {
        return <div className="py-4">{children}</div>;
    }

    const pinnedStyles = isPinned
        ? "bg-amber-50/50 dark:bg-amber-900/10 border border-dotted border-yellow-600 dark:border-yellow-400 rounded-lg"
        : "border border-transparent rounded-lg";

    return (
        <>
            {isHidden && (
                <HiddenBlockUI 
                    isMenuOpen={isMenuOpen}
                    onMenuToggle={handleMenuToggle}
                    onExpand={() => {
                        onToggleBlockHidden?.(blockId);
                        setIsMenuOpen(false);
                    }}
                />
            )}

            <div className={isHidden ? "hidden" : "block"}>
                <div
                    id={blockId}
                    className={`
                        group relative my-2 py-3
                        transition-colors duration-300
                        ${pinnedStyles}
                    `}
                >

                    {/* Action Menu Container */}
                    <div className={`absolute right-full top-4 z-10 pr-2 sm:pr-3 
                        transition-all duration-500 delay-300 group-hover:delay-0
                        ${isMenuOpen 
                            ? 'opacity-100 visible' 
                            : `[@media(hover:hover)]:opacity-0 [@media(hover:hover)]:invisible group-hover:opacity-100 group-hover:visible ${isMobileIdle ? '[@media(hover:none)]:opacity-0 [@media(hover:none)]:invisible' : '[@media(hover:none)]:opacity-100 [@media(hover:none)]:visible'}`}
                    `}>
                        <div className="relative">
                            <button
                                onClick={handleMenuToggle} 
                                className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${isMenuOpen ? 'text-slate-800 dark:text-slate-200' : 'text-slate-500 hover:text-slate-400 dark:text-slate-400 dark:hover:text-slate-300'}`}
                            >
                                <SettingsIcon className="h-5 w-5"/>
                            </button>

                            <BlockActionMenu 
                                isOpen={isMenuOpen}
                                onToggle={handleMenuToggle}
                                canEdit={canEdit}
                                isPinned={isPinned}
                                isEditing={isEditing}
                                showNotes={showNotes}
                                onTogglePin={() => { onTogglePin?.(blockId); setIsMenuOpen(false); }}
                                onShowComment={async () => {
                                    setIsMenuOpen(false);
                                    if (comment) await onShowComment?.(comment.id);
                                    setShowNotes(true);
                                }}
                                onToggleHidden={() => { onToggleBlockHidden?.(blockId); setIsMenuOpen(false); }}
                                onToggleEdit={() => { setIsEditing(!isEditing); setIsMenuOpen(false); }}
                                onDeleteRequest={() => { setShowDeleteConfirm(true); setIsMenuOpen(false); }}
                                onMove={(dir) => { onMoveBlock?.(blockId, dir); setIsMenuOpen(false); }}
                                onAdd={(type, pos) => { onAddBlock?.(type, pos, blockId); setIsMenuOpen(false); }}
                            />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="relative">
                        {React.cloneElement(children, { 
                            isEditing, 
                            setIsEditing,
                            onDelete: () => setShowDeleteConfirm(true) 
                        })}
                    </div>

                    {/* Collapsed Comment Indicator */}
                    {comment && !showNotes && (
                        <div className="mt-2 ml-2 pl-4">
                            <button
                                onClick={async () => {
                                    await onShowComment?.(comment.id);
                                    setShowNotes(true);
                                }}
                                className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-medium text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded transition-colors"
                            >
                                <CommentIcon className="h-3.5 w-3.5"/>
                                Private comment attached - Click to view
                            </button>
                        </div>
                    )}

                    {/* Expanded Comment Section */}
                    {showNotes && (
                        <PrivateNote
                            initialData={comment?.content_json ?? null}
                            comment={comment}
                            onSave={async (newJson) => {
                                await onSaveComment?.({ commentId: comment?.id ?? null, blockId, content_json: newJson });
                                setShowNotes(true);
                            }}
                            onDelete={async () => {
                                if (comment) await onDeleteComment?.(comment.id);
                                setShowNotes(false);
                            }}
                            onCancel={() => setShowNotes(false)}
                            onHide={async () => {
                                if (comment) await onHideComment?.(comment.id);
                                setShowNotes(false);
                            }}
                        />
                    )}
                </div>
            </div>

            <ConfirmModal 
                isOpen={showDeleteConfirm}
                title="Delete Block"
                message="Are you sure you want to delete this content block? This action cannot be undone."
                onConfirm={() => {
                    onDeleteBlock?.(blockId);
                    setShowDeleteConfirm(false);
                }}
                onCancel={() => setShowDeleteConfirm(false)}
            />
        </>
    );

}
