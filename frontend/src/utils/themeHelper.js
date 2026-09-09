import { CATEGORY_THEMES } from "../features/topics/config/topicThemes";

export const getThemeExtractedClasses = (baseColor) => {
    
    // class maps
    const colors = {
        cyan: { 
            ring: "focus:border-cyan-500 focus:ring-cyan-500", 
            dropBg: "hover:bg-cyan-50/30 dark:hover:bg-cyan-500/10", 
            dropBorder: "hover:border-cyan-400 dark:hover:border-cyan-500/50", 
            iconText: "group-hover:text-cyan-500 text-cyan-700 dark:text-cyan-400", 
            badgeBg: "bg-cyan-50 dark:bg-cyan-900/30 border-cyan-200 dark:border-cyan-800/30", 
            checkbox: "text-cyan-600 focus:ring-cyan-600 dark:checked:bg-cyan-500", 
            //
            spine: "bg-cyan-500 border-cyan-600/30 group-hover:bg-cyan-600 dark:bg-cyan-600/90 dark:border-cyan-400/30 dark:group-hover:bg-cyan-500",
            label: "text-cyan-500/80 dark:text-cyan-400/80",
            textHover: "group-hover:text-cyan-600 dark:group-hover:text-cyan-400",
            button: "bg-cyan-50 text-cyan-600 border-cyan-100 hover:bg-cyan-100 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-400 dark:hover:bg-cyan-500/20"
        },
        blue: { 
            ring: "focus:border-blue-500 focus:ring-blue-500", 
            dropBg: "hover:bg-blue-50/30 dark:hover:bg-blue-500/10", 
            dropBorder: "hover:border-blue-400 dark:hover:border-blue-500/50", 
            iconText: "group-hover:text-blue-500 text-blue-700 dark:text-blue-400", 
            badgeBg: "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800/30", 
            checkbox: "text-blue-600 focus:ring-blue-600 dark:checked:bg-blue-500",
            //
            spine: "bg-blue-500 border-blue-600/30 group-hover:bg-blue-600 dark:bg-blue-600/90 dark:border-blue-400/30 dark:group-hover:bg-blue-500",
            label: "text-blue-500/80 dark:text-blue-400/80",
            textHover: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
            button: "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20",
        },
        rose: { 
            ring: "focus:border-rose-500 focus:ring-rose-500", 
            dropBg: "hover:bg-rose-50/30 dark:hover:bg-rose-500/10", 
            dropBorder: "hover:border-rose-400 dark:hover:border-rose-500/50", 
            iconText: "group-hover:text-rose-500 text-rose-700 dark:text-rose-400", 
            badgeBg: "bg-rose-50 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800/30", 
            checkbox: "text-rose-600 focus:ring-rose-600 dark:checked:bg-rose-500",
            //
            spine: "bg-rose-500 border-rose-600/30 group-hover:bg-rose-600 dark:bg-rose-600/90 dark:border-rose-400/30 dark:group-hover:bg-rose-500",
            label: "text-rose-500/80 dark:text-rose-400/80",
            textHover: "group-hover:text-rose-600 dark:group-hover:text-rose-400",
            button: "bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20",
        },
        red: { 
            ring: "focus:border-red-500 focus:ring-red-500", 
            dropBg: "hover:bg-red-50/30 dark:hover:bg-red-500/10", 
            dropBorder: "hover:border-red-400 dark:hover:border-red-500/50", 
            iconText: "group-hover:text-red-500 text-red-700 dark:text-red-400", 
            badgeBg: "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800/30", 
            checkbox: "text-red-600 focus:ring-red-600 dark:checked:bg-red-500",
            //
            spine: "bg-red-500 border-red-600/30 group-hover:bg-red-600 dark:bg-red-600/90 dark:border-red-400/30 dark:group-hover:bg-red-500",
            label: "text-red-500/80 dark:text-red-400/80",
            textHover: "group-hover:text-red-600 dark:group-hover:text-red-400",
            button: "bg-red-50 text-red-600 border-red-100 hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20",
        },
        green: { 
            ring: "focus:border-green-500 focus:ring-green-500", 
            dropBg: "hover:bg-green-50/30 dark:hover:bg-green-500/10", 
            dropBorder: "hover:border-green-400 dark:hover:border-green-500/50", 
            iconText: "group-hover:text-green-500 text-green-700 dark:text-green-400", 
            badgeBg: "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800/30", 
            checkbox: "text-green-600 focus:ring-green-600 dark:checked:bg-green-500",
            //
            spine: "bg-green-500 border-green-600/30 group-hover:bg-green-600 dark:bg-green-600/90 dark:border-green-400/30 dark:group-hover:bg-green-500",
            label: "text-green-500/80 dark:text-green-400/80",
            textHover: "group-hover:text-green-600 dark:group-hover:text-green-400",
            button: "bg-green-50 text-green-600 border-green-100 hover:bg-green-100 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20",
        },
        sky: { 
            ring: "focus:border-sky-500 focus:ring-sky-500", 
            dropBg: "hover:bg-sky-50/30 dark:hover:bg-sky-500/10", 
            dropBorder: "hover:border-sky-400 dark:hover:border-sky-500/50", 
            iconText: "group-hover:text-sky-500 text-sky-700 dark:text-sky-400", 
            badgeBg: "bg-sky-50 dark:bg-sky-900/30 border-sky-200 dark:border-sky-800/30", 
            checkbox: "text-sky-600 focus:ring-sky-600 dark:checked:bg-sky-500", 
            //
            spine: "bg-sky-500 border-sky-600/30 group-hover:bg-sky-600 dark:bg-sky-600/90 dark:border-sky-400/30 dark:group-hover:bg-sky-500",
            label: "text-sky-500/80 dark:text-sky-400/80",
            textHover: "group-hover:text-sky-600 dark:group-hover:text-sky-400",
            button: "bg-sky-50 text-sky-600 border-sky-100 hover:bg-sky-100 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20",
        },
        lime: { 
            ring: "focus:border-lime-500 focus:ring-lime-500", 
            dropBg: "hover:bg-lime-50/30 dark:hover:bg-lime-500/10", 
            dropBorder: "hover:border-lime-400 dark:hover:border-lime-500/50", 
            iconText: "group-hover:text-lime-500 text-lime-700 dark:text-lime-400", 
            badgeBg: "bg-lime-50 dark:bg-lime-900/30 border-lime-200 dark:border-lime-800/30", 
            checkbox: "text-lime-600 focus:ring-lime-600 dark:checked:bg-lime-500",
            //
            spine: "bg-lime-500 border-lime-600/30 group-hover:bg-lime-600 dark:bg-lime-600/90 dark:border-lime-400/30 dark:group-hover:bg-lime-500",
            label: "text-lime-500/80 dark:text-lime-400/80",
            textHover: "group-hover:text-lime-600 dark:group-hover:text-lime-400",
            button: "bg-lime-50 text-lime-600 border-lime-100 hover:bg-lime-100 dark:border-lime-500/20 dark:bg-lime-500/10 dark:text-lime-400 dark:hover:bg-lime-500/20",
        },
        indigo: { 
            ring: "focus:border-indigo-500 focus:ring-indigo-500", 
            dropBg: "hover:bg-indigo-50/30 dark:hover:bg-indigo-500/10", 
            dropBorder: "hover:border-indigo-400 dark:hover:border-indigo-500/50", 
            iconText: "group-hover:text-indigo-500 text-indigo-700 dark:text-indigo-400", 
            badgeBg: "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800/30", 
            checkbox: "text-indigo-600 focus:ring-indigo-600 dark:checked:bg-indigo-500",
            //
            spine: "bg-indigo-500 border-indigo-600/30 group-hover:bg-indigo-600 dark:bg-indigo-600/90 dark:border-indigo-400/30 dark:group-hover:bg-indigo-500",
            label: "text-indigo-500/80 dark:text-indigo-400/80",
            textHover: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
            button: "bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20",
        },
        yellow: { 
            ring: "focus:border-yellow-500 focus:ring-yellow-500", 
            dropBg: "hover:bg-yellow-50/30 dark:hover:bg-yellow-500/10", 
            dropBorder: "hover:border-yellow-400 dark:hover:border-yellow-500/50", 
            iconText: "group-hover:text-yellow-500 text-yellow-700 dark:text-yellow-400", 
            badgeBg: "bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800/30", 
            checkbox: "text-yellow-600 focus:ring-yellow-600 dark:checked:bg-yellow-500",
            //
            spine: "bg-yellow-500 border-yellow-600/30 group-hover:bg-yellow-600 dark:bg-yellow-600/90 dark:border-yellow-400/30 dark:group-hover:bg-yellow-500",
            label: "text-yellow-500/80 dark:text-yellow-400/80",
            textHover: "group-hover:text-yellow-600 dark:group-hover:text-yellow-400",
            button: "bg-yellow-50 text-yellow-600 border-yellow-100 hover:bg-yellow-100 dark:border-yellow-500/20 dark:bg-yellow-500/10 dark:text-yellow-400 dark:hover:bg-yellow-500/20",
        },
        emerald: { 
            ring: "focus:border-emerald-500 focus:ring-emerald-500", 
            dropBg: "hover:bg-emerald-50/30 dark:hover:bg-emerald-500/10", 
            dropBorder: "hover:border-emerald-400 dark:hover:border-emerald-500/50", 
            iconText: "group-hover:text-emerald-500 text-emerald-700 dark:text-emerald-400", 
            badgeBg: "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800/30", 
            checkbox: "text-emerald-600 focus:ring-emerald-600 dark:checked:bg-emerald-500",
            //
            spine: "bg-emerald-500 border-emerald-600/30 group-hover:bg-emerald-600 dark:bg-emerald-600/90 dark:border-emerald-400/30 dark:group-hover:bg-emerald-500",
            label: "text-emerald-500/80 dark:text-emerald-400/80",
            textHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
            button: "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20",
        },
        amber: { 
            ring: "focus:border-amber-500 focus:ring-amber-500", 
            dropBg: "hover:bg-amber-50/30 dark:hover:bg-amber-500/10", 
            dropBorder: "hover:border-amber-400 dark:hover:border-amber-500/50", 
            iconText: "group-hover:text-amber-500 text-amber-700 dark:text-amber-400", 
            badgeBg: "bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800/30", 
            checkbox: "text-amber-600 focus:ring-amber-600 dark:checked:bg-amber-500",
            //
            spine: "bg-amber-500 border-amber-600/30 group-hover:bg-amber-600 dark:bg-amber-600/90 dark:border-amber-400/30 dark:group-hover:bg-amber-500",
            label: "text-amber-500/80 dark:text-amber-400/80",
            textHover: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
            button: "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/20",
        },
        fuchsia: { 
            ring: "focus:border-fuchsia-500 focus:ring-fuchsia-500", 
            dropBg: "hover:bg-fuchsia-50/30 dark:hover:bg-fuchsia-500/10", 
            dropBorder: "hover:border-fuchsia-400 dark:hover:border-fuchsia-500/50", 
            iconText: "group-hover:text-fuchsia-500 text-fuchsia-700 dark:text-fuchsia-400", 
            badgeBg: "bg-fuchsia-50 dark:bg-fuchsia-900/30 border-fuchsia-200 dark:border-fuchsia-800/30", 
            checkbox: "text-fuchsia-600 focus:ring-fuchsia-600 dark:checked:bg-fuchsia-500",
            //
            spine: "bg-fuchsia-500 border-fuchsia-600/30 group-hover:bg-fuchsia-600 dark:bg-fuchsia-600/90 dark:border-fuchsia-400/30 dark:group-hover:bg-fuchsia-500",
            label: "text-fuchsia-500/80 dark:text-fuchsia-400/80",
            textHover: "group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400",
            button: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100 hover:bg-fuchsia-100 dark:border-fuchsia-500/20 dark:bg-fuchsia-500/10 dark:text-fuchsia-400 dark:hover:bg-fuchsia-500/20",
        },
        violet: { 
            ring: "focus:border-violet-500 focus:ring-violet-500", 
            dropBg: "hover:bg-violet-50/30 dark:hover:bg-violet-500/10", 
            dropBorder: "hover:border-violet-400 dark:hover:border-violet-500/50", 
            iconText: "group-hover:text-violet-500 text-violet-700 dark:text-violet-400", 
            badgeBg: "bg-violet-50 dark:bg-violet-900/30 border-violet-200 dark:border-violet-800/30", 
            checkbox: "text-violet-600 focus:ring-violet-600 dark:checked:bg-violet-500",
            //
            spine: "bg-violet-500 border-violet-600/30 group-hover:bg-violet-600 dark:bg-violet-600/90 dark:border-violet-400/30 dark:group-hover:bg-violet-500",
            label: "text-violet-500/80 dark:text-violet-400/80",
            textHover: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
            button: "bg-violet-50 text-violet-600 border-violet-100 hover:bg-violet-100 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-400 dark:hover:bg-violet-500/20",
        },
        pink: { 
            ring: "focus:border-pink-500 focus:ring-pink-500", 
            dropBg: "hover:bg-pink-50/30 dark:hover:bg-pink-500/10", 
            dropBorder: "hover:border-pink-400 dark:hover:border-pink-500/50", 
            iconText: "group-hover:text-pink-500 text-pink-700 dark:text-pink-400", 
            badgeBg: "bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-800/30", 
            checkbox: "text-pink-600 focus:ring-pink-600 dark:checked:bg-pink-500",
            //
            spine: "bg-pink-500 border-pink-600/30 group-hover:bg-pink-600 dark:bg-pink-600/90 dark:border-pink-400/30 dark:group-hover:bg-pink-500",
            label: "text-pink-500/80 dark:text-pink-400/80",
            textHover: "group-hover:text-pink-600 dark:group-hover:text-pink-400",
            button: "bg-pink-50 text-pink-600 border-pink-100 hover:bg-pink-100 dark:border-pink-500/20 dark:bg-pink-500/10 dark:text-pink-400 dark:hover:bg-pink-500/20",
        },
        slate: { 
            ring: "focus:border-slate-500 focus:ring-slate-500", 
            dropBg: "hover:bg-slate-50/30 dark:hover:bg-slate-500/10", 
            dropBorder: "hover:border-slate-400 dark:hover:border-slate-500/50", 
            iconText: "group-hover:text-slate-500 text-slate-700 dark:text-slate-400", 
            badgeBg: "bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/30", 
            checkbox: "text-slate-600 focus:ring-slate-600 dark:checked:bg-slate-500",
            //
            spine: "bg-slate-500 border-slate-600/30 group-hover:bg-slate-600 dark:bg-slate-600/90 dark:border-slate-400/30 dark:group-hover:bg-slate-500",
            label: "text-slate-500/80 dark:text-slate-400/80",
            textHover: "group-hover:text-slate-600 dark:group-hover:text-slate-400",
            button: "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100 dark:border-slate-500/20 dark:bg-slate-500/10 dark:text-slate-400 dark:hover:bg-slate-500/20",
        },
        orange: { 
            ring: "focus:border-orange-500 focus:ring-orange-500", 
            dropBg: "hover:bg-orange-50/30 dark:hover:bg-orange-500/10", 
            dropBorder: "hover:border-orange-400 dark:hover:border-orange-500/50", 
            iconText: "group-hover:text-orange-500 text-orange-700 dark:text-orange-400", 
            badgeBg: "bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800/30", 
            checkbox: "text-orange-600 focus:ring-orange-600 dark:checked:bg-orange-500",
            //
            spine: "bg-orange-500 border-orange-600/30 group-hover:bg-orange-600 dark:bg-orange-600/90 dark:border-orange-400/30 dark:group-hover:bg-orange-500",
            label: "text-orange-500/80 dark:text-orange-400/80",
            textHover: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
            button: "bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-400 dark:hover:bg-orange-500/20",
        },
        teal: { 
            ring: "focus:border-teal-500 focus:ring-teal-500", 
            dropBg: "hover:bg-teal-50/30 dark:hover:bg-teal-500/10", 
            dropBorder: "hover:border-teal-400 dark:hover:border-teal-500/50", 
            iconText: "group-hover:text-teal-500 text-teal-700 dark:text-teal-400", 
            badgeBg: "bg-teal-50 dark:bg-teal-900/30 border-teal-200 dark:border-teal-800/30", 
            checkbox: "text-teal-600 focus:ring-teal-600 dark:checked:bg-teal-500",
            //
            spine: "bg-teal-500 border-teal-600/30 group-hover:bg-teal-600 dark:bg-teal-600/90 dark:border-teal-400/30 dark:group-hover:bg-teal-500",
            label: "text-teal-500/80 dark:text-teal-400/80",
            textHover: "group-hover:text-teal-600 dark:group-hover:text-teal-400",
            button: "bg-teal-50 text-teal-600 border-teal-100 hover:bg-teal-100 dark:border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-400 dark:hover:bg-teal-500/20",
        },
        purple: { 
            ring: "focus:border-purple-500 focus:ring-purple-500", 
            dropBg: "hover:bg-purple-50/30 dark:hover:bg-purple-500/10", 
            dropBorder: "hover:border-purple-400 dark:hover:border-purple-500/50", 
            iconText: "group-hover:text-purple-500 text-purple-700 dark:text-purple-400", 
            badgeBg: "bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800/30", 
            checkbox: "text-purple-600 focus:ring-purple-600 dark:checked:bg-purple-500",
            //
            spine: "bg-purple-500 border-purple-600/30 group-hover:bg-purple-600 dark:bg-purple-600/90 dark:border-purple-400/30 dark:group-hover:bg-purple-500",
            label: "text-purple-500/80 dark:text-purple-400/80",
            textHover: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
            button: "bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-400 dark:hover:bg-purple-500/20",
        }
    };
    
    return colors[baseColor] || colors.indigo;
};

// return the theme based on category
export const getCategoryTheme = (categoryName) => {
    const baseConfig = CATEGORY_THEMES[categoryName?.toLowerCase()] || CATEGORY_THEMES["default"];
    
    const themeClasses = getThemeExtractedClasses(baseConfig.baseColor);
    
    return { ...baseConfig, ...themeClasses };
};