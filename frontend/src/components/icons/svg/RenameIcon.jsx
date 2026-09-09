export function RenameIcon({ className = "h-4 w-4", ...props }) {
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
            <rect 
                x="2" 
                y="5" 
                width="20" 
                height="14" 
                rx="2" 
                strokeWidth="1" 
                strokeDasharray="3 3" 
            />
            
            <text 
                x="7" 
                y="15.5" 
                fontSize="10" 
                fontFamily="system-ui, sans-serif" 
                fontWeight="bold" 
                fill="currentColor" 
                stroke="none"
                textAnchor="middle"
            >
                a
            </text>

            <text 
                x="17" 
                y="15.5" 
                fontSize="10" 
                fontFamily="system-ui, sans-serif" 
                fontWeight="bold" 
                fill="currentColor" 
                stroke="none"
                textAnchor="middle"
            >
                b
            </text>

            <path d="M9 2h6" />
            <path d="M12 2v20" />
            <path d="M9 22h6" />
        </svg>
    );
}
