export function KeyIcon({ className = "h-4 w-4", ...props }) {
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
            <circle cx="7.5" cy="15.5" r="4.5" />
            <path d="m10.5 12.5 9-9" />
            <path d="m16 8 3 3" />
            <path d="m19 5 3 3" />
        </svg>
    );
}