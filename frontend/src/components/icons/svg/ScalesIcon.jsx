export function ScalesIcon({ className = "h-4 w-4", ...props }) {
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
            <path d="M12 2v20" />
            <line x1="2" y1="6" x2="22" y2="6" />
            <path d="M5 6l-3 7a3 3 0 0 0 6 0l-3-7" />
            <path d="M19 6l-3 7a3 3 0 0 0 6 0l-3-7" />
            <line x1="9" y1="22" x2="15" y2="22" />
        </svg>
    );
}
