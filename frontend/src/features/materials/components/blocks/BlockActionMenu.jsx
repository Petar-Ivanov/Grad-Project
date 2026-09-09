import React, { useState, useEffect } from "react";
import { PinIcon, CommentIcon, HideIcon, EditIcon, PlusIcon, MoveIcon, UpArrow, DownArrow, BinIcon
 } from "../../../../components/icons/index";
import {getAllBlockLabelsData} from "./BlockRegistry";

export function BlockActionMenu({
    isOpen,
    onToggle,
    canEdit,
    isPinned,
    isEditing,
    showNotes,
    onTogglePin,
    onShowComment,
    onToggleHidden,
    onToggleEdit,
    onDeleteRequest,
    onMove,
    onAdd
}) {
    const [addMenuMode, setAddMenuMode] = useState(false);
    const [addBlockPosition, setAddBlockPosition] = useState(null);
    const [moveMenuMode, setMoveMenuMode] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setAddMenuMode(false);
            setAddBlockPosition(null);
            setMoveMenuMode(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const baseBtn = "flex flex-col items-center justify-center gap-1 p-1.5 min-w-[56px] rounded-md text-xs transition-colors";
    const defaultBtn = "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white";
    const listItemBtn = "text-left px-2 py-1.5 rounded-md text-xs transition-colors flex items-center gap-2 " + defaultBtn;

    return (
        <div className="absolute left-10 top-0 flex flex-col gap-1 rounded-lg bg-white border border-slate-100 shadow-xl dark:border-none dark:bg-slate-800 dark:shadow-lg z-50 max-w-[calc(100vw-3rem)] p-1">
            {/* Primary Actions Row */}
            {!addMenuMode && !moveMenuMode && (
                <div className="flex flex-col">
                    {/* Private Actions */}
                    <div className="flex flex-col px-0.5 py-1">
                        <span className="px-1.5 mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            Private
                        </span>

                        <div className="flex gap-1">
                            <button 
                                onClick={onTogglePin} 
                                className={`${baseBtn} 
                                ${isPinned ? 'text-amber-500 bg-amber-50 dark:text-amber-400 dark:bg-slate-700/50' : defaultBtn}`}
                            >
                                <PinIcon className="h-4 w-4"/>
                                <span>Pin</span>
                            </button>

                            <button 
                                onClick={onShowComment} 
                                className={`${baseBtn} 
                                ${showNotes ? 'text-indigo-500 bg-indigo-50 dark:text-indigo-400 dark:bg-slate-700/50' : defaultBtn}`}
                            >
                                <CommentIcon className="h-4 w-4"/>
                                <span>Comment</span>
                            </button>

                            <button 
                                onClick={onToggleHidden} 
                                className={`${baseBtn} ${defaultBtn}`}
                            >
                                <HideIcon className="h-4 w-4"/>
                                <span>Hide</span>
                            </button>
                        </div>
                    </div>
                    
                    {canEdit && (
                        <>
                            <div className="h-px w-full bg-slate-100 dark:bg-slate-700/60 my-0.5" />
                            {/* Public Actions */}
                            <div className="flex flex-col px-0.5 py-1">
                                <span className="px-1.5 mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                    Public
                                </span>

                                <div className="flex gap-1">
                                    <button 
                                        onClick={onToggleEdit} 
                                        className={`${baseBtn} 
                                        ${isEditing ? 'text-indigo-500 bg-indigo-50 dark:text-indigo-400 dark:bg-slate-700/50' : defaultBtn}`}
                                    >
                                        <EditIcon className="h-4 w-4"/>
                                        <span>Edit</span>
                                    </button>

                                    <button 
                                        onClick={() => setMoveMenuMode(true)} 
                                        className={`${baseBtn} ${defaultBtn}`}
                                    >
                                        <MoveIcon className="h-4 w-4"/>
                                        <span>Move</span>
                                    </button>

                                    <button 
                                        onClick={() => setAddMenuMode(true)} 
                                        className={`${baseBtn} ${defaultBtn}`}
                                    >
                                        <PlusIcon className="h-4 w-4"/>
                                        <span>Add</span>
                                    </button>

                                    <button 
                                        onClick={onDeleteRequest} 
                                        className={`${baseBtn} text-slate-600 hover:bg-red-50 hover:text-red-600 dark:text-slate-300 dark:hover:bg-red-500/20 dark:hover:text-red-400`}
                                    >
                                        <BinIcon className="h-4 w-4"/>
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Move Block Menu */}
            {moveMenuMode && (
                <div className="flex flex-col gap-1 min-w-[120px]">
                    <div className="flex items-center border-b border-slate-100 dark:border-slate-700/60 pb-1.5 mb-1">
                        <button 
                            onClick={() => setMoveMenuMode(false)} 
                            className="p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors text-xs font-medium flex items-center gap-1"
                        >
                            ← Back
                        </button>
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <button 
                            onClick={() => onMove("up")} 
                            className={listItemBtn}
                        >
                            <UpArrow className="h-4 w-4"/> Move Up
                        </button>

                        <button 
                            onClick={() => onMove("down")} 
                            className={listItemBtn}
                        >
                            <DownArrow className="h-4 w-4"/> Move Down
                        </button>

                    </div>
                </div>
            )}
            
            {/* Add Position Menu */}
            {addMenuMode && !addBlockPosition && (
                <div className="flex flex-col gap-1 min-w-[150px]">
                    <div className="flex items-center border-b border-slate-100 dark:border-slate-700/60 pb-1.5 mb-1">
                        <button 
                            onClick={() => setAddMenuMode(false)} 
                            className="p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors text-xs font-medium flex items-center gap-1"
                        >
                            ← Back
                        </button>
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <button 
                            onClick={() => setAddBlockPosition("above")} 
                            className={listItemBtn}
                        >
                            <UpArrow className="h-4 w-4"/> Add Above
                        </button>

                        <button 
                            onClick={() => setAddBlockPosition("bellow")} 
                            className={listItemBtn}
                        >
                            <DownArrow className="h-4 w-4"/> Add Below
                        </button>
                    </div>
                </div>
            )}

            {/* Add Type Selection Menu */}
            {addMenuMode && addBlockPosition && (
                <div className="flex flex-col gap-1 min-w-[180px]">
                    <div className="flex items-center border-b border-slate-100 dark:border-slate-700/60 pb-1.5 mb-1">
                        <button 
                            onClick={() => setAddBlockPosition(null)} 
                            className="p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors text-xs font-medium flex items-center gap-1"
                        >
                            ← Back
                        </button>
                    </div>

                    <div className="flex flex-col gap-0.5 max-h-[250px] overflow-y-auto custom-scrollbar">
                        {getAllBlockLabelsData().map(({ type, label, Icon }) => (
                            <button 
                                key={type} 
                                onClick={() => onAdd(type, addBlockPosition)} className={listItemBtn}
                            >
                                {Icon && <Icon />}
                                <span>{label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}