"use client";

import { useEffect, useState } from "react";

type CountdownSegment = { value: string; unit: string };

type CountdownResult = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
    label: string;
    segments: CountdownSegment[];
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
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, label: "", segments: [] };
    }

    const days = Math.floor(diff / 86_400_000);
    const hours = Math.floor((diff % 86_400_000) / 3_600_000);
    const minutes = Math.floor((diff % 3_600_000) / 60_000);
    const seconds = Math.floor((diff % 60_000) / 1_000);

    const segments: CountdownSegment[] = [];
    if (days > 0) segments.push({ value: String(days).padStart(2, "0"), unit: "d" });
    segments.push({ value: String(hours).padStart(2, "0"), unit: "h" });
    segments.push({ value: String(minutes).padStart(2, "0"), unit: "m" });
    segments.push({ value: String(seconds).padStart(2, "0"), unit: "s" });

    const label = segments.map(s => `${s.value}${s.unit}`).join(" : ");

    return { days, hours, minutes, seconds, isExpired: false, label, segments };
}
