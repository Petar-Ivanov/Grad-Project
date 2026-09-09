
import React from 'react';

export function ConstructionAnimationIcon({ 
    className = "h-4 w-4", 
    columns = 8,           // Number of blocks per row
    rowDuration = 1.5,     // Speed: seconds per row cycle
    ...props 
}) {
    const totalWidth = 20; 
    const colStep = totalWidth / columns;
    const size = colStep * 0.85; 
    const rx = size * 0.15;
    const startX = 2 + (colStep - size) / 2;
    
    const yTop = 12 - colStep * 1.5;
    const yMid = 12 - colStep * 0.5;
    const yBot = 12 + colStep * 0.5;
    const yStart = -12;
    const yExit = 30;
    const yBounce = Math.min(2, colStep * 0.5);

    const totalDuration = rowDuration * 3;

    // Generate the random sequence exactly once per mount (or when `columns` changes)
    const blocks = React.useMemo(() => {
        const generated = [];
        for (let g = 0; g < 3; g++) {
            // Shuffle drop order randomly
            const cols = Array.from({ length: columns }, (_, i) => i).sort(() => Math.random() - 0.5);
            
            for (let i = 0; i < columns; i++) {
                generated.push({
                    id: `${g}-${i}`,
                    group: g,
                    col: cols[i],
                    dropIndex: i
                });
            }
        }
        return generated;
    }, [columns]);

    // Keyframe timings
    const dropStart = (k) => k * (25 / columns);
    const dropEnd = (k) => dropStart(k) + 4;
    const bounce1 = (k) => dropEnd(k) + 1.2;
    const bounce2 = (k) => bounce1(k) + 1.3;

    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
            {...props}
        >
            <style>
                {`
                    ${Array.from({ length: columns }).map((_, k) => `
                        @keyframes tetris-drop-col-${k} {
                            0% { transform: translateY(${yStart}px); opacity: 0; }
                            ${k > 0 ? `${Math.max(0, dropStart(k) - 0.1)}% { transform: translateY(${yStart}px); opacity: 0; }` : ''}
                            
                            /* Drop and bounce phase */
                            ${dropStart(k)}% { transform: translateY(${yStart}px); opacity: 1; animation-timing-function: ease-in; }
                            ${dropEnd(k)}% { transform: translateY(${yTop}px); animation-timing-function: ease-out; }
                            ${bounce1(k)}% { transform: translateY(${yTop - yBounce}px); animation-timing-function: ease-in; }
                            ${bounce2(k)}% { transform: translateY(${yTop}px); animation-timing-function: linear; }
                            
                            /* Rest at row 3 (top) */
                            33% { transform: translateY(${yTop}px); animation-timing-function: ease-in-out; }
                            
                            /* Shift to row 2 (middle) */
                            36.5% { transform: translateY(${yMid}px); animation-timing-function: linear; }
                            
                            /* Rest at row 2 */
                            66.3% { transform: translateY(${yMid}px); animation-timing-function: ease-in-out; }
                            
                            /* Shift to row 1 (bottom) */
                            69.8% { transform: translateY(${yBot}px); animation-timing-function: linear; }
                            
                            /* Rest at row 1 */
                            95% { transform: translateY(${yBot}px); opacity: 1; animation-timing-function: ease-in; }
                            
                            /* Drop out of camera view */
                            98%, 100% { transform: translateY(${yExit}px); opacity: 0; }
                        }
                    `).join('\n')}
                `}
            </style>

            {blocks.map(b => (
                <rect 
                    key={b.id}
                    x={startX + b.col * colStep} 
                    y={0} 
                    width={size} 
                    height={size} 
                    rx={rx} 
                    fill="currentColor"
                    style={{
                        animation: `tetris-drop-col-${b.dropIndex} ${totalDuration}s infinite`,
                        animationDelay: `${b.group * -rowDuration}s` 
                    }}
                />
            ))}
        </svg>
    );
}