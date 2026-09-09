import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookIcon, LightningIcon, LinkIcon, PlusIcon } from "../../../components/icons/index";
import { useTopics } from "../../topics/hooks/useTopics";

export default function QuickActions() {
    const navigate = useNavigate();

    const {
        joinTopic,
        isMutating,
        mutationError,
    } = useTopics();

    const [joinCode, setJoinCode] = useState("");
    const [joinError, setJoinError] = useState(null);
    //const [joinedTopic, setJoinedTopic] = useState(null);

    const isJoining = isMutating;

    const handleJoinTopic = async (e) => {
        e.preventDefault();

        const code = joinCode.trim();

        if (!code) {
            return;
        }

        try {
            setJoinError(null);
            //setJoinedTopic(null);

            const result = await joinTopic(code);

            //setJoinedTopic(result);
            setJoinCode("");

            navigate(`/topics/${result.topic.id}`);

        } catch (error) {
            console.error("Failed to join topic:", error);
            setJoinError(
                error.message || "Failed to join topic."
            );
        }
    };

    return (
        <section className="space-y-4">
            {/* Header Section */}
            <div>
                <div className="flex items-center gap-2.5 mb-1">
                    <LightningIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        Quick Actions
                    </h2>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Manage your workspaces or join a new one.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                
                {/* View Topics Card */}
                <button 
                    onClick={() => navigate('/topics')}
                    className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-900/10"
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors group-hover:bg-indigo-100 group-hover:text-indigo-600 dark:bg-slate-900 dark:text-slate-400 dark:group-hover:bg-indigo-900/50 dark:group-hover:text-indigo-400">
                        <BookIcon className="h-6 w-6" />
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                        View All Topics
                    </span>
                </button>

                {/* Create Topic Card */}
                <button 
                    onClick={() => navigate('/topics/new')}
                    className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-900/10"
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors group-hover:bg-indigo-100 group-hover:text-indigo-600 dark:bg-slate-900 dark:text-slate-400 dark:group-hover:bg-indigo-900/50 dark:group-hover:text-indigo-400">
                        <PlusIcon className="h-6 w-6" />
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                        Create New Topic
                    </span>
                </button>

                {/* Join Topic Card */}
                <div className="flex flex-col justify-center rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-400">
                            <LinkIcon className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-slate-700 dark:text-slate-300">
                            Join a Topic
                        </span>
                    </div>
                    
                    <form 
                        onSubmit={handleJoinTopic} 
                        className="flex gap-2"
                    >
                        <input
                            type="text"
                            placeholder="Enter Invite Code"
                            value={joinCode}
                            onChange={(e) => {
                                setJoinCode(e.target.value);
                                setJoinError(null);
                            }}
                            disabled={isJoining}
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-mono outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-950"
                        />
                        <button
                            type="submit"
                            disabled={!joinCode.trim() || isJoining}
                            className="flex shrink-0 items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-opacity hover:bg-indigo-500 disabled:opacity-50"
                        >
                            {
                                isJoining 
                                ? (
                                    <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) 
                                : "Join"
                            }
                        </button>
                    </form>

                    {joinError && (
                        <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">
                            {joinError}
                        </p>
                    )}

                    {mutationError && !joinError && (
                        <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">
                            {mutationError.message}
                        </p>
                    )}

                </div>

            </div>
        </section>
    );
}