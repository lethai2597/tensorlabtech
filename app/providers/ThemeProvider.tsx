"use client";

import { ConfigProvider, theme as antdTheme } from "antd";
import { createContext, useContext, useEffect } from "react";
import { THEME_COOKIE_MAX_AGE, THEME_COOKIE_NAME } from "@/lib/constants";
import type { ThemeMode } from "@/lib/theme";
import {
  antdDarkTokenOverrides,
  antdThemeConfig,
  // antdDarkTokenOverrides,
  toValidTheme,
} from "@/lib/theme";
import {
  useAppConfigStore,
  useHasAppConfigHydrated,
} from "@/stores/useAppConfigStore";

export type { ThemeMode };

const InitialThemeContext = createContext<ThemeMode | undefined>(undefined);

/** initialThemeOverride: dùng khi gọi từ AntdThemeProvider (chưa có context). */
function useEffectiveTheme(initialThemeOverride?: ThemeMode) {
  const initialThemeFromContext = useContext(InitialThemeContext);
  const initialTheme = initialThemeOverride ?? initialThemeFromContext;
  const hasHydrated = useHasAppConfigHydrated();
  const themeFromStore = useAppConfigStore((s) => s.theme);
  const setTheme = useAppConfigStore((s) => s.setTheme);
  const effectiveTheme: ThemeMode = hasHydrated
    ? toValidTheme(themeFromStore)
    : initialTheme ?? "dark";
  const isDark = effectiveTheme === "dark";
  return { effectiveTheme, isDark, setTheme, themeFromStore };
}

export function useTheme() {
  const { effectiveTheme, isDark, setTheme } = useEffectiveTheme();
  return { theme: effectiveTheme, setTheme, isDark };
}

export function AntdThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme?: ThemeMode;
}) {
  const { isDark, themeFromStore } = useEffectiveTheme(initialTheme);
  const hasHydrated = useHasAppConfigHydrated();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    if (typeof document === "undefined" || !hasHydrated) return;
    document.cookie = `${THEME_COOKIE_NAME}=${themeFromStore}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`;
  }, [hasHydrated, themeFromStore]);

  return (
    <InitialThemeContext.Provider value={initialTheme}>
      <ConfigProvider
        theme={{
          ...antdThemeConfig,
          token: {
            ...antdThemeConfig.token,
            ...(isDark ? antdDarkTokenOverrides : {}),
          },
          algorithm: isDark
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </InitialThemeContext.Provider>
  );
}
