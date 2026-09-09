import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar"; 
import Footer from "../components/ui/Footer";

export default function PublicLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
            <Navbar variant="public" />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}