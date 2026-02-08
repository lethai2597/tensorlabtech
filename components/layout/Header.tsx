"use client";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Binary } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border px-4 h-16 fixed top-0 left-0 right-0 z-50 bg-surface/30 backdrop-blur-md">
      <div className="flex items-center justify-between h-full container mx-auto px-8">
        <div className="font-bold text-lg text-primary flex items-center gap-2">
          <Binary className="size-8" strokeWidth={3} />
          <span className="text-foreground">Starter</span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
