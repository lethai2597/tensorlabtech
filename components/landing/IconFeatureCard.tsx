"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import SpotlightCard from "@/components/SpotlightCard";

type IconFeatureCardProps = {
    icon: LucideIcon;
    /** Icon text color class, e.g. "text-primary" */
    iconColorClass?: string;
    /** Icon background class, e.g. "bg-primary/12 dark:bg-primary/18" */
    iconBgClass?: string;
    title: string;
    description?: string;
    /** Optional extra content rendered after description */
    children?: ReactNode;
    className?: string;
};

export function IconFeatureCard({
    icon: Icon,
    iconColorClass = "text-primary",
    iconBgClass = "bg-primary/12 dark:bg-primary/18",
    title,
    description,
    children,
    className,
}: IconFeatureCardProps) {
    return (
        <SpotlightCard className={className ?? "h-full"}>
            <div className="space-y-3">
                <div
                    className={`size-12 rounded-2xl ${iconBgClass} flex items-center justify-center ${iconColorClass}`}
                >
                    <Icon size={24} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{title}</h3>
                {description && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {description}
                    </p>
                )}
                {children}
            </div>
        </SpotlightCard>
    );
}
