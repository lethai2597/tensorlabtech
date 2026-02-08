"use client";

import { Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");
  const tAria = useTranslations("aria");

  const items: MenuProps["items"] = routing.locales.map((loc) => ({
    key: loc,
    icon: <div className="font-bold text-sm">{loc === "vi" ? "Vi" : "En"}</div>,
    label: t(loc),
    onClick: () => router.replace(pathname, { locale: loc }),
  }));

  return (
    <Dropdown
      menu={{ items, selectedKeys: [locale] }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Button icon={<Globe />} aria-label={tAria("changeLanguage")} />
    </Dropdown>
  );
}
