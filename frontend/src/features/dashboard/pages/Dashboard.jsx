import ContinueLearning from "../components/ContinueLearning";
import QuickActions from "../components/QuickActions";
import RecentTopics from "../components/RecentTopics";
import { useProfile } from "../../profile/hooks/userProfile";

export default function Dashboard() {
    const {
        profile,
        isLoading: isProfileLoading,
        error: profileError,
    } = useProfile();

    const userName = profile?.username || "there";

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 pb-32">
            
            {/* Greeting Header */}
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {
                        isProfileLoading
                        ? "Welcome back!"
                        : `Welcome back, ${userName}!`
                    }
                </h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Ready to master something new today?
                </p>

                {profileError && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                        Unable to load your profile.
                    </p>
                )}
            </div>

            <QuickActions />

            <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />

            {/* Trays */}
            <div className="space-y-12">
                <ContinueLearning/>
                <RecentTopics/>
            </div>

        </div>
    );
}