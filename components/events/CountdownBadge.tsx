"use client";

import { Tag } from "antd";

import { useCountdown } from "@/hooks/useCountdown";

type CountdownBadgeProps = {
    startAt?: string;
    /** Size variant — "sm" for detail page, "xs" for card overlays */
    size?: "sm" | "xs";
};

export function CountdownBadge({ startAt, size = "sm" }: CountdownBadgeProps) {
    const cd = useCountdown(startAt);
    if (!cd || cd.isExpired) return null;

    const isSm = size === "sm";

    return (
        <Tag
            color="warning"
            bordered={false}
            className={
                isSm
                    ? "rounded-xl! text-sm! tracking-wider px-4! py-1! mr-0!"
                    : "rounded-xl! text-xs! tracking-wider m-0!"
            }
        >
            <span className="inline-flex items-center">
                {isSm && <>Còn{" "}</>}
                {cd.segments.map((seg, i) => (
                    <span key={seg.unit} className="inline-flex items-center">
                        {i > 0 && <span className="mx-0.5 opacity-60">:</span>}
                        <span style={{ display: "inline-block", width: "1.6em", textAlign: "right" }}>
                            {seg.value}
                        </span>
                        <span className="opacity-70">{seg.unit}</span>
                    </span>
                ))}
            </span>
        </Tag>
    );
}
