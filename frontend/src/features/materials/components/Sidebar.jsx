import {useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationTab from "./tabs/NavigationTab";
import { GoBackIcon, CompassIcon, SettingsIcon, ProfileIcon, XIcon, DashboardIcon } from "../../../components/icons/index.jsx";
import SettingsDropdown from "../../settings/components/SettingsDropdown.jsx";
import ProfileDropdown from "../../profile/components/ProfileDropdown.jsx";

const TAB_TITLES = {
    navigation: "Navigation"
};

export default function Sidebar({ isOpen, onOpen, onClose, headings, onSearch, activeId }) {
    const [activeTab, setActiveTab] = useState("navigation");
    const navigate = useNavigate();

    // expanding / collapsing sidebar on click
    const handleStripClick = () => {
        if (isOpen) onClose();
        else onOpen();
    };

    // handling clicking a specific tab icon
    const handleTabClick = (e, tabId) => {
        e.stopPropagation(); 
        if (activeTab === tabId) {
            if (isOpen) onClose();
            else onOpen();
        } else {
            setActiveTab(tabId);
            if (!isOpen) onOpen();
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm md:hidden transition-opacity" 
                    onClick={onClose}
                />
            )}
        
            {/* Drawer Container */}
            <div 
                className={
                    `fixed inset-y-0 left-0 z-50 flex h-full bg-white shadow-2xl transition-all duration-300 ease-in-out border-r border-slate-200 dark:border-slate-800 dark:bg-slate-950
                    /* 
                        Mobile: Slide off screen when closed. 
                        Desktop: Shrink when closed 
                    */
                    ${isOpen ? "translate-x-0 w-[85vw] max-w-sm sm:w-96" : "-translate-x-full md:translate-x-0 md:w-16"}
                `}
            >
                {/* Collapsed Strip */}
                <div 
                    className={`flex h-full w-16 shrink-0 flex-col items-center border-r border-slate-100 bg-slate-50 py-4 dark:border-slate-900 dark:bg-slate-950/50 
                        ${
                            !isOpen 
                            ? 'cursor-pointer transition-colors' 
                            : ''
                        }
                    `}
                    onClick={() => !isOpen && onOpen()} // expanding if clicked
                    title={!isOpen ? "Expand Sidebar" : ""}
                >
                    {/* Top Aligned Section */}
                    <div className="flex w-full flex-col items-center">
                        {/* Back Page Button */}
                        <div className="mb-4 flex w-full justify-center pb-4 border-b border-slate-200 dark:border-slate-800">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(-1); 
                                }}
                                className="group relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-all"
                                title="Go Back"
                            >
                                <GoBackIcon className="w-5 h-5"/>
                            </button>
                        </div>

                        {/* Navigation Tab Button */}
                        <button
                            onClick={(e) => handleTabClick(e, "navigation")}
                            className={`group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all
                                ${
                                    activeTab === "navigation" && isOpen
                                    ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400"
                                    : "text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                                }
                            `}
                            title="Navigation"
                        >
                            <CompassIcon className="h-5 w-5"/>
                        </button>

                        {/* Other tabs */}
                        {/* ... */}
                    </div>

                    {/* Botton Aligned Section */}
                    <div className="flex w-full flex-col items-center gap-2 mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate("/dashboard");
                            }}
                            className="group relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-all"
                            title="Dashboard"
                        >
                            <DashboardIcon className="w-5 h-5"/>
                        </button>

                        {/* <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate("/settings");
                            }}
                            className="group relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-all"
                            title="Settings"
                        >
                            <SettingsIcon className="w-5 h-5"/>
                        </button> */}
                        <SettingsDropdown variant="sidebar"/>
                        <ProfileDropdown variant="sidebar"/>

                        {/* <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate("/profile");
                            }}
                            className="group relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-all"
                            title="Profile"
                        >
                            <ProfileIcon className="w-5 h-5"/>
                        </button> */}
                        
                    </div>
                    
                </div>

                {/* Expanded Content Area */}
                <div 
                    className={
                        `flex-1 flex flex-col overflow-hidden transition-opacity duration-300 
                        ${
                            isOpen 
                            ? "opacity-100" 
                            : "opacity-0"
                        }
                    `}
                >
                    {/* Global Sidebar Header */}
                    <div className="p-4 pl-5 border-b border-slate-100 dark:border-slate-900 flex items-center justify-between shrink-0 h-[4.5rem]">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                            {TAB_TITLES[activeTab]}
                        </h2>
                        <button 
                            onClick={onClose}
                            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition-colors"
                            aria-label="Close sidebar"
                        >
                            <XIcon className="w-5 h-5"/>
                        </button>
                    </div>
                    
                    {/* Active Tab */}
                    <div className="flex-1 overflow-hidden">
                        {activeTab === "navigation" && (
                            <NavigationTab 
                                onClose={onClose}
                                headings={headings}
                                onSearch={onSearch}
                                activeId={activeId}
                            />
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}
