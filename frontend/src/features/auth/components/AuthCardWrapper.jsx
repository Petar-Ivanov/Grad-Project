
export default function AuthCardWrapper({ title, subtitle, stepInfo, children }) {
  return (
    <div className="w-full sm:w-[520px] max-w-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm dark:border-slate-800 dark:bg-slate-950 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white shadow-md shadow-indigo-500/20">
          N
        </span>
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">          
          {title}
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
        
        {/* Step Indicator */}
        {stepInfo && (
          <div className="mt-4 flex items-center gap-2">
            <div 
              className={`
                h-1.5 w-8 rounded-full 
                ${
                  stepInfo.current >= 1 
                  ? 'bg-indigo-600' 
                  : 'bg-slate-200 dark:bg-slate-800'
                }
              `} 
            />
            <div 
              className={`
                h-1.5 w-8 rounded-full transition-colors duration-300 
                ${
                  stepInfo.current >= 2 
                  ? 'bg-indigo-600' 
                  : 'bg-slate-200 dark:bg-slate-800'
                }
              `} 
            />
          </div>
        )}
      </div>

      {children}

    </div>
  );
}