"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Tag } from "antd";

import { Link } from "@/i18n/navigation";
import SpotlightCard from "@/components/SpotlightCard";
import ShinyText from "@/components/ShinyText";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";
import { PROJECT_ITEMS } from "@/lib/projectData";

/* ---------- main component ---------- */

export default function ProjectsListContent() {
  const t = useTranslations("landing.projects");
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

  return (
    <div className="container mx-auto px-8 py-8 pb-24">
      {/* Page header — same structure as blog & events pages */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={landingViewport}
        variants={stagger}
        className="py-12 mb-8 flex flex-col items-center gap-4 text-center"
      >
        <motion.div variants={fadeUp}>
          <Tag
            bordered={false}
            color="geekblue"
            className="rounded-full! px-3! py-0.5!"
          >
            <ShinyText
              text={t("tag")}
              disabled={reduced}
              speed={2}
              color="var(--color-primary)"
              shineColor="rgba(255, 255, 255, 0.7)"
            />
          </Tag>
        </motion.div>
        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-5xl font-semibold text-foreground"
        >
          {t("title")}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="text-sm text-zinc-500 dark:text-zinc-400"
        >
          {t("desc")}
        </motion.p>
      </motion.div>

      {/* Projects Grid — same card style as landing section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={landingViewport}
        variants={stagger}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {PROJECT_ITEMS.map((project) => {
          const techStack: string[] = t.raw(
            `items.${project.key}.tech`,
          ) as string[];

          return (
            <motion.div key={project.key} variants={fadeUp}>
              <Link
                href={`/projects/${project.slug}`}
                className="block h-full no-underline group"
              >
                <SpotlightCard
                  spotlightColor={project.spotlightColor}
                  tabIndex={-1}
                  className="h-full cursor-pointer border-transparent transition duration-300 hover:border-border hover:-translate-y-1 p-0! overflow-hidden!"
                >
                  {/* Screenshot zone — identical to landing */}
                  <div className="relative overflow-hidden aspect-[16/9] -mb-px">
                    <Image
                      src={project.thumbnailUrl}
                      alt={t(`items.${project.key}.title`)}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top scale-[1.01] transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category badge */}
                    <span
                      className={`absolute top-4 left-4 inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm ${project.categoryBg} ${project.categoryColor}`}
                    >
                      {t(`items.${project.key}.category`)}
                    </span>

                    {/* Arrow icon on hover */}
                    <span className="absolute top-4 right-4 inline-flex items-center justify-center size-9 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>

                  {/* Info zone — identical to landing */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-xl font-bold text-foreground">
                        {t(`items.${project.key}.title`)}
                      </h2>
                      <ExternalLink className="size-4 shrink-0 text-zinc-400 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                      {t(`items.${project.key}.desc`)}
                    </p>

                    {/* Tech stack chips */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {techStack.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded-full border border-border bg-background/60 px-2.5 py-0.5 text-[11px] font-medium text-zinc-500 dark:text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
