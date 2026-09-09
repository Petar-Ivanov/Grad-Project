export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 py-6 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8 text-sm text-slate-500 dark:text-slate-400">
        <p>© {new Date().getFullYear()} NotebookAI. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:underline hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:underline hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Terms of Service</a>
          <a href="#" className="hover:underline hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Documentation</a>
        </div>
      </div>
    </footer>
  );
}