
export function MenuIcon({ className = "h-4 w-4", ...props }) {
    return (
        <svg 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            className={className}
            {...props}
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );
}