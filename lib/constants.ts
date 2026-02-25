export const APP_NAME = "TensorLab";

/** Key localStorage cho Zustand persist store app config (theme, v.v.) */
export const APP_CONFIG_STORAGE_KEY = "tensorlab-app-config";

/** Tên cookie lưu theme để server đọc (SSR, tránh FOUC Ant Design) */
export const THEME_COOKIE_NAME = "tensorlab-theme";

/** Max-age cookie theme (giây). 1 năm */
export const THEME_COOKIE_MAX_AGE = 365 * 24 * 60 * 60;

/** Base URL site (production). Dùng cho canonical, Open Graph, sitemap. */
export const SITE_URL =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SITE_URL) ||
  "https://tensorlab.tech";

export const DEFAULT_METADATA = {
  title: "TensorLab — Đối tác công nghệ để xây & scale sản phẩm số",
  titleEn: "TensorLab — Tech partner to build & scale digital products",
  description:
    "TensorLab đồng hành từ tư vấn kiến trúc, phát triển sản phẩm đến vận hành production. Hợp tác Product hoặc Thuê Outsource — Chuyển đổi số, AI, Web3.",
  descriptionEn:
    "TensorLab partners from architecture consulting, product development to production operations. Product partnership or Outsource — Digital transformation, AI, Web3.",
  siteName: "TensorLab",
  keywords: [
    "TensorLab",
    "chuyển đổi số",
    "AI",
    "Web3",
    "product partnership",
    "outsource",
    "tech consulting",
    "digital products",
  ],
} as const;
