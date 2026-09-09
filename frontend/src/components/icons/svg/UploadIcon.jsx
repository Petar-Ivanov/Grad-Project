export function UploadIcon({ className = "h-4 w-4", ...props }) {
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
            <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M2 15h10" />
            <path d="m9 18 3-3-3-3" />
            {/* <rect x="2" y="2" width="20" height="20" rx="2" strokeDasharray="4 4" />
            <path d="M12 16V8" />
            <path d="m8 12 4-4 4 4" /> */}
        </svg>
    );
}