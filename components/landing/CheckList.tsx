"use client";

import { CheckCircle2 } from "lucide-react";

type CheckListProps = {
    items: string[];
    /** Icon color class, default "text-success" */
    colorClass?: string;
    /** Text size: "sm" renders text-sm, "base" renders text-base */
    size?: "sm" | "base";
};

export function CheckList({
    items,
    colorClass = "text-success",
    size = "base",
}: CheckListProps) {
    const textClass =
        size === "sm"
            ? "text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed"
            : "text-zinc-600 dark:text-zinc-300 text-base leading-relaxed";
    const iconSizeClass = size === "sm" ? "size-4" : "size-5";
    const gapClass = size === "sm" ? "space-y-3" : "space-y-4";

    return (
        <ul className={gapClass}>
            {items.map((item, i) => (
                <li key={i} className={`flex gap-3 ${textClass}`}>
                    <CheckCircle2
                        className={`${iconSizeClass} ${colorClass} shrink-0 mt-0.5`}
                    />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}
