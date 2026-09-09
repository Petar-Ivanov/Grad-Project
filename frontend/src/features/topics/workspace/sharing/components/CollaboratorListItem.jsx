import { BinIcon, EditIcon, ShowIcon, UserOwnerIcon } from "../../../../../components/icons";

const ROLE_ICONS = {
    owner: UserOwnerIcon,
    editor: EditIcon,
    viewer: ShowIcon,
};

export default function CollaboratorListItem({
    member,
    onRoleChange,
    onRemoveRequest,
    theme,
    isUpdating,
}) {
    const isOwner = member.role === "owner";
    const username = member.user?.username ?? "Unknown User";
    const email = member.user?.email ?? "";

    const Icon = ROLE_ICONS[member.role];
    
    return (
        <div className="flex flex-col gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    {username.charAt(0).toUpperCase()}
                </div>

                <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {username}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        {email}
                    </p>
                </div>
            </div>

            {/* Role / actions */}
            <div className="ml-14 flex items-center gap-3 sm:ml-0">
                {isOwner ? (
                    <div className="flex h-9 items-center justify-center gap-2 rounded-lg bg-amber-50 px-3 text-sm font-bold text-amber-600 dark:bg-amber-900/20 dark:text-amber-500">
                        <Icon/>
                        Owner
                    </div>
                ) : (
                    <>
                        {/* Merged Icon & Dropdown Container */}
                        <div className={`flex overflow-hidden rounded-lg border border-slate-200 bg-slate-50 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:focus-within:bg-slate-950 dark:focus-within:ring-slate-700 ${theme?.ring ?? ""}`}>
                            
                            {/* Icon section */}
                            <div className="flex h-9 items-center justify-center bg-slate-100/50 pl-2.5 pr-2 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
                                <Icon/>
                            </div>

                            {/* Select section */}
                            <select
                                disabled={isUpdating}
                                value={member.role}
                                onChange={(e) => onRoleChange(member.user_id, e.target.value)}
                                className="h-9 cursor-pointer bg-transparent py-1 pl-1 pr-2 text-xs font-semibold text-slate-700 outline-none hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                            >
                                <option value="editor">Editor</option>
                                <option value="viewer">Viewer</option>
                            </select>
                        </div>

                        <button
                            type="button"
                            onClick={() => onRemoveRequest(member)}
                            disabled={isUpdating}
                            className="rounded-md p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-50 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                            title="Remove User"
                        >
                            <BinIcon />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}