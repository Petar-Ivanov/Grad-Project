export function SourcesIcon({ className = "h-4 w-4", ...props }) {
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
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5V19A9 3 0 0 0 21 19V5" />
            <path d="M3 12A9 3 0 0 0 21 12" />

            {/* <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="m12 18-1.2-2.8L8 14l2.8-1.2L12 10l1.2 2.8L16 14l-2.8 1.2L12 18z" /> */}

            {/* <path d="M3 14h18v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4z" />
            <path d="M7 14V6a2 2 0 0 1 2-2h4l4 4v6" />
            <path d="M13 4v4h4" />
            <path d="M10 11h4" /> */}

            {/* <path d="M2 6h6a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H2z" />
            <path d="M22 6h-6a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h7z" />
            <path d="m12 2-.8 2.2L9 5l2.2.8L12 8l.8-2.2L15 5l-2.2-.8Z" /> */}
        </svg>
    );
}