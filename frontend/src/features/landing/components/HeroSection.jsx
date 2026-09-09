import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 sm:pt-24 lg:pt-32">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-indigo-950/40 dark:text-indigo-400">
                Reimagining How We Learn
            </span>
            <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
                Turn your chaotic notes into <span className="text-indigo-600">structured knowledge</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500 dark:text-slate-400">
                Upload PDFs, articles, or lecture recordings. NotebookAI analyzes your materials, extracts core concepts, and maps out your personal learning journey—accompanied by custom guides, quizzes, and flashcards.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                    to="/register"
                    className="rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 hover:shadow-indigo-500/35 transition-all"
                >
                    Get Started for Free
                </Link>
                <a
                    href="#showcase"
                    className="text-sm font-semibold leading-6 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                >
                    See how it works <span aria-hidden="true">→</span>
                </a>
            </div>
        </div>
    </section>
  );
}