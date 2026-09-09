
export function GoBackIcon({ className = "h-4 w-4", ...props }) {
    return (
        <svg
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            className={className}
            {...props}
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
    );
}

