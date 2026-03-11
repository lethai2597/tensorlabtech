"use client";

import { useState, useEffect } from "react";
import { Button } from "antd";
import { Menu as MenuIcon, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const items = [
    { key: "home", label: t("home"), href: "/" },
    { key: "capabilities", label: t("capabilities"), href: "/capabilities" },
    { key: "partnership", label: t("engagement"), href: "/partnership" },
    { key: "projects", label: t("projects"), href: "/projects" },
    { key: "blog", label: "Blog", href: "/blog" },
    { key: "team", label: t("team"), href: "/team" },
    // { key: "events", label: t("events"), href: "/events" },
    { key: "contact", label: t("contact"), href: "/contact" },
  ] as const;

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <header className="border-b border-border h-16 fixed top-0 left-0 right-0 z-50 bg-surface/30 backdrop-blur-md">
        <div className="flex items-center justify-between h-full container mx-auto px-4 md:px-8">
          <Link
            href="/"
            className="font-bold text-lg text-primary flex items-center gap-2"
          >
            <BrandLogo size={28} />
            <span className="text-foreground">TensorLab</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {items.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-foreground transition-colors"
                onClick={handleNavClick}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <div id="mobile-menu-toggle">
              <Button
                icon={mobileOpen ? <X size={18} /> : <MenuIcon size={18} />}
                aria-label="Toggle menu"
                onClick={() => setMobileOpen((v) => !v)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu-overlay"
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            background: "color-mix(in srgb, var(--background) 97%, transparent)",
            backdropFilter: "blur(20px)",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              padding: "24px 20px",
            }}
          >
            <ul style={{ listStyle: "none", margin: 0, padding: 0, flex: 1 }}>
              {items.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <li
                    key={item.key}
                    style={{
                      animation: `slideUp 0.3s ease-out ${index * 0.04}s both`,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={handleNavClick}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "14px 16px",
                        borderRadius: 12,
                        fontSize: 16,
                        fontWeight: 500,
                        textDecoration: "none",
                        transition: "all 0.2s",
                        color: isActive ? "#3b82f6" : "var(--foreground)",
                        opacity: isActive ? 1 : 0.6,
                        background: isActive
                          ? "rgba(59, 130, 246, 0.1)"
                          : "transparent",
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Bottom section */}
            <div
              style={{
                borderTop: "1px solid var(--border)",
                paddingTop: 16,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <BrandLogo size={20} />
              <span style={{ color: "var(--foreground)", opacity: 0.5, fontSize: 13 }}>
                TensorLab © {new Date().getFullYear()}
              </span>
            </div>
          </nav>

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(12px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @media (prefers-reduced-motion: reduce) {
              @keyframes fadeIn {
                from { opacity: 1; }
                to { opacity: 1; }
              }
              @keyframes slideUp {
                from { opacity: 1; transform: none; }
                to { opacity: 1; transform: none; }
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
