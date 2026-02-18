"use client";

import { Button, Tag } from "antd";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Code2,
  Database,
  FileText,
  FolderGit2,
  Layers,
  Lightbulb,
  Rocket,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

import SpotlightCard from "@/components/SpotlightCard";
import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { IconFeatureCard } from "@/components/landing/IconFeatureCard";
import { CheckList } from "@/components/landing/CheckList";
import { TimelineList } from "@/components/landing/TimelineList";
import type { TimelineItem } from "@/components/landing/TimelineList";
import { CTABox } from "@/components/landing/CTABox";
import { EVENT_META } from "@/app/[locale]/events/ai-application-engineer-intro/eventMeta";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

/* ---------- type guards ---------- */

type TitleDescItem = { title: string; desc: string };
type AgendaItem = { phase: string; title: string; desc: string };

function isTitleDescItems(value: unknown): value is TitleDescItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (v) => typeof v === "object" && v !== null && "title" in v && "desc" in v,
    )
  );
}

function isAgendaItems(value: unknown): value is AgendaItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (v) =>
        typeof v === "object" &&
        v !== null &&
        "phase" in v &&
        "title" in v &&
        "desc" in v,
    )
  );
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((x) => typeof x === "string");
}

/* ---------- icon sets ---------- */

const learnIcons = [Lightbulb, Layers, Code2, Rocket] as const;
const agendaIcons = [Brain, Database, Layers, Zap, Rocket, Sparkles] as const;
const resourceIcons = [FileText, Code2, FolderGit2, BookOpen] as const;

/* ---------- component ---------- */

