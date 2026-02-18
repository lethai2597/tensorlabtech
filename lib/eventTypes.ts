export const EVENT_DURATION_MS = 90 * 60 * 1000; // 1h30p

export type EventMeta = {
    slug: string;
    thumbnailUrl?: string;
    title: string;
    desc: string;
    /** ISO 8601 start time, e.g. "2026-04-15T09:00:00+07:00" */
    startAt?: string;
    format: string;
    /** URL đăng ký sự kiện (Google Calendar appointment, form, etc.) */
    registrationUrl?: string;
};
