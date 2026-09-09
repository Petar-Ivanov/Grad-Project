import { Link, NavLink } from "react-router-dom";
import { DashboardIcon, ProfileIcon, SettingsIcon,  } from "../icons/index";
import SettingsDropdown from "../../features/settings/components/SettingsDropdown";
import ProfileDropdown from "../../features/profile/components/ProfileDropdown";


export default function Navbar({ variant = "public" }) {
  const isApp = variant === "app";

  return (
   <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

      {/* Logo Brand Area */}
      <div className="flex items-center gap-8">
        {/* Logo Link */}
        <Link
          to={isApp ? "/dashboard" : "/"}
          className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xl tracking-tight"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
            N
          </span>
          <span>
            Notebook<span className="text-indigo-600 font-semibold"> AI</span>
          </span>
        </Link>

      </div>

      <div className="flex items-center gap-4">
        {isApp 
          ? (
              <div className="flex items-center gap-4">
                
                <Link 
                  to="/dashboard"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  <DashboardIcon className="h-6 w-6"/>
                </Link>

                {/* <Link 
                  to="/profile"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  <ProfileIcon className="h-6 w-6"/>
                </Link> */}
                <SettingsDropdown variant="navbar" />
                <ProfileDropdown variant="navbar" />

              </div>
          ) : ( 
              <>
                <Link 
                  to="/login"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                >
                  Login
                </Link>

                <Link 
                  to="/register"
                  className="inline-flex h-9 items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-500 shadow-sm shadow-indigo-500/10 transition-colors"
                >
                  Sign Up
                </Link>
              </>
          )
        }
      </div>
    </div>
   </nav>
  );
}