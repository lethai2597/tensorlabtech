import { create } from "zustand";
import { persist } from "zustand/middleware";
import { APP_CONFIG_STORAGE_KEY } from "@/lib/constants";
import type { ThemeMode } from "@/lib/theme";

export type { ThemeMode } from "@/lib/theme";

type AppConfigState = {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
};

type HydrationState = { hasHydrated: boolean };

const useAppConfigHydrationStore = create<HydrationState>(() => ({
  hasHydrated: false,
}));

export function useHasAppConfigHydrated(): boolean {
  return useAppConfigHydrationStore((s) => s.hasHydrated);
}

export { toValidTheme } from "@/lib/theme";

export const useAppConfigStore = create<AppConfigState>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (mode) => set({ theme: mode }),
    }),
    {
      name: APP_CONFIG_STORAGE_KEY,
      onRehydrateStorage: () => () => {
        useAppConfigHydrationStore.setState({ hasHydrated: true });
      },
    }
  )
);
