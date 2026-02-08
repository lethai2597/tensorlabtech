export const locales = ["en", "vi"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const routing = {
  locales,
  defaultLocale,
  /** Ngôn ngữ chính (defaultLocale) không xuất hiện trên URL: / thay vì /vi */
  localePrefix: "as-needed" as const,
};
