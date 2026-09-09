import katex from "katex";
import "katex/dist/katex.min.css";

export default function KatexCheatSheet() {
    const examples = [
        {
            syntax: "x^2",
            label: "Powers",
            preview: "x^2",
        },
        {
            syntax: "\\frac{a}{b}",
            label: "Fractions",
            preview: "\\frac{a}{b}",
        },
        {
            syntax: "\\sqrt{x}",
            label: "Square root",
            preview: "\\sqrt{x}",
        },
        {
            syntax: "\\sqrt[3]{x}",
            label: "Nth root",
            preview: "\\sqrt[3]{x}",
        },
        {
            syntax: "\\pm",
            label: "Plus / minus",
            preview: "\\pm",
        },
        {
            syntax: "\\alpha, \\beta, \\theta",
            label: "Greek letters",
            preview:
                "\\alpha,\\ \\beta,\\ \\theta",
        },
        {
            syntax: "\\sin(x), \\cos(x)",
            label: "Trigonometry",
            preview:
                "\\sin(x),\\ \\cos(x)",
        },
        {
            syntax: "\\log(x), \\ln(x)",
            label: "Logarithms",
            preview:
                "\\log(x),\\ \\ln(x)",
        },
        {
            syntax: "\\sum_{i=1}^{n} i",
            label: "Summation",
            preview:
                "\\sum_{i=1}^{n} i",
        },
        {
            syntax: "\\prod_{i=1}^{n} i",
            label: "Product",
            preview:
                "\\prod_{i=1}^{n} i",
        },
        {
            syntax: "\\int_a^b f(x)\\,dx",
            label: "Integral",
            preview:
                "\\int_a^b f(x)\\,dx",
        },
        {
            syntax:
                "\\lim_{x \\to 0} f(x)",
            label: "Limit",
            preview:
                "\\lim_{x \\to 0} f(x)",
        },
        {
            syntax: "\\frac{dy}{dx}",
            label: "Derivative",
            preview:
                "\\frac{dy}{dx}",
        },
        {
            syntax: "|x|",
            label: "Absolute value",
            preview: "|x|",
        },
        {
            syntax: "x \\leq y",
            label: "Inequality",
            preview:
                "x \\leq y",
        },
        {
            syntax: "a \\cdot b",
            label: "Multiplication",
            preview:
                "a \\cdot b",
        },
    ];

    return (
        <div className="
            overflow-hidden
            rounded-lg
            border
            border-indigo-200
            bg-indigo-50/50
            dark:border-indigo-900
            dark:bg-indigo-950/30
        ">
            <div className="border-b border-indigo-100 px-3 py-2 dark:border-indigo-900">
                <span className="text-xs font-bold uppercase tracking-wide text-indigo-700 dark:text-indigo-400">
                    KaTeX Cheat Sheet
                </span>
            </div>

            <div className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-2">
                {examples.map((example) => {
                    let rendered;

                    try {
                        rendered = katex.renderToString(
                            example.preview,
                            {
                                displayMode: false,
                                throwOnError: false,
                            }
                        );
                    } catch {
                        rendered = example.preview;
                    }

                    return (
                        <div
                            key={example.syntax}
                            className="rounded-md border border-slate-200 bg-white p-2.5 dark:border-slate-800 dark:bg-slate-950"
                        >
                            <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                {example.label}
                            </div>

                            <div
                                className="mb-1 flex min-h-[24px] items-center text-slate-900 dark:text-slate-100"
                                dangerouslySetInnerHTML={{
                                    __html: rendered,
                                }}
                            />

                            <code className="block overflow-x-auto rounded bg-slate-100 px-2 py-1 font-mono text-[11px] text-slate-600 dark:bg-slate-900 dark:text-slate-400">
                                {example.syntax}
                            </code>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}