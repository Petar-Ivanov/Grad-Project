export function ListViewIcon({ className = "h-4 w-4", ...props }) {
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
            {/* Top Bar */}
            <rect x="3" y="3" width="18" height="4" rx="1" fill="currentColor" stroke="none" />
            {/* Middle Bar */}
            <rect x="3" y="10" width="18" height="4" rx="1" fill="currentColor" stroke="none" />
            {/* Bottom Bar */}
            <rect x="3" y="17" width="18" height="4" rx="1" fill="currentColor" stroke="none" />
        </svg>
    );
}