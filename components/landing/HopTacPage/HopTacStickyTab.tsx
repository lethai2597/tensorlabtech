"use client";

import { useTranslations } from "next-intl";

type Tab = "product" | "outsource";

type HopTacStickyTabProps = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
};

export function HopTacStickyTab({ activeTab, onTabChange }: HopTacStickyTabProps) {
  const t = useTranslations("hopTac.tab");

  const tabs: { key: Tab; label: string }[] = [
    { key: "product", label: t("product") },
    { key: "outsource", label: t("outsource") },
  ];

  const handleClick = (tab: Tab) => {
    onTabChange(tab);
    const el = document.getElementById(tab);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="sticky top-16 z-40 bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-8">
        <div className="flex gap-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => handleClick(tab.key)}
                className={[
                  "relative px-6 py-4 text-sm font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-foreground",
                ].join(" ")}
              >
                {tab.label}
                {/* Active underline indicator */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
