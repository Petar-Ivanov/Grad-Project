import { 
    BookIcon, 
    CodeIcon, 
    MathFormulaIcon, 
    LanguageIcon, 
    LiteratureIcon, 
    GlobeIcon, 
    ArtIcon, 
    MusicIcon, 
    PhysicalEduIcon, 
    ChemistryIcon,
    AstronomyIcon,
    PhysicsIcon,
    BiologyIcon,
    SocialIcon,
    FilmIcon,
    LibraryIcon,
    BuildIcon,
    EconomicsIcon,
    CompassIcon,
    BusinessIcon,
    SportsIcon,
    LightBulbIcon,
    ScalesIcon
} from "../../../components/icons/index.jsx"

export const getAvailableCategories = () => {
    return Object.keys(CATEGORY_THEMES)
        .filter(key => key !== 'default') 
        .map(key => {
            return key.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        })
        .sort();
};

export const CATEGORY_THEMES = {
    "computer science & technology": { 
        icon: CodeIcon, 
        baseColor: "cyan" 
    },
    "mathematics": { 
        icon: MathFormulaIcon, 
        baseColor: "blue" 
    },
    "languages": { 
        icon: LanguageIcon, 
        baseColor: "rose" 
    },
    "literature": { 
        icon: LiteratureIcon, 
        baseColor: "red" 
    },
    "biology": { 
        icon: BiologyIcon, 
        baseColor: "green" 
    },
    "physics": { 
        icon: PhysicsIcon, 
        baseColor: "sky" 
    },
    "chemistry": { 
        icon: ChemistryIcon, 
        baseColor: "lime" 
    },
    "astronomy": { 
        icon: AstronomyIcon, 
        baseColor: "indigo" 
    },
    "history": { 
        icon: LibraryIcon, 
        baseColor: "yellow" 
    },
    "geography": { 
        icon: GlobeIcon, 
        baseColor: "emerald" 
    },
    "social science": { 
        icon: SocialIcon, 
        baseColor: "amber" 
    },
    "arts & design": { 
        icon: ArtIcon, 
        baseColor: "fuchsia" 
    },
    "music & audio": { 
        icon: MusicIcon, 
        baseColor: "violet" 
    },
    "film & media": { 
        icon: FilmIcon, 
        baseColor: "pink" 
    },
    "engineering": { 
        icon: BuildIcon, 
        baseColor: "slate" 
    },
    "economics": { 
        icon: EconomicsIcon, 
        baseColor: "emerald" 
    },
    "business & finance": { 
        icon: BusinessIcon, 
        baseColor: "indigo" 
    },
    "sports": { 
        icon: SportsIcon, 
        baseColor: "orange" 
    },
    "health & psychology": { 
        icon: PhysicalEduIcon, 
        baseColor: "teal" 
    },
    "philosophy & ethics": { 
        icon: LightBulbIcon, 
        baseColor: "purple" 
    },
    "law & government": { 
        icon: ScalesIcon, 
        baseColor: "purple" 
    },
    "life & career skills": { 
        icon: CompassIcon, 
        baseColor: "orange" 
    },
    "default": { 
        icon: BookIcon, 
        baseColor: "indigo" 
    }
};

// import { 
//     BookIcon, 
//     CodeIcon, 
//     MathFormulaIcon, 
//     LanguageIcon, 
//     LiteratureIcon, 
//     GlobeIcon, 
//     ArtIcon, 
//     MusicIcon, 
//     PhysicalEduIcon, 
//     ChemistryIcon,
//     AstronomyIcon,
//     PhysicsIcon,
//     BiologyIcon,
//     SocialIcon,
//     FilmIcon,
//     LibraryIcon,
//     BuildIcon,
//     EconomicsIcon,
//     CompassIcon,
//     BusinessIcon,
//     SportsIcon,
//     LightBulbIcon,
//     ScalesIcon
// } from "../../../components/icons/index.jsx"


// export const getAvailableCategories = () => {
//     return Object.keys(CATEGORY_THEMES)
//         .filter(key => key !== 'default') 
//         .map(key => {
//             return key.split(' ')
//                 .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//                 .join(' ');
//         })
//         .sort();
// };

// export const CATEGORY_THEMES = {