export function AIEngineerLanding() {
  const t = useTranslations("events.items.aiAppEngineerIntro.landing");
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

  const learnRaw = t.raw("whatYouLearn.items");
  const learnItems = isTitleDescItems(learnRaw) ? learnRaw : [];

  const whoRaw = t.raw("whoShouldAttend.items");
  const whoItems = isStringArray(whoRaw) ? whoRaw : [];

  const agendaRaw = t.raw("agenda.items");
  const agendaItems = isAgendaItems(agendaRaw) ? agendaRaw : [];

  const resourcesRaw = t.raw("resources.items");
  const resourceItems = isTitleDescItems(resourcesRaw) ? resourcesRaw : [];

  const whatIsItPoints = isStringArray(t.raw("overview.cards.whatIsIt.points"))
    ? (t.raw("overview.cards.whatIsIt.points") as string[])
    : [];
  const whatCanYouDoPoints = isStringArray(t.raw("overview.cards.whatCanYouDo.points"))
    ? (t.raw("overview.cards.whatCanYouDo.points") as string[])
    : [];

  const timelineItems: TimelineItem[] = agendaItems.map((item, idx) => ({
    icon: agendaIcons[idx] ?? Brain,
    title: item.title,
    badge: item.phase,
    description: item.desc,
  }));

  return (
    <>
      {/* Overview */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={landingViewport}
        variants={stagger}
        className="relative overflow-hidden bg-background py-20 md:py-28"
      >
        <SectionBackdrop variant="cool" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <SectionHeader
            tag={t("overview.tag")}
            title={
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                <span className="bg-linear-to-r from-(--color-primary) to-(--color-info) bg-clip-text text-transparent">
                  {t("overview.title")}
                </span>
              </h2>
            }
            description={t("overview.subtitle")}
            reducedMotion={reduced}
            fadeUp={fadeUp}
            className="max-w-3xl"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div variants={fadeUp}>
              <IconFeatureCard
                icon={Brain}
                iconBgClass="bg-primary/12 dark:bg-primary/18"
                title={t("overview.cards.whatIsIt.title")}
                description={t("overview.cards.whatIsIt.desc")}
              >
                <CheckList items={whatIsItPoints} colorClass="text-primary" size="sm" />
              </IconFeatureCard>
            </motion.div>

            <motion.div variants={fadeUp}>
              <IconFeatureCard
                icon={Zap}
                iconColorClass="text-success"
                iconBgClass="bg-success/12 dark:bg-success/18"
                title={t("overview.cards.whatCanYouDo.title")}
                description={t("overview.cards.whatCanYouDo.desc")}
              >
                <CheckList items={whatCanYouDoPoints} colorClass="text-success" size="sm" />
              </IconFeatureCard>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* What You'll Learn */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={landingViewport}
        variants={stagger}
        className="relative overflow-hidden bg-background py-20 md:py-28"
      >
        <SectionBackdrop variant="primary" />
        <div className="container mx-auto px-8 relative z-10">
          <SectionHeader
            tag={t("whatYouLearn.tag")}
            title={t("whatYouLearn.title")}
            description={t("whatYouLearn.desc")}
            reducedMotion={reduced}
            fadeUp={fadeUp}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {learnItems.map((item, i) => (
              <motion.div key={i} variants={fadeUp}>
                <IconFeatureCard
                  icon={learnIcons[i] ?? Lightbulb}
                  title={item.title}
                  description={item.desc}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Who Should Attend */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={landingViewport}
        variants={stagger}
        className="relative overflow-hidden bg-background py-20 md:py-28"
      >
        <SectionBackdrop variant="neutral" />
        <div className="container mx-auto px-8 relative z-10">
          <SectionHeader
            tag={t("whoShouldAttend.tag")}
            title={t("whoShouldAttend.title")}
            reducedMotion={reduced}
            fadeUp={fadeUp}
          />

          <motion.div variants={fadeUp} className="max-w-3xl mx-auto">
            <SpotlightCard>
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-xl bg-info/12 dark:bg-info/18 flex items-center justify-center text-info">
                  <Users size={20} aria-hidden="true" />
                </div>
                <span className="text-lg font-semibold text-foreground">
                  {t("whoShouldAttend.suitableFor")}
                </span>
              </div>
              <div className="mb-6">
                <CheckList items={whoItems} />
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 italic border-t border-border pt-4">
                {t("whoShouldAttend.notFor")}
              </p>
            </SpotlightCard>
          </motion.div>
        </div>
      </motion.section>

      {/* Agenda */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={landingViewport}
        variants={stagger}
        className="relative overflow-hidden bg-background py-20 md:py-28"
      >
        <SectionBackdrop variant="cool" />
        <div className="container mx-auto px-8 relative z-10">
          <SectionHeader
            tag={t("agenda.tag")}
            title={t("agenda.title")}
            description={t("agenda.desc")}
            reducedMotion={reduced}
            fadeUp={fadeUp}
          />

          <div className="max-w-4xl mx-auto">
            <TimelineList items={timelineItems} fadeUp={fadeUp} />
          </div>
        </div>
      </motion.section>

      {/* Resources */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={landingViewport}
        variants={stagger}
        className="relative overflow-hidden bg-background py-20 md:py-28"
      >
        <SectionBackdrop variant="primary" />
        <div className="container mx-auto px-8 relative z-10">
          <SectionHeader
            tag={t("resources.tag")}
            title={t("resources.title")}
            reducedMotion={reduced}
            fadeUp={fadeUp}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {resourceItems.map((item, i) => (
              <motion.div key={i} variants={fadeUp}>
                <IconFeatureCard
                  icon={resourceIcons[i] ?? BookOpen}
                  iconColorClass="text-success"
                  iconBgClass="bg-success/12 dark:bg-success/18"
                  title={item.title}
                  description={item.desc}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={landingViewport}
        variants={stagger}
        className="relative overflow-hidden bg-background py-20 md:py-28"
      >
        <SectionBackdrop variant="neutral" />
        <div className="container mx-auto px-8 relative z-10">
          <CTABox
            icon={Rocket}
            title={t("cta.title")}
            description={t("cta.desc")}
            fadeUp={fadeUp}
            actions={
              <>
                {EVENT_META.registrationUrl && (
                  <Button
                    type="primary"
                    size="large"
                    href={EVENT_META.registrationUrl}
                    target="_blank"
                    className="px-8! text-base! font-semibold! rounded-xl! inline-flex items-center gap-2"
                  >
                    {t("cta.register")} <ArrowRight className="size-4" />
                  </Button>
                )}
                <Button
                  size="large"
                  href="https://github.com/lethai2597/learn-ai-engineer"
                  target="_blank"
                  className="px-8! text-base! font-semibold! rounded-xl! inline-flex items-center gap-2"
                >
                  {t("cta.button")} <ArrowRight className="size-4" />
                </Button>
              </>
            }
          />
        </div>
      </motion.section>
    </>
  );
}
