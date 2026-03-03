"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Download,
  ExternalLink,
  Facebook,
  Github,
  Globe,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Button } from "antd";

import { SectionHeader } from "@/components/landing/SectionHeader";
import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";
import SpotlightCard from "@/components/SpotlightCard";
import { TEAM_MEMBERS, TEAM_ADVISORS } from "@/lib/teamData";

import type { TeamMember } from "@/lib/teamData";

/* ---------- social icon map ---------- */

const SOCIAL_ICONS = {
  linkedin: { icon: Linkedin, label: "LinkedIn" },
  github: { icon: Github, label: "GitHub" },
  facebook: { icon: Facebook, label: "Facebook" },
  twitter: { icon: Twitter, label: "Twitter" },
  website: { icon: Globe, label: "Website" },
} as const;

/* ---------- member card ---------- */

function MemberCard({
  member,
  fadeUp,
  t,
  showCv,
}: {
  member: TeamMember;
  fadeUp: ReturnType<typeof useSectionVariants>["fadeUp"];
  t: ReturnType<typeof useTranslations>;
  showCv?: boolean;
}) {
  const socialEntries = Object.entries(member.social).filter(
    ([, url]) => !!url,
  ) as [keyof typeof SOCIAL_ICONS, string][];

  return (
    <motion.div variants={fadeUp}>
      <SpotlightCard
        spotlightColor="rgba(37, 99, 235, 0.30)"
        className="h-full group"
      >
        <div className="flex flex-col items-center text-center gap-6 py-1">
          {/* Avatar */}
          <div className="p-1 rounded-full bg-gradient-to-br from-transparent via-border to-transparent transition-all duration-300 group-hover:from-blue-500/30 group-hover:via-sky-500/30 group-hover:to-cyan-500/30">
            <div className="w-28 aspect-square shrink-0 rounded-full overflow-hidden bg-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={member.avatarUrl}
                alt={t(`members.${member.key}.name`)}
                className="block w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-foreground">
              {t(`members.${member.key}.name`)}
            </h3>
            <p className="text-sm font-semibold text-primary">
              {t(`members.${member.key}.role`)}
            </p>
          </div>

          {/* Bio */}
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
            {t(`members.${member.key}.bio`)}
          </p>

          {/* Social links */}
          <div className="flex items-center gap-2.5 pt-1">
            {socialEntries.map(([platform, url]) => {
              const config = SOCIAL_ICONS[platform];
              if (!config) return null;
              const Icon = config.icon;
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={config.label}
                  className="inline-flex items-center justify-center size-9 rounded-xl border border-border bg-background/60 text-zinc-500 dark:text-zinc-400 hover:text-primary hover:border-primary/30 transition-all duration-200"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>

          {/* CV download — only for core members */}
          {showCv && member.cvUrl && (
            <a href={member.cvUrl} download className="w-full">
              <Button
                block
                icon={<Download className="size-4" />}
                className="rounded-xl! h-9! text-xs! font-medium!"
              >
                {t("downloadCv")}
              </Button>
            </a>
          )}
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

/* ---------- advisor card (premium vertical layout) ---------- */

const ADVISOR_COLORS = [
  { spotlight: "rgba(139, 92, 246, 0.30)", accent: "#8b5cf6", hoverBorder: "hover:border-violet-500/30" },
  { spotlight: "rgba(56, 189, 248, 0.30)", accent: "#0ea5e9", hoverBorder: "hover:border-sky-500/30" },
  { spotlight: "rgba(34, 197, 94, 0.30)", accent: "#10b981", hoverBorder: "hover:border-emerald-500/30" },
] as const;

function AdvisorCard({
  advisor,
  index,
  fadeUp,
  t,
}: {
  advisor: TeamMember;
  index: number;
  fadeUp: ReturnType<typeof useSectionVariants>["fadeUp"];
  t: ReturnType<typeof useTranslations>;
}) {
  const socialEntries = Object.entries(advisor.social).filter(
    ([, url]) => !!url,
  ) as [keyof typeof SOCIAL_ICONS, string][];

  const color = ADVISOR_COLORS[index % ADVISOR_COLORS.length]!;

  return (
    <motion.div variants={fadeUp}>
      <SpotlightCard
        spotlightColor={color.spotlight}
        className="h-full group cursor-default border-transparent transition duration-300 hover:border-border hover:-translate-y-1"
      >
        <div className="flex flex-col items-center text-center gap-6">
          {/* Avatar — large, with colored border on hover */}
          <div className="p-1 rounded-full bg-gradient-to-br from-transparent via-border to-transparent transition-all duration-300 group-hover:from-violet-500/30 group-hover:via-sky-500/30 group-hover:to-emerald-500/30">
            <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden bg-border">
              <Image
                src={advisor.avatarUrl}
                alt={t(`advisors.${advisor.key}.name`)}
                fill
                sizes="144px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Info */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">
              {t(`advisors.${advisor.key}.name`)}
            </h3>
            <p className="text-sm font-semibold" style={{ color: color.accent }}>
              {t(`advisors.${advisor.key}.role`)}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs mx-auto">
              {t(`advisors.${advisor.key}.bio`)}
            </p>
          </div>

          {/* Social & website links */}
          <div className="flex items-center gap-2.5">
            {socialEntries.map(([platform, url]) => {
              const config = SOCIAL_ICONS[platform];
              if (!config) return null;
              const Icon = config.icon;

              /* Website link gets a special pill-style button */
              if (platform === "website") {
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-primary hover:border-primary/30 transition-all duration-200"
                  >
                    <ExternalLink className="size-3.5" />
                    {new URL(url).hostname.replace("www.", "")}
                  </a>
                );
              }

              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={config.label}
                  className="inline-flex items-center justify-center size-9 rounded-xl border border-border bg-background/60 text-zinc-500 dark:text-zinc-400 hover:text-primary hover:border-primary/30 transition-all duration-200"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

/* ---------- main page content ---------- */

export default function TeamContent() {
  const t = useTranslations("teamPage");
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

  return (
    <main className="bg-background py-12 md:py-20">
      {/* Members section */}
      <motion.section
        id="members"
        initial="hidden"
        whileInView="visible"
        viewport={landingViewport}
        variants={stagger}
        className="relative overflow-hidden bg-background py-16 md:py-24"
      >
        <SectionBackdrop variant="primary" />

        <div className="container mx-auto px-8 relative z-10">
          <SectionHeader
            tag={t("membersTag")}
            title={t("membersTitle")}
            description={t("membersDesc")}
            reducedMotion={reduced}
            fadeUp={fadeUp}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <MemberCard
                key={member.key}
                member={member}
                fadeUp={fadeUp}
                t={t}
                showCv
              />
            ))}
          </div>

          {/* Core team note */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {t("coreTeamNote")}
              </p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-border" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Advisors section */}
      <motion.section
        id="advisors"
        initial="hidden"
        whileInView="visible"
        viewport={landingViewport}
        variants={stagger}
        className="relative overflow-hidden bg-background py-16 md:py-24"
      >
        <SectionBackdrop variant="cool" />

        <div className="container mx-auto px-8 relative z-10">
          <SectionHeader
            tag={t("advisorsTag")}
            title={t("advisorsTitle")}
            description={t("advisorsDesc")}
            reducedMotion={reduced}
            fadeUp={fadeUp}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {TEAM_ADVISORS.map((advisor, idx) => (
              <AdvisorCard
                key={advisor.key}
                advisor={advisor}
                index={idx}
                fadeUp={fadeUp}
                t={t}
              />
            ))}
          </div>
        </div>
      </motion.section>
    </main>
  );
}
