"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Mail,
  Phone,
  ArrowRight,
  Circle,
} from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Button } from "antd";

import { Link, usePathname } from "@/i18n/navigation";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

const FOOTER_COLUMNS = [
  {
    key: "services",
    links: [
      { labelKey: "0", href: "/#capabilities" },
      { labelKey: "1", href: "/#engagement" },
      { labelKey: "2", href: "/#process" },
      { labelKey: "3", href: "/events" },
    ],
  },
  {
    key: "partnership",
    links: [
      { labelKey: "0", href: "/contact?type=product" },
      { labelKey: "1", href: "/contact?type=outsource" },
      { labelKey: "2", href: "/contact" },
    ],
  },
] as const;

const SOCIALS = [
  {
    label: "Email",
    href: "mailto:lethai2597@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    href: "tel:0961741678",
    icon: Phone,
  },
] as const;

export function FooterSection() {
  const t = useTranslations("landing.footer");
  const reduceMotion = useReducedMotion();
  const { fadeUp, stagger } = useSectionVariants(Boolean(reduceMotion));
  const pathname = usePathname();
  const isContactPage = pathname.startsWith("/contact");

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      variants={stagger}
      className="bg-background border-t border-border"
    >
      {/* Top accent line */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-primary), var(--color-info), transparent)",
        }}
      />

      {/* CTA banner — hidden on contact page */}
      {!isContactPage && (
        <motion.div
          variants={fadeUp}
          className="border-b border-border"
        >
          <div className="container mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                {t("cta.title")}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {t("cta.desc")}
              </p>
            </div>
            <Link href="/contact?type=product">
              <Button
                type="primary"
                size="large"
                className="h-11! px-6! text-sm! font-semibold! rounded-xl! border-0! text-white! bg-transparent! hover:opacity-90! transition-opacity! shrink-0!"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, var(--color-primary), var(--color-info))",
                }}
              >
                {t("cta.button")} <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      )}

      {/* Main footer */}
      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand */}
          <motion.div
            variants={fadeUp}
            className="col-span-2 md:col-span-4 lg:col-span-5 space-y-5"
          >
            <div className="font-bold text-lg text-primary flex items-center gap-2">
              <BrandLogo size={24} />
              <span className="text-foreground">{t("brand")}</span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
              {t("desc")}
            </p>

            {/* Status badge */}
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <Circle className="size-2 fill-green-500 text-green-500 animate-pulse" />
              <span>{t("status")}</span>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-2">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-primary transition-colors w-fit"
                >
                  <Icon className="size-4" />
                  <span>{label === "Email" ? "lethai2597@gmail.com" : "0961 741 678"}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <motion.div
              key={col.key}
              variants={fadeUp}
              className="space-y-4 lg:col-span-3"
            >
              <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">
                {t(`columns.${col.key}.title`)}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={`${col.key}-${link.labelKey}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-primary transition-colors"
                    >
                      {t(`columns.${col.key}.links.${link.labelKey}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <motion.div
        variants={fadeUp}
        className="border-t border-border"
      >
        <div className="container mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} {t("brand")}. {t("rights")}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/lehuythaidotcom.fb/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-primary transition-colors"
            >
              Facebook
            </a>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <a
              href="mailto:lethai2597@gmail.com"
              className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-primary transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
}
