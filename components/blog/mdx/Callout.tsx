import React from "react";
import {
    Info,
    Lightbulb,
    AlertTriangle,
    Flame,
    type LucideIcon,
} from "lucide-react";

type CalloutType = "info" | "tip" | "warning" | "danger";

interface CalloutProps {
    type?: CalloutType;
    title?: string;
    children: React.ReactNode;
}

const config: Record<
    CalloutType,
    { icon: LucideIcon; bg: string; border: string; iconColor: string }
> = {
    info: {
        icon: Info,
        bg: "bg-info/5",
        border: "border-info/30",
        iconColor: "text-info",
    },
    tip: {
        icon: Lightbulb,
        bg: "bg-success/5",
        border: "border-success/30",
        iconColor: "text-success",
    },
    warning: {
        icon: AlertTriangle,
        bg: "bg-warning/5",
        border: "border-warning/30",
        iconColor: "text-warning",
    },
    danger: {
        icon: Flame,
        bg: "bg-error/5",
        border: "border-error/30",
        iconColor: "text-error",
    },
};

/**
 * Callout box cho bài viết MDX.
 *
 * Usage trong MDX:
 * ```mdx
 * <Callout type="tip" title="Mẹo hay">
 *   Nội dung callout ở đây
 * </Callout>
 * ```
 */
export function Callout({ type = "info", title, children }: CalloutProps) {
    const { icon: Icon, bg, border, iconColor } = config[type];

    return (
        <div
            className={`my-6 rounded-2xl ${bg} border ${border} p-6 flex gap-4`}
        >
            <div className={`mt-0.5 shrink-0 ${iconColor}`}>
                <Icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
                {title && (
                    <p className="font-semibold mb-1 text-foreground">{title}</p>
                )}
                <div className="text-sm text-foreground/80 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
                    {children}
                </div>
            </div>
        </div>
    );
}
