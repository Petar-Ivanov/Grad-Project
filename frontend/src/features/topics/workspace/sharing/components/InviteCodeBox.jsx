import { useState } from "react";
import { CheckIcon, FilesIcon, HideIcon, ResetIcon, ShowIcon } from "../../../../../components/icons/index";

// Invite Code Component
export default function InviteCodeBox({
    label,
    code,
    type,
    theme,
    onRegenerate,
    isRegenerating,
}) {
    const [revealed, setRevealed] = useState(false);
    const [copied, setCopied] = useState(false);

    const isThisRegenerating = isRegenerating === type;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code ?? "");

            setCopied(true);

            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy code:", error);
        }
    };

    return (
        <div className="space-y-1.5">

            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                {label}
            </label>

            <div className={`overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 ${theme?.ring ?? ""}`}>

                <div className="flex items-center">

                    {/* Reveal / Hide */}
                    <button
                        type="button"
                        onClick={() =>
                            setRevealed(
                                (value) => !value
                            )
                        }
                        className="flex h-10 w-10 shrink-0 items-center justify-center text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200"
                        title={revealed ? "Hide code" : "Reveal code"}
                    >
                        {revealed 
                        ? (
                            <HideIcon />
                        ) : (
                            <ShowIcon />
                        )}
                    </button>

                    {/* Code */}
                    <input
                        readOnly
                        type={revealed ? "text" : "password"}
                        value={code ?? ""}
                        className="h-10 w-full min-w-0 bg-transparent px-2 text-sm font-mono text-slate-800 outline-none dark:text-slate-200"
                    />

                    {/* Copy and Regenerate */}
                    <div className="flex shrink-0 items-center border-l border-slate-200 dark:border-slate-800">
                        <button
                            type="button"
                            onClick={handleCopy}
                            title="Copy code"
                            className={`flex h-10 w-10 items-center justify-center transition-colors dark:hover:bg-slate-800 ${
                                copied
                                    ? "text-green-500 dark:text-green-400"
                                    : "text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                            }`}
                        >
                            {copied ? <CheckIcon/> : <FilesIcon/>}
                        </button>

                        <button
                            type="button"
                            onClick={() => onRegenerate(type)}
                            disabled={isThisRegenerating}
                            title="Regenerate code"
                            className="flex h-10 w-10 items-center justify-center border-l border-slate-200 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                        >
                            {/* <RefreshIcon className={isThisRegenerating ? "animate-spin text-slate-600 dark:text-slate-300" : ""} /> */}
                            <ResetIcon 
                                className={`h-4 w-4 ${
                                isThisRegenerating 
                                ? "animate-spin text-slate-600 dark:text-slate-300" 
                                : "text-slate-400"
                                }`} 
                            />
                        </button>
                    </div>

                </div>

            </div>

        </div>
    );
}