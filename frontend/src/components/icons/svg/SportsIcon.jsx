export function SportsIcon({ className = "h-4 w-4", ...props }) {
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
            <path d="M8 12h8" />
            <rect x="4" y="8" width="4" height="8" rx="1" />
            <rect x="16" y="8" width="4" height="8" rx="1" />
            <path d="M2 10h2v4H2z" />
            <path d="M20 10h2v4h-2z" />
        </svg>
    );
}
