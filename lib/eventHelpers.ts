import { EVENT_DURATION_MS } from "@/lib/eventTypes";

/* ---------- event status ---------- */

export type EventStatus = "upcoming" | "live" | "ended" | "open";

export function getEventStatus(startAt?: string): EventStatus {
    if (!startAt) return "open";
    const start = new Date(startAt).getTime();
    const now = Date.now();
    if (now < start) return "upcoming";
    if (now < start + EVENT_DURATION_MS) return "live";
    return "ended";
}

/* ---------- status display config ---------- */

export const EVENT_STATUS_CONFIG = {
    open: { color: "blue" as const },
    upcoming: { color: "gold" as const },
    live: { color: "red" as const },
    ended: { color: "default" as const },
} as const;

/* ---------- date formatting ---------- */

/** Short date: "18 thg 2, 2026" */
export function formatEventDateShort(iso: string, locale = "vi"): string {
    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(new Date(iso));
}

/** Long date with time: "18 tháng 2, 2026 20:00" */
export function formatEventDateLong(iso: string, locale = "vi"): string {
    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(iso));
}
