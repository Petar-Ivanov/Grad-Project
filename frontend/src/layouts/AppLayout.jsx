import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar"; 

export default function AppLayout() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col transition-colors duration-200">
            <Navbar variant="app"/>
            <main className="flex-1 w-full mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
}