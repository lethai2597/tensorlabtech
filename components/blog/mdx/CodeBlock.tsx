"use client";

import React from "react";

/**
 * Wraps <pre> blocks from MDX with styled container.
 * MDX tự động wrap code fences trong <pre><code>…</code></pre>
 */
export function CodeBlock(props: React.HTMLAttributes<HTMLPreElement>) {
    const { children, ...rest } = props;

    // Trích xuất language từ className của <code> element
    let language = "";
    if (React.isValidElement(children)) {
        const codeProps = children.props as { className?: string };
        const match = codeProps.className?.match(/language-(\w+)/);
        if (match) language = match[1];
    }

    return (
        <div className="my-6 rounded-2xl overflow-hidden border border-border">
            {/* Header bar */}
            {language && (
                <div className="flex items-center justify-between px-4 py-2 bg-border/50 border-b border-border">
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                        {language}
                    </span>
                </div>
            )}

            {/* Code content */}
            <pre
                className="overflow-x-auto p-4 bg-background text-sm leading-relaxed font-mono"
                {...rest}
            >
                {children}
            </pre>
        </div>
    );
}
