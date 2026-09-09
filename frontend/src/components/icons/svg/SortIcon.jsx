export function SortIcon({ className = "h-4 w-4", ...props }) {
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
            <path d="M4 6h9" />
            <path d="M4 12h7" />
            <path d="M4 18h4" />
            <path d="M18 5v14" />
            <path d="M15 16l3 3 3-3" />
        </svg>
    );
}
