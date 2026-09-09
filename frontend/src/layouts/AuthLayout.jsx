import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4 dark:bg-slate-900">
            <Outlet />
        </main>
    );
}