export type EventMeta = {
  slug: string;
  thumbnailUrl?: string;
  title: string;
  desc: string;
  /** ISO 8601 start time, e.g. "2026-03-15T20:00:00+07:00" */
  startAt?: string;
  /** Thời lượng sự kiện tính bằng phút, mặc định 90 */
  durationMinutes?: number;
  format: string;
  /** URL đăng ký sự kiện (Google Calendar appointment, form, etc.) */
  registrationUrl?: string;
};
