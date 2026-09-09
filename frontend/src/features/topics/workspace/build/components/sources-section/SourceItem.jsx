import { BinIcon, DocIcon, EditIcon, LinkIcon, TextIcon } from "../../../../../../components/icons";
import { TYPE_CONFIG } from "../../config/sourceTypes"

export default function SourceItem({
    item,
    onToggleActive,
    onEdit,
    onDelete,
    theme,
    canEdit = false,
}) {
    const config = 
        TYPE_CONFIG[item.type] || TYPE_CONFIG.file;


    const formattedDate = item.updated_at
        ? new Date(item.updated_at).toLocaleDateString(
              "en-US",
              {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
              }
          )
        : "Unknown date";


    const Icon =
        config.icon;

    return (
        <div
            className={`
                group flex items-center justify-between rounded-lg border bg-white p-3 pr-4 shadow-sm transition-all dark:bg-slate-950 
                ${
                    item.isActive
                        ? "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
                        : "border-slate-100 opacity-60 grayscale-[20%] dark:border-slate-800/40"
                }
            `}
        >
            
            <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden sm:gap-3">
                {/* Checkbox */}
                <input
                    type="checkbox"
                    checked={Boolean(item.isActive)}
                    onChange={onToggleActive}
                    title={
                        item.isActive
                            ? "Exclude from generation"
                            : "Include in generation"
                    }
                    className={`ml-1.5 h-4 w-4 cursor-pointer rounded border-slate-300 bg-slate-50 transition-colors focus:ring-2 focus:ring-offset-1 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-offset-slate-950 ${theme?.checkbox ?? ""}`}
                />

                {/* Icon Badge */}
                <div className={`
                    flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border 
                    ${theme?.badgeBg ?? ""} ${theme?.iconText ?? ""}
                `}>
                    <Icon />
                </div>
                
                <div className="flex flex-col min-w-0 overflow-hidden pr-2">
                    <h5
                        className={`truncate text-sm font-semibold ${
                            item.isActive
                                ? "text-slate-900 dark:text-white"
                                : "text-slate-500 line-through decoration-slate-300 dark:text-slate-400 dark:decoration-slate-700"
                        }`}
                    >
                        {item.name}
                    </h5>

                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span>{config.label}</span>
                        <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                        <span>{formattedDate}</span>
                    </div>
                </div>
            </div>

            {/* Right: Actions */}
            {canEdit && (
                <div className="ml-4 flex shrink-0 items-center gap-1 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                    {canEdit && (
                        <button
                            type="button"
                            onClick={onEdit}
                            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Edit Source"
                        >
                            <EditIcon />
                        </button>
                    )}

                    <div className="mx-1 h-4 w-px bg-slate-200 dark:bg-slate-700" />

                    <button
                        type="button"
                        onClick={onDelete}
                        className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                        title="Delete Source"
                    >
                        <BinIcon />
                    </button>

                </div>
            )}
            
        </div>
    );
}