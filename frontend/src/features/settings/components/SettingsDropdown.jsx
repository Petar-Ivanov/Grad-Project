import { useState, useRef, useEffect } from "react";
import { SettingsIcon, CheckIcon, GlobeIcon, ThemeIcon, SunIcon, MoonIcon, LanguageIcon } from "../../../components/icons/index";
import { useTheme } from "../../../context/ThemeContext";
import { CollapsibleSection } from "./CollapsibleSection";


export default function SettingsDropdown({ variant = "navbar" }) {
    const { theme, setTheme } = useTheme(); 
    const [isOpen, setIsOpen] = useState(false);
    const [expandedSection, setExpandedSection] = useState(null);
    const [language, setLanguage] = useState("English");
    const dropdownRef = useRef(null);

    const languages = ["English", "Spanish", "German", "French", "Bulgarian"];
    const themes = [
        { id: "light", label: "Light Mode", icon: SunIcon },
        { id: "dark", label: "Dark Mode", icon: MoonIcon },
        { id: "system", label: "System Default", icon: ThemeIcon }
    ];

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setTimeout(() => setExpandedSection(null), 200); 
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleToggleSection = (sectionName) => {
        setExpandedSection(prev => prev === sectionName ? null : sectionName);
    };

    const positioningClasses = variant === "sidebar" 
        ? "left-full bottom-0 ml-3 origin-bottom-left"
        : "right-0 top-full mt-2 origin-top-right"; 

    const buttonClasses = variant === "sidebar"
        ? `flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
            isOpen 
            ? "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200" 
            : "text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          }`
        : `p-2 rounded-lg transition-colors focus:outline-none ${
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
                aria-label="Settings Menu"
                title={variant === "sidebar" ? "Settings" : undefined}
            >
                <SettingsIcon className={variant === "sidebar" ? "h-5 w-5" : "h-6 w-6"}/>
            </button>

            {isOpen && (
                <div className={`absolute ${positioningClasses} w-72 rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950 animate-in fade-in zoom-in-95 duration-200 z-[60] overflow-hidden`}>
                    
                    <CollapsibleSection
                        title="Application Theme"
                        icon={ThemeIcon}
                        isExpanded={expandedSection === 'theme'}
                        onToggle={() => handleToggleSection('theme')}
                    >
                        {themes.map((t) => {
                            const IconComponent = t.icon;
                            return (
                                <button
                                    key={t.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setTheme(t.id);
                                    }}
                                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                        theme === t.id 
                                        ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400" 
                                        : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900/60"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <IconComponent className="h-4 w-4" />
                                        <span>{t.label}</span>
                                    </div>
                                    
                                    {theme === t.id && <CheckIcon className="h-4 w-4" />}
                                </button>
                            );
                        })}
                    </CollapsibleSection>

                    <CollapsibleSection
                        title="Output Language"
                        icon={LanguageIcon}
                        isExpanded={expandedSection === 'language'}
                        onToggle={() => handleToggleSection('language')}
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLanguage(lang);
                                }}
                                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                    language === lang 
                                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400" 
                                    : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900/60"
                                }`}
                            >
                                {lang}
                                {language === lang && <CheckIcon className="h-4 w-4" />}
                            </button>
                        ))}
                    </CollapsibleSection>

                </div>
            )}
        </div>
    );
}