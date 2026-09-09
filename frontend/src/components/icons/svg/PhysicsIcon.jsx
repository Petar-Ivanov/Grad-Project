export function PhysicsIcon({ className = "h-4 w-4", ...props }) {
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
            <circle cx="12" cy="12" r="1" />
            <ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(45 12 12)" />
            <ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(135 12 12)" />
        </svg>
    );
}
