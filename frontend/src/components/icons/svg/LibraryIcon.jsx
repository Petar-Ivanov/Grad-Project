export function LibraryIcon({ className = "h-4 w-4", ...props }) {
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
            {/* <rect width="7" height="18" x="3" y="3" rx="1" />
            <path d="M7 3v18" />
            <path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z" /> */}

            
            <polygon points="12 3 20 8 4 8" />
            <path d="M6 8v10" />
            <path d="M10 8v10" />
            <path d="M14 8v10" />
            <path d="M18 8v10" />
            <path d="M4 18h16" />
            <path d="M2 21h20" />
        </svg>
    );
}