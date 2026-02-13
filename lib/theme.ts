import type { ThemeConfig } from "antd";

export type ThemeMode = "light" | "dark";

/** Parse giá trị cookie/SSR: hợp lệ thì trả theme, không thì undefined */
export function parseTheme(value: string | undefined): ThemeMode | undefined {
  if (value === "dark" || value === "light") return value;
  return undefined;
}

/** Ép giá trị (kể cả "system" cũ từ localStorage) thành ThemeMode hợp lệ */
export function toValidTheme(value: string): ThemeMode {
  return value === "dark" || value === "light" ? value : "light";
}

/** Token Ant Design dùng chung: Button, Input, Select, form controls */
export const antdThemeConfig: ThemeConfig = {
  token: {
    fontFamily: "var(--font-be-vietnam-pro), sans-serif",

    // --color-primary inline trong app/globals.css
    colorPrimary: "#2563eb",
    colorInfo: "#2563eb",
    sizeUnit: 6,
    borderRadius: 12,
    controlHeightSM: 32,
    controlHeight: 40,
    controlHeightLG: 48,

    // Custom border width
    lineWidth: 1.5,

    // --color-border light trong app/globals.css
    colorBorder: "#f4f4f5",
  },
  components: {
    Alert: {
      defaultPadding: "16px",
      withDescriptionPadding: "16px",
    },
    Button: {
      defaultShadow: "none",
      primaryShadow: "none",
    },
    Input: {
      boxShadow: "none",
    },
  },
};

/** Override token khi dark: nền đen hoàn toàn */
export const antdDarkTokenOverrides: ThemeConfig["token"] = {
  // --color-surface dark trong app/globals.css
  colorBgContainer: "#121213",

  // --color-border dark trong app/globals.css
  colorBorder: "#27272a80",

  boxShadow: "none",
  boxShadowSecondary: "none",
  boxShadowTertiary: "none",
};
