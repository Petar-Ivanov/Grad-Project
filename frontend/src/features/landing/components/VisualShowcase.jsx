
export default function VisualShowcase() {
  return (
    <section id="showcase" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-950/30 shadow-xl">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
          
          {/* Simulated App Header UI */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">

            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
                N
              </span>
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                  Workspace Mockup
                </span>
                <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                  Introduction to Astrobiology
                </h3>
              </div>
            </div>

            <div className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-green-400"></span>
            </div>

          </div>

          {/* Core App Mechanics Simulated Preview */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

            {/* Upload Mockup */}
            <div className="rounded-lg border border-dashed border-slate-300 p-4 text-center dark:border-slate-700">
              <p className="text-2xl">
                📚
              </p>
              <h4 className="mt-2 text-xs font-bold text-slate-900 dark:text-white">
                Sources Analyzed
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Syllabus.pdf, Lecture_1.mp3, Website_Ref
              </p>
              <div className="mt-4 inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                Processed Successfully
              </div>
            </div>

            {/* Structured Concept Extraction */}
            <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Extracted Concept Tree
              </h4>
              <div className="mt-3 space-y-2 text-[11px]">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                  <span>🪐 Habitable Zone Dynamics</span>
                  <span className="font-bold text-indigo-600">95% Mastery</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                  <span>🧬 Extremophile Survival Criteria</span>
                  <span className="font-bold text-amber-500">42% Mastery</span>
                </div>
              </div>
            </div>

            {/* Generated Study Materials preview */}
            <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Generated Flashcard
                </h4>
                <p className="text-[11px] text-slate-500 mt-2 italic">
                  "What environment do anaerobic extremophiles thrive in?"
                </p>
              </div>
              <button disabled className="mt-4 w-full rounded bg-indigo-600 py-1 text-[10px] font-semibold text-white">
                Show Answer
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}