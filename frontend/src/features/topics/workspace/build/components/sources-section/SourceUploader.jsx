import { EditIcon, LinkIcon, UploadIcon } from "../../../../../../components/icons";

export default function SourceUploader({ onFileSelect, onOpenLinkModal, onOpenTextModal, theme, disabled}) {

    return (
        <div className={`flex flex-col sm:flex-row gap-4 transition-opacity duration-300 ${disabled ? 'opacity-50 grayscale-[50%]' : ''}`}>
            
            {/* File Dropzone */}
            <div 
                className={
                    `group relative flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-6 text-center transition-all dark:border-slate-700 dark:bg-slate-900/20 
                    ${
                        disabled 
                        ? 'cursor-not-allowed' 
                        : `cursor-pointer ${theme.dropBorder} ${theme.dropBg}`
                    }
                `}
            >
                <input 
                    type="file" 
                    disabled={disabled}
                    className={`absolute inset-0 z-10 opacity-0 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    onChange={(e) => e.target.files[0] && onFileSelect(e.target.files[0])}
                />

                <UploadIcon className={`h-8 w-8 mb-3 text-slate-400 dark:text-slate-500 transition-colors ${theme.iconText} ${disabled ? '' : theme.iconText}`}/>

                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {disabled ? 'Source limit reached' : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    {disabled ? 'Remove a source to add more' : 'PDF, DOCX, TXT (Max 10MB)'}
                </p>
            </div>

            {/* Link and Text Input */}
            <div className="flex flex-col gap-3 sm:w-48 shrink-0">
                <button 
                    disabled={disabled}
                    onClick={onOpenLinkModal}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-600 shadow-sm hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900 transition-all"
                >
                    <LinkIcon/> 
                    Add Link
                </button>
                <button 
                    disabled={disabled}
                    onClick={onOpenTextModal}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-600 shadow-sm hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900 transition-all"
                >
                    <EditIcon/>
                    Write Text
                </button>
            </div>

        </div>
    );
}