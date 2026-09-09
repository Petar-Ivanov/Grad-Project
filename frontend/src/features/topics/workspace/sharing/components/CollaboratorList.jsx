import {
    useMemo,
    useState,
} from "react";
import RemoveCollaboratorModal from "./modals/RemoveCollaboratorModal";
import CollaboratorListItem from "./CollaboratorListItem";
import { EditIcon, ShowIcon, SocialIcon } from "../../../../../components/icons";
import { ROLE_FILTERS, ROLE_ICONS } from "../../../config/roleConfig";


export default function CollaboratorList({
    list,
    onRoleChange,
    onRemove,
    theme,
    isUpdating,
}) {
    const [userToRemove, setUserToRemove] = useState(null);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    const filteredMembers = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        return list.filter((member) => {
            const username = member.user?.username?.toLowerCase() ?? "";
            const email = member.user?.email?.toLowerCase() ?? "";

            const matchesSearch =
                !normalizedSearch ||
                username.includes(normalizedSearch) ||
                email.includes(normalizedSearch);

            const matchesRole =
                roleFilter === "all" || member.role === roleFilter;

            return matchesSearch && matchesRole;
        });
    }, [list, search, roleFilter]);

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-950">
            <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">
                Active Workspace Collaborators
            </h3>

            <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
                Manage access controls and viewing rights inside this topic.
            </p>

            {/* Search + Filter */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                        aria-hidden="true"
                    >
                        <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.8" />
                        <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search collaborators..."
                        className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-950"
                    />
                </div>

                <div className="flex shrink-0 rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-900">
                    {ROLE_FILTERS.map((filter) => {
                        const active = roleFilter === filter.value;
                        const Icon = ROLE_ICONS[filter.value];

                        return (
                            <button
                                key={filter.value}
                                type="button"
                                onClick={() => setRoleFilter(filter.value)}
                                className={`
                                    flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-colors 
                                    ${active
                                        ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                                    }`
                                }
                            >
                                <Icon className="h-4 w-4" />
                                {filter.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filteredMembers.length === 0 ? (
                    <div className="py-10 text-center text-sm text-slate-400">
                        No collaborators match your search.
                    </div>
                ) : (
                    filteredMembers.map((member) => (
                        <CollaboratorListItem
                            key={member.user_id}
                            member={member}
                            onRoleChange={onRoleChange}
                            onRemoveRequest={setUserToRemove}
                            theme={theme}
                            isUpdating={isUpdating}
                        />
                    ))
                )}
            </div>

            <RemoveCollaboratorModal
                isOpen={Boolean(userToRemove)}
                user={userToRemove?.user}
                onConfirm={() => {
                    if (!userToRemove) return;
                    onRemove(userToRemove.user_id);
                    setUserToRemove(null);
                }}
                onCancel={() => setUserToRemove(null)}
                theme={theme}
            />
        </section>
    );
}