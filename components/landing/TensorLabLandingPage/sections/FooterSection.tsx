"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Cpu } from "lucide-react";

import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

export function FooterSection() {
  const t = useTranslations("landing.footer");
  const reduceMotion = useReducedMotion();
  const { fadeUp, stagger } = useSectionVariants(Boolean(reduceMotion));

  const columns = [
    { key: "solutions", title: t("columns.solutions.title") },
    { key: "engagement", title: t("columns.engagement.title") },
    { key: "company", title: t("columns.company.title") },
    { key: "legal", title: t("columns.legal.title") },
  ] as const;

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      variants={stagger}
      className="bg-background border-t border-border py-16"
    >
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8">
          <motion.div
            variants={fadeUp}
            className="col-span-2 md:col-span-4 lg:col-span-4 space-y-4 mb-8 lg:mb-0"
          >
            <div className="font-bold text-lg text-primary flex items-center gap-2">
              <Cpu className="size-6" />
              <span className="text-foreground">{t("brand")}</span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
              {t("desc")}
            </p>
          </motion.div>

          {columns.map((col) => (
            <motion.div
              key={col.key}
              variants={fadeUp}
              className="space-y-4 lg:col-span-2"
            >
              <h4 className="font-semibold text-foreground text-sm">
                {col.title}
              </h4>
              <ul className="space-y-4">
                {[0, 1, 2, 3, 4].map((idx) => {
                  const labelKey = `columns.${col.key}.links.${idx}` as const;
                  const label = t(labelKey);
                  if (!label) return null;
                  return (
                    <li key={`${col.key}-${idx}`}>
                      <a
                        href="#"
                        className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-primary transition-colors"
                      >
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} {t("brand")}. {t("rights")}
          </p>
          <div className="flex items-center gap-4">
            {["LinkedIn", "GitHub", "Email"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-primary transition-colors"
              >
                {social}
            </a>
          ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

