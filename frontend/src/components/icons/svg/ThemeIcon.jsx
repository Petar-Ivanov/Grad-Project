export function ThemeIcon({ className = "h-4 w-4", ...props }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
            {...props}
        >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3a9 9 0 0 0 0 18v-18z" fill="currentColor" stroke="none" />
        </svg>
    );
}