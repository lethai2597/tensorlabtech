"use client";

import { useEffect, useState } from "react";

type CountdownResult = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
    label: string;
};

/**
 * Hook trả về countdown đến thời điểm target.
 * Tự update mỗi giây. Trả `isExpired = true` nếu đã qua.
 */
export function useCountdown(targetIso?: string): CountdownResult | null {
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        if (!targetIso) return;
        const id = setInterval(() => setNow(Date.now()), 1_000);
        return () => clearInterval(id);
    }, [targetIso]);

    if (!targetIso) return null;

    const diff = new Date(targetIso).getTime() - now;

    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, label: "" };
    }

    const days = Math.floor(diff / 86_400_000);
    const hours = Math.floor((diff % 86_400_000) / 3_600_000);
    const minutes = Math.floor((diff % 3_600_000) / 60_000);
    const seconds = Math.floor((diff % 60_000) / 1_000);

    const parts: string[] = [];
    if (days > 0) parts.push(`${days}d`);
    parts.push(`${String(hours).padStart(2, "0")}h`);
    parts.push(`${String(minutes).padStart(2, "0")}m`);
    parts.push(`${String(seconds).padStart(2, "0")}s`);

    return { days, hours, minutes, seconds, isExpired: false, label: parts.join(" : ") };
}
