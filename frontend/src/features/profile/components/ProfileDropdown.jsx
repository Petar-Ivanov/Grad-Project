import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutIcon, ProfileIcon } from "../../../components/icons/index";
import { useAuth } from "../../auth/hooks/useAuth";


export default function ProfileDropdown({ variant = "navbar" }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const { 
        user, 
        logout, 
        isLoggingOut, 
        logoutError, 
    } = useAuth();

    // closing when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => { 
        try { 
            setIsOpen(false); 
            await logout(); 
            navigate("/login", { 
                replace: true, 
            }); 
        } catch (error) { 
            console.error( 
                "Logout failed:", 
                error 
            ); 
        } 
    };

    const positioningClasses = variant === "sidebar" 
        ? "left-full bottom-0 ml-3 origin-bottom-left"  
        : "right-0 top-full mt-2 origin-top-right";     

    const buttonClasses = 
        variant === "sidebar"
        ? `flex h-10 w-10 items-center justify-center rounded-xl transition-all 
            ${
                isOpen 
                ? "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200" 
                : "text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            }`
        : `p-2 rounded-lg transition-colors focus:outline-none 
            ${
                isOpen 
                ? "bg-slate-100 text-indigo-600 dark:bg-slate-900 dark:text-indigo-400" 
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-900"
            }`;

    return (
        <div 
            className="relative flex items-center justify-center" 
            ref={dropdownRef}
            onClick={(e) => e.stopPropagation()} 
        >
            {/* Trigger Button */}
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                className={buttonClasses}
                aria-label="User Menu"
                title={variant === "sidebar" ? "Profile" : undefined}
            >
                <ProfileIcon className={variant === "sidebar" ? "h-5 w-5" : "h-6 w-6"}/>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className={`absolute ${positioningClasses} w-56 rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950 animate-in fade-in zoom-in-95 duration-200 z-[60] overflow-hidden flex flex-col p-1.5`}>
                    
                    <div className="px-3 py-3 mb-1 border-b border-slate-100 dark:border-slate-800/80">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate"> 
                            {user?.username ?? "User"} 
                        </p> 
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate"> 
                            {user?.email ?? ""} 
                        </p>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(false);
                            navigate("/profile");
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900/60 dark:hover:text-white"
                        disabled={isLoggingOut}
                    >
                        <ProfileIcon/>
                        Account Settings
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleLogout();
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                    >
                        <LogoutIcon className="h-4 w-4 text-red-500 dark:text-red-400"/>
                        {isLoggingOut ? "Logging Out..." : "Log Out"}
                    </button>

                    {logoutError && ( 
                        <p className="px-3 py-2 text-xs font-medium text-red-500"> 
                            {logoutError.message} 
                        </p> 
                    )}

                </div>
            )}
        </div>
    );
}