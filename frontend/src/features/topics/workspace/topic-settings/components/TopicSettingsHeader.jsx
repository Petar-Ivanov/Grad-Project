import { EditIcon } from "../../../../../components/icons";

export default function TopicSettingsHeader({ isEditing, isOwner, onEditClick }) {
    return (
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100 dark:border-slate-800/80">
            <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Topic Overview
                </h2>
            </div>
            
            {!isEditing && isOwner && (
                <button
                    onClick={onEditClick}
                    className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                >
                    <EditIcon className="h-4 w-4" />
                    Edit Topic
                </button>
            )}
        </div>
    );
}