//     // computer science & technology
//     "computer science & technology": {
//         icon: CodeIcon,
//         baseColor: "cyan",
//         spine: "bg-cyan-500 border-cyan-600/30 group-hover:bg-cyan-600 dark:bg-cyan-600/90 dark:border-cyan-400/30 dark:group-hover:bg-cyan-500",
//         label: "text-cyan-500/80 dark:text-cyan-400/80",
//         textHover: "group-hover:text-cyan-600 dark:group-hover:text-cyan-400",
//         button: "bg-cyan-50 text-cyan-600 border-cyan-100 hover:bg-cyan-100 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-400 dark:hover:bg-cyan-500/20"
//     },
//     // mathematics
//     "mathematics": {
//         icon: MathFormulaIcon,
//         baseColor: "blue",
//         spine: "bg-blue-500 border-blue-600/30 group-hover:bg-blue-600 dark:bg-blue-600/90 dark:border-blue-400/30 dark:group-hover:bg-blue-500",
//         label: "text-blue-500/80 dark:text-blue-400/80",
//         textHover: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
//         button: "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
//     },
//     // languages
//     "languages": {
//         icon: LanguageIcon,
//         baseColor: "rose",
//         spine: "bg-rose-500 border-rose-600/30 group-hover:bg-rose-600 dark:bg-rose-600/90 dark:border-rose-400/30 dark:group-hover:bg-rose-500",
//         label: "text-rose-500/80 dark:text-rose-400/80",
//         textHover: "group-hover:text-rose-600 dark:group-hover:text-rose-400",
//         button: "bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20"
//     },
//     // literature
//     "literature": {
//         icon: LiteratureIcon,
//         baseColor: "red",
//         spine: "bg-red-500 border-red-600/30 group-hover:bg-red-600 dark:bg-red-600/90 dark:border-red-400/30 dark:group-hover:bg-red-500",
//         label: "text-red-500/80 dark:text-red-400/80",
//         textHover: "group-hover:text-red-600 dark:group-hover:text-red-400",
//         button: "bg-red-50 text-red-600 border-red-100 hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
//     },
//     // biology
//     "biology": {
//         icon: BiologyIcon,
//         baseColor: "green",
//         spine: "bg-green-500 border-green-600/30 group-hover:bg-green-600 dark:bg-green-600/90 dark:border-green-400/30 dark:group-hover:bg-green-500",
//         label: "text-green-500/80 dark:text-green-400/80",
//         textHover: "group-hover:text-green-600 dark:group-hover:text-green-400",
//         button: "bg-green-50 text-green-600 border-green-100 hover:bg-green-100 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20"
//     },
//     // physics
//     "physics": {
//         icon: PhysicsIcon,
//         baseColor: "sky",
//         spine: "bg-sky-500 border-sky-600/30 group-hover:bg-sky-600 dark:bg-sky-600/90 dark:border-sky-400/30 dark:group-hover:bg-sky-500",
//         label: "text-sky-500/80 dark:text-sky-400/80",
//         textHover: "group-hover:text-sky-600 dark:group-hover:text-sky-400",
//         button: "bg-sky-50 text-sky-600 border-sky-100 hover:bg-sky-100 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20"
//     },
//     // chemistry
//     "chemistry": {
//         icon: ChemistryIcon,
//         baseColor: "lime",
//         spine: "bg-lime-500 border-lime-600/30 group-hover:bg-lime-600 dark:bg-lime-600/90 dark:border-lime-400/30 dark:group-hover:bg-lime-500",
//         label: "text-lime-500/80 dark:text-lime-400/80",
//         textHover: "group-hover:text-lime-600 dark:group-hover:text-lime-400",
//         button: "bg-lime-50 text-lime-600 border-lime-100 hover:bg-lime-100 dark:border-lime-500/20 dark:bg-lime-500/10 dark:text-lime-400 dark:hover:bg-lime-500/20"
//     },
//     // astronomy
//     "astronomy": {
//         icon: AstronomyIcon,
//         baseColor: "indigo",
//         spine: "bg-indigo-500 border-indigo-600/30 group-hover:bg-indigo-600 dark:bg-indigo-600/90 dark:border-indigo-400/30 dark:group-hover:bg-indigo-500",
//         label: "text-indigo-500/80 dark:text-indigo-400/80",
//         textHover: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
//         button: "bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20"
//     },
//     // history
//     "history": {
//         icon: LibraryIcon,
//         baseColor: "yellow",
//         spine: "bg-yellow-500 border-yellow-600/30 group-hover:bg-yellow-600 dark:bg-yellow-600/90 dark:border-yellow-400/30 dark:group-hover:bg-yellow-500",
//         label: "text-yellow-500/80 dark:text-yellow-400/80",
//         textHover: "group-hover:text-yellow-600 dark:group-hover:text-yellow-400",
//         button: "bg-yellow-50 text-yellow-600 border-yellow-100 hover:bg-yellow-100 dark:border-yellow-500/20 dark:bg-yellow-500/10 dark:text-yellow-400 dark:hover:bg-yellow-500/20"
//     },
//     // geography
//     "geography": {
//         icon: GlobeIcon,
//         baseColor: "emerald",
//         spine: "bg-emerald-500 border-emerald-600/30 group-hover:bg-emerald-600 dark:bg-emerald-600/90 dark:border-emerald-400/30 dark:group-hover:bg-emerald-500",
//         label: "text-emerald-500/80 dark:text-emerald-400/80",
//         textHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
//         button: "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
//     },
//     // social science
//     "social science": {
//         icon: SocialIcon,
//         baseColor: "amber",
//         spine: "bg-amber-500 border-amber-600/30 group-hover:bg-amber-600 dark:bg-amber-600/90 dark:border-amber-400/30 dark:group-hover:bg-amber-500",
//         label: "text-amber-500/80 dark:text-amber-400/80",
//         textHover: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
//         button: "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/20"
//     },
//     // arts & design
//     "arts & design": {
//         icon: ArtIcon,
//         baseColor: "fuchsia",
//         spine: "bg-fuchsia-500 border-fuchsia-600/30 group-hover:bg-fuchsia-600 dark:bg-fuchsia-600/90 dark:border-fuchsia-400/30 dark:group-hover:bg-fuchsia-500",
//         label: "text-fuchsia-500/80 dark:text-fuchsia-400/80",
//         textHover: "group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400",
//         button: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100 hover:bg-fuchsia-100 dark:border-fuchsia-500/20 dark:bg-fuchsia-500/10 dark:text-fuchsia-400 dark:hover:bg-fuchsia-500/20"
//     },
//     // music & audio
//     "music & audio": {
//         icon: MusicIcon,
//         baseColor: "violet",
//         spine: "bg-violet-500 border-violet-600/30 group-hover:bg-violet-600 dark:bg-violet-600/90 dark:border-violet-400/30 dark:group-hover:bg-violet-500",
//         label: "text-violet-500/80 dark:text-violet-400/80",
//         textHover: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
//         button: "bg-violet-50 text-violet-600 border-violet-100 hover:bg-violet-100 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-400 dark:hover:bg-violet-500/20"
//     },
//     // film & media
//     "film & media": {
//         icon: FilmIcon,
//         baseColor: "pink",
//         spine: "bg-pink-500 border-pink-600/30 group-hover:bg-pink-600 dark:bg-pink-600/90 dark:border-pink-400/30 dark:group-hover:bg-pink-500",
//         label: "text-pink-500/80 dark:text-pink-400/80",
//         textHover: "group-hover:text-pink-600 dark:group-hover:text-pink-400",
//         button: "bg-pink-50 text-pink-600 border-pink-100 hover:bg-pink-100 dark:border-pink-500/20 dark:bg-pink-500/10 dark:text-pink-400 dark:hover:bg-pink-500/20"
//     },
//     // engineering
//     "engineering": {
//         icon: BuildIcon,
//         baseColor: "slate",
//         spine: "bg-slate-500 border-slate-600/30 group-hover:bg-slate-600 dark:bg-slate-600/90 dark:border-slate-400/30 dark:group-hover:bg-slate-500",
//         label: "text-slate-500/80 dark:text-slate-400/80",
//         textHover: "group-hover:text-slate-600 dark:group-hover:text-slate-400",
//         button: "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100 dark:border-slate-500/20 dark:bg-slate-500/10 dark:text-slate-400 dark:hover:bg-slate-500/20"
//     },
//     // economics
//     "economics": {
//         icon: EconomicsIcon,
//         baseColor: "emerald",
//         spine: "bg-emerald-500 border-emerald-600/30 group-hover:bg-emerald-600 dark:bg-emerald-600/90 dark:border-emerald-400/30 dark:group-hover:bg-emerald-500",
//         label: "text-emerald-500/80 dark:text-emerald-400/80",
//         textHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
//         button: "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
//     },
//     // business & finance
//     "business & finance": {
//         icon: BusinessIcon,
//         baseColor: "indigo",
//         spine: "bg-indigo-600 border-indigo-700/30 group-hover:bg-indigo-700 dark:bg-indigo-700/90 dark:border-indigo-500/30 dark:group-hover:bg-indigo-600",
//         label: "text-indigo-600/80 dark:text-indigo-400/80",
//         textHover: "group-hover:text-indigo-700 dark:group-hover:text-indigo-400",
//         button: "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 dark:border-indigo-600/30 dark:bg-indigo-600/10 dark:text-indigo-400 dark:hover:bg-indigo-600/20"
//     },
//     // sports
//     "sports": {
//         icon: SportsIcon,
//         baseColor: "orange",
//         spine: "bg-orange-500 border-orange-600/30 group-hover:bg-orange-600 dark:bg-orange-600/90 dark:border-orange-400/30 dark:group-hover:bg-orange-500",
//         label: "text-orange-500/80 dark:text-orange-400/80",
//         textHover: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
//         button: "bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-400 dark:hover:bg-orange-500/20"
//     },
//     // health & psychology
//     "health & psychology": {
//         icon: PhysicalEduIcon,
//         baseColor: "teal",
//         spine: "bg-teal-500 border-teal-600/30 group-hover:bg-teal-600 dark:bg-teal-600/90 dark:border-teal-400/30 dark:group-hover:bg-teal-500",
//         label: "text-teal-500/80 dark:text-teal-400/80",
//         textHover: "group-hover:text-teal-600 dark:group-hover:text-teal-400",
//         button: "bg-teal-50 text-teal-600 border-teal-100 hover:bg-teal-100 dark:border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-400 dark:hover:bg-teal-500/20"
//     },
//     // philosophy & ethics
//     "philosophy & ethics": {
//         icon: LightBulbIcon,
//         baseColor: "purple",
//         spine: "bg-purple-600 border-purple-700/30 group-hover:bg-purple-700 dark:bg-purple-700/90 dark:border-purple-500/30 dark:group-hover:bg-purple-600",
//         label: "text-purple-600/80 dark:text-purple-400/80",
//         textHover: "group-hover:text-purple-700 dark:group-hover:text-purple-400",
//         button: "bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-400 dark:hover:bg-purple-500/20"
//     },
//     // law & government
//     "law & government": {
//         icon: ScalesIcon,
//         baseColor: "purple",
//         spine: "bg-purple-500 border-purple-600/30 group-hover:bg-purple-600 dark:bg-purple-600/90 dark:border-purple-400/30 dark:group-hover:bg-purple-500",
//         label: "text-purple-500/80 dark:text-purple-400/80",
//         textHover: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
//         button: "bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-400 dark:hover:bg-purple-500/20"
//     },
//     // life & career skills
//     "life & career skills": {
//         icon: CompassIcon,
//         baseColor: "orange",
//         spine: "bg-orange-600 border-orange-700/30 group-hover:bg-orange-700 dark:bg-orange-700/90 dark:border-orange-500/30 dark:group-hover:bg-orange-600",
//         label: "text-orange-600/80 dark:text-orange-400/80",
//         textHover: "group-hover:text-orange-700 dark:group-hover:text-orange-400",
//         button: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-400 dark:hover:bg-orange-500/20"
//     },

//     "default": {
//         icon: BookIcon,
//         baseColor: "indigo",
//         spine: "bg-indigo-500 border-indigo-600/30 group-hover:bg-indigo-600 dark:bg-indigo-600/90 dark:border-indigo-400/30 dark:group-hover:bg-indigo-500",
//         label: "text-indigo-500/80 dark:text-indigo-400/80",
//         textHover: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
//         button: "bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20"
//     }
// };