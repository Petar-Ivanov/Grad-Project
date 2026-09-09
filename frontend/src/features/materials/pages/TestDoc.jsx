import DocumentRenderer from "../components/DocumentRenderer";

// Mock JSON payload
const generatedTest = {
  title: "Quiz: Cellular Respiration",
  blocks: [
    { id: "q1", type: "question", data: { 
        type: "multiple-choice", 
        prompt: "How many net ATP are produced during glycolysis?", 
        options: ["2", "4", "32", "36"], 
        correctIndex: 0 
    }},
    { id: "q2", type: "question", data: { 
        type: "free-response", 
        prompt: "Explain why the investment phase is necessary." 
    }}
  ]
};

export default function TestDoc() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
        <div className="max-w-2xl mx-auto px-4">

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
            <header className="mb-8 pb-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-end">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                  Active Practice
                </span>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {generatedTest.title}
                </h1>
              </div>
              <div className="text-xs font-semibold text-slate-400">
                0 / 2 completed
              </div>
            </header>

            {/* Test utilizes the exact same Block Engine */}
            <DocumentRenderer blocks={generatedTest.blocks} mode="test"/>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors">
                Submit Answers & Grade
              </button>
            </div>
          </div>

        </div>
    </div>
  );
}