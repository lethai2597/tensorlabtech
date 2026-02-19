"use client";

import React from "react";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    level: 1 | 2 | 3 | 4;
}

const styles: Record<number, string> = {
    1: "text-3xl font-semibold mt-12 mb-6",
    2: "text-2xl font-bold mt-10 mb-4",
    3: "text-xl font-bold mt-8 mb-3",
    4: "text-lg font-semibold mt-6 mb-2",
};

/**
 * Custom heading với anchor link tự động.
 * Cho phép click vào heading để copy link.
 */
export function Heading({ level, children, ...props }: HeadingProps) {
    const text =
        typeof children === "string"
            ? children
            : React.Children.toArray(children)
                .map((c) => (typeof c === "string" ? c : ""))
                .join("");

    const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

    const className = `${styles[level]} group scroll-mt-24 text-foreground`;

    const inner = (
        <a
            href={`#${id}`}
            className="no-underline text-foreground hover:text-primary transition-colors"
        >
            {children}
            <span className="ml-2 opacity-0 group-hover:opacity-50 transition-opacity text-primary">
                #
            </span>
        </a>
    );

    if (level === 1) return <h1 id={id} className={className} {...props}>{inner}</h1>;
    if (level === 2) return <h2 id={id} className={className} {...props}>{inner}</h2>;
    if (level === 3) return <h3 id={id} className={className} {...props}>{inner}</h3>;
    return <h4 id={id} className={className} {...props}>{inner}</h4>;
}
