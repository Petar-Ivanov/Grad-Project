export default function FieldWrapper({ label, errorMsg, children }) {
    return (
        <div className="relative pb-8 sm:pb-6">
            <label className="mb-1.5 block text-sm font-bold text-slate-900 dark:text-white">
                {label}
            </label>
            {children}
            <p 
                className={
                    `absolute bottom-0 sm:bottom-1 left-1 w-full pr-2 text-[11px] leading-tight font-semibold text-red-500 transition-opacity duration-200 
                    ${errorMsg ? 'opacity-100' : 'opacity-0'}`
                }
            >
                {errorMsg || "placeholder"}
            </p>
        </div>
    );
}