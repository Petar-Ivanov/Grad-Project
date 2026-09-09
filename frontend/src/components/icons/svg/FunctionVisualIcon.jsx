export function FunctionVisualIcon({ className = "h-4 w-4", ...props }) {
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
            <path d="M3 3v18h18" />
            
            <path d="M3 12c3-8 6-8 9 0s6 8 9 0" />
            
            <circle cx="12" cy="12" r="2" />
        </svg>
    );
}