"use client";

import type { ReactNode } from "react";
import type { Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { motion } from "framer-motion";

import SpotlightCard from "@/components/SpotlightCard";

export type TimelineItem = {
    icon: LucideIcon;
    title: string;
    /** Badge text shown top-right of card (e.g. phase, step number) */
    badge?: string;
    description: string;
    /** Optional extra content above description (e.g. step label) */
    subheading?: ReactNode;
};

type TimelineListProps = {
    items: TimelineItem[];
    fadeUp: Variants;
};

export function TimelineList({ items, fadeUp }: TimelineListProps) {
    return (
        <div className="relative">
            {/* Vertical line */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[22px] md:left-[24px] top-6 bottom-6 w-px bg-linear-to-b from-primary/60 via-primary/20 to-transparent"
            />

            <ol className="space-y-4 md:space-y-6">
                {items.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <motion.li
                            key={idx}
                            variants={fadeUp}
                            className="grid grid-cols-[44px_1fr] md:grid-cols-[48px_1fr] gap-4 md:gap-6"
                        >
                            <div className="pt-4">
                                <div className="relative z-10 size-11 md:size-12 rounded-2xl bg-surface border border-border flex items-center justify-center text-primary">
                                    <Icon size={22} aria-hidden="true" />
                                </div>
                            </div>

                            <SpotlightCard className="group">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <div className={item.subheading ? "space-y-1" : ""}>
                                        {item.subheading}
                                        <h3 className="text-xl font-bold text-foreground">
                                            {item.title}
                                        </h3>
                                    </div>
                                    {item.badge && (
                                        <span className="inline-flex items-center justify-center rounded-full border border-border bg-border/40 px-3 py-1 text-xs font-medium text-foreground shrink-0">
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                    {item.description}
                                </p>
                            </SpotlightCard>
                        </motion.li>
                    );
                })}
            </ol>
        </div>
    );
}
