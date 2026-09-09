export function ShapesIcon({ className = "h-4 w-4", ...props }) {
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
            <path d="M12 2l-5 9h10z" />
            
            <rect x="3" y="13" width="8" height="8" rx="1" />
            
            <circle cx="17" cy="17" r="5" />
        </svg>
    );
}