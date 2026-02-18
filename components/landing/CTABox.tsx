"use client";

import type { ReactNode } from "react";
import type { Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { motion } from "framer-motion";

type CTABoxProps = {
    icon: LucideIcon;
    title: string;
    description: string;
    /** Render action buttons / links */
    actions: ReactNode;
    fadeUp: Variants;
};

export function CTABox({
    icon: Icon,
    title,
    description,
    actions,
    fadeUp,
}: CTABoxProps) {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden bg-surface border border-border rounded-3xl p-8 md:p-12">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/12 blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-28 -left-28 size-80 rounded-full bg-primary/10 blur-3xl"
                />

                <div className="relative text-center space-y-6">
                    <motion.div
                        variants={fadeUp}
                        className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto"
                    >
                        <Icon size={28} className="text-primary" />
                    </motion.div>

                    <motion.h2
                        variants={fadeUp}
                        className="text-2xl md:text-3xl font-bold text-foreground"
                    >
                        {title}
                    </motion.h2>

                    <motion.p
                        variants={fadeUp}
                        className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto"
                    >
                        {description}
                    </motion.p>

                    <motion.div
                        variants={fadeUp}
                        className="flex flex-wrap items-center justify-center gap-4"
                    >
                        {actions}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
