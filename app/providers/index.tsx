"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { ThemeMode } from "./ThemeProvider";
import { AntdThemeProvider } from "./ThemeProvider";
import { QueryProvider } from "./QueryProvider";

type ProvidersProps = {
  children: React.ReactNode;
  initialTheme?: ThemeMode;
};

export function Providers({ children, initialTheme }: ProvidersProps) {
  return (
    <AntdRegistry>
      <AntdThemeProvider initialTheme={initialTheme}>
        <QueryProvider>{children}</QueryProvider>
      </AntdThemeProvider>
    </AntdRegistry>
  );
}
