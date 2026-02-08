"use client";

import { Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useTranslations } from "next-intl";
import type { ThemeMode } from "@/app/providers/ThemeProvider";

const themeIcons: Record<ThemeMode, React.ReactNode> = {
  light: <Sun />,
  dark: <Moon />,
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("theme");
  const tAria = useTranslations("aria");

  const items: MenuProps["items"] = [
    {
      key: "light",
      icon: <Sun className="size-4" />,
      label: t("light"),
      onClick: () => setTheme("light"),
    },
    {
      key: "dark",
      icon: <Moon className="size-4" />,
      label: t("dark"),
      onClick: () => setTheme("dark"),
    },
  ];

  return (
    <Dropdown
      menu={{ items, selectedKeys: [theme] }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Button icon={themeIcons[theme]} aria-label={tAria("switchTheme")} />
    </Dropdown>
  );
}
