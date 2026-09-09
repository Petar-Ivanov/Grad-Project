export function GridViewIcon({ className = "h-4 w-4", ...props }) {
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
            {/* Top Row */}
            <rect x="3" y="3" width="4" height="4" rx="1" fill="currentColor" stroke="none" />
            <rect x="10" y="3" width="4" height="4" rx="1" fill="currentColor" stroke="none" />
            <rect x="17" y="3" width="4" height="4" rx="1" fill="currentColor" stroke="none" />
            {/* Middle Row */}
            <rect x="3" y="10" width="4" height="4" rx="1" fill="currentColor" stroke="none" />
            <rect x="10" y="10" width="4" height="4" rx="1" fill="currentColor" stroke="none" />
            <rect x="17" y="10" width="4" height="4" rx="1" fill="currentColor" stroke="none" />
            {/* Bottom Row */}
            <rect x="3" y="17" width="4" height="4" rx="1" fill="currentColor" stroke="none" />
            <rect x="10" y="17" width="4" height="4" rx="1" fill="currentColor" stroke="none" />
            <rect x="17" y="17" width="4" height="4" rx="1" fill="currentColor" stroke="none" /> 
        </svg>
    );
}