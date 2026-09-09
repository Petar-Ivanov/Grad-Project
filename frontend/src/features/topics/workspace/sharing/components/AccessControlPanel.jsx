
import { GlobeIcon, LockIcon } from "../../../../../components/icons/index";
import InviteCodeBox from "./InviteCodeBox";


export default function AccessControlPanel({
    topic,
    theme,
    onVisibilityChange,
    onRegenerateCode,
    isUpdating = false,
    isRegenerating = false,
}) {
    // const [visibility, setVisibility] = useState("Private");

    // Theme extraction
    const themeBgActive = theme?.badgeBg || 'bg-indigo-50 dark:bg-indigo-900/30';
    const themeTextActive = theme?.iconText || 'text-indigo-600 dark:text-indigo-400';
    const themeBorderActive = theme?.ring?.split(' ')[0].replace('focus:', '') || 'border-indigo-500';

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">

            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">
                Access Settings
            </h3>


            <div className="space-y-6">

                {/* Visibility */}
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">
                        Topic Visibility
                    </label>

                    <div className="grid grid-cols-2 gap-3">

                        {
                            [
                                {
                                    label: "Private",
                                    value: false,
                                    icon: LockIcon,
                                },
                                {
                                    label: "Public",
                                    value: true,
                                    icon: GlobeIcon,
                                },
                            ].map((mode) => {
                                const isActive =
                                    topic.is_public === mode.value;

                                const Icon = mode.icon;

                                return (
                                    <button
                                        key={mode.label}
                                        type="button"
                                        disabled={isUpdating}
                                        onClick={() =>
                                            onVisibilityChange(mode.value)
                                        }
                                        className={`
                                            flex items-center justify-center gap-2 rounded-xl border p-3 text-sm font-bold transition-all disabled:opacity-50
                                            ${
                                                isActive
                                                    ? `${themeBorderActive} ${themeBgActive} ${themeTextActive} shadow-sm`
                                                    : "border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900"
                                            }
                                        `}
                                    >
                                        <Icon />
                                        {mode.label}
                                    </button>
                                );
                            })
                        }

                    </div>
                </div>


                <hr className="border-slate-100 dark:border-slate-800" />


                {/* Invite codes */}
                <div className="space-y-4">

                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Invite Codes
                    </label>

                    <p className="text-xs text-slate-500 dark:text-slate-400 pb-2 leading-relaxed">
                        Share these unique codes with users to grant them instant access to this workspace.
                    </p>

                    <InviteCodeBox
                        label="Editor Invite Code"
                        code={topic.editor_code}
                        type="editor"
                        theme={theme}
                        onRegenerate={onRegenerateCode}
                        isRegenerating={isRegenerating}
                    />

                    <InviteCodeBox
                        label="Viewer Invite Code"
                        code={topic.viewer_code}
                        type="viewer"
                        theme={theme}
                        onRegenerate={onRegenerateCode}
                        isRegenerating={isRegenerating}
                    />

                </div>

            </div>
        </section>
    );
}