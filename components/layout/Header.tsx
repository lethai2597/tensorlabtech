"use client";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Cpu } from "lucide-react";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/vi";

  const items = [
    { key: "home", label: t("home"), href: "/" },
    { key: "capabilities", label: t("capabilities"), hash: "capabilities" },
    { key: "engagement", label: t("engagement"), hash: "engagement" },
    { key: "events", label: t("events"), href: "/events" },
    { key: "contact", label: t("contact"), href: "/contact" },
  ] as const;

  return (
    <header className="border-b border-border px-4 h-16 fixed top-0 left-0 right-0 z-50 bg-surface/30 backdrop-blur-md">
      <div className="flex items-center justify-between h-full container mx-auto px-8">
        <Link
          href="/"
          className="font-bold text-lg text-primary flex items-center gap-2"
        >
          <Cpu className="size-7" strokeWidth={2.5} />
          <span className="text-foreground">TensorLab</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {items.map((item) => {
            const isPageLink = "href" in item && item.href;
            const href =
              "hash" in item
                ? { pathname: "/" as const, hash: item.hash }
                : item.href;
            return (
              <Link
                key={item.key}
                href={href}
                className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-foreground transition-colors"
                onClick={(e) => {
                  if (!isPageLink && isHome && "hash" in item) {
                    const el = document.getElementById(item.hash);
                    if (el) {
                      e.preventDefault();
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
