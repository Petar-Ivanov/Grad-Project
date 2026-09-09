export function MathFormulaIcon({ className = "h-4 w-4", ...props }) {
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
            <path d="M3 14l2 2 4-12h11" />
            
            <path d="M13 10l5 5" />
            <path d="M18 10l-5 5" />
        </svg>
    );
}