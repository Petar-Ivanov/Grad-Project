import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        // using local storage or defaulting to system
        if (typeof window !== 'undefined') {
            return localStorage.getItem('app-theme') || 'system';
        }
        return 'system';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const applyTheme = () => {
            root.classList.remove('light', 'dark');
            
            if (theme === 'system') {
                root.classList.add(mediaQuery.matches ? 'dark' : 'light');
            } else {
                root.classList.add(theme);
            }
        };

        // applying immediately
        applyTheme();
        
        // saving preferences
        localStorage.setItem('app-theme', theme);

        // when syste is selected listening for system changes
        const handleSystemChange = () => {
            if (theme === 'system') {
                applyTheme();
            }
        };

        mediaQuery.addEventListener('change', handleSystemChange);
        
        return () => mediaQuery.removeEventListener('change', handleSystemChange);

    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// custom access hook
export const useTheme = () => useContext(ThemeContext);