"use client";

import type { ReactNode } from "react";
import type { Variants } from "framer-motion";

import { Tag } from "antd";
import { motion } from "framer-motion";

import ShinyText from "@/components/ShinyText";

type SectionHeaderProps = {
    tag: string;
    title: string | ReactNode;
    description?: string;
    /** Pass `Boolean(useReducedMotion())` */
    reducedMotion: boolean;
    fadeUp: Variants;
    /** Override max-width container, default "max-w-2xl" */
    className?: string;
};

export function SectionHeader({
    tag,
    title,
    description,
    reducedMotion,
    fadeUp,
    className,
}: SectionHeaderProps) {
    return (
        <motion.div
            variants={fadeUp}
            className={`${className ?? "max-w-2xl"} mx-auto text-center flex flex-col items-center gap-4 mb-16`}
        >
            <Tag
                bordered={false}
                color="geekblue"
                className="rounded-full! px-3! py-0.5!"
            >
                <ShinyText
                    text={tag}
                    disabled={reducedMotion}
                    speed={2}
                    color="var(--color-primary)"
                    shineColor="rgba(255, 255, 255, 0.7)"
                />
            </Tag>
            {typeof title === "string" ? (
                <h2 className="text-3xl font-semibold text-foreground">{title}</h2>
            ) : (
                title
            )}
            {description && (
                <p className="text-zinc-500 dark:text-zinc-400">{description}</p>
            )}
        </motion.div>
    );
}
