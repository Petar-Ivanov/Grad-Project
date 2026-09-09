
export default function FeaturesOverview() {
  const features = [
    { title: "AI Study Docs", desc: "Structured, hyper-focused summaries directly mapped from your source text parameters.", icon: "📝" },
    { title: "Dynamic Testing Engine", desc: "Test your factual recall with contextual mock examinations generated from raw documents.", icon: "🧪" },
    { title: "Concept Flashcards", desc: "Review customized flashcards structured by difficulty levels to target knowledge gaps.", icon: "⚡" },
    { title: "Interactive Knowledge Map", desc: "Visual study track representing your learning path. No more reading blind.", icon: "🗺️" },
  ];
  
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Everything you need to master your topics
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 dark:text-slate-400">
          NotebookAI isn't just another generative assistant. It is a personalized workspace built to map, optimize, and evaluate your understanding.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-5xl sm:mt-20 lg:mt-24">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feat, index) => (
            <div key={index} className="relative flex flex-col items-center text-center p-6 rounded-xl border border-slate-100 bg-slate-50/20 dark:border-slate-800 dark:bg-slate-950/20">
              <dt className="text-3xl mb-4">
                {feat.icon}
              </dt>
              <dd className="mt-2">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {feat.title}
                </p>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>

    </section>
  );
}