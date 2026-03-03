"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

import { SectionHeader } from "@/components/landing/SectionHeader";
import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";
import SpotlightCard from "@/components/SpotlightCard";
import { TEAM_MEMBERS } from "@/lib/teamData";
import { Facebook, Github, Globe, Linkedin, Twitter } from "lucide-react";

const SOCIAL_ICONS = {
  linkedin: { icon: Linkedin, label: "LinkedIn" },
  github: { icon: Github, label: "GitHub" },
  facebook: { icon: Facebook, label: "Facebook" },
  twitter: { icon: Twitter, label: "Twitter" },
  website: { icon: Globe, label: "Website" },
} as const;

const CARD_COLORS = [
  { spotlight: "rgba(37, 99, 235, 0.30)", accent: "#2563eb" },
  { spotlight: "rgba(139, 92, 246, 0.30)", accent: "#8b5cf6" },
  { spotlight: "rgba(56, 189, 248, 0.30)", accent: "#0ea5e9" },
  { spotlight: "rgba(34, 197, 94, 0.30)", accent: "#10b981" },
] as const;

export function TeamHighlightSection() {
  const t = useTranslations("landing.teamHighlight");
  const tTeam = useTranslations("teamPage");
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

  return (
    <motion.section
      id="team-highlight"
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      variants={stagger}
      className="relative overflow-hidden bg-background py-20 md:py-28"
    >
      <SectionBackdrop variant="primary" />

      <div className="container mx-auto px-8 relative z-10">
        <SectionHeader
          tag={t("tag")}
          title={t("title")}
          description={t("desc")}
          reducedMotion={reduced}
          fadeUp={fadeUp}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, idx) => {
            const socialEntries = Object.entries(member.social).filter(
              ([, url]) => !!url,
            ) as [keyof typeof SOCIAL_ICONS, string][];
            const color = CARD_COLORS[idx % CARD_COLORS.length]!;

            return (
              <motion.div key={member.key} variants={fadeUp}>
                <SpotlightCard
                  spotlightColor={color.spotlight}
                  className="h-full group cursor-default border-transparent transition duration-300 hover:border-border hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center gap-6">
                    {/* Avatar */}
                    <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden bg-border">
                      <Image
                        src={member.avatarUrl}
                        alt={tTeam(`members.${member.key}.name`)}
                        fill
                        sizes="144px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Info */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-foreground">
                        {tTeam(`members.${member.key}.name`)}
                      </h3>
                      <p className="text-sm font-semibold" style={{ color: color.accent }}>
                        {tTeam(`members.${member.key}.role`)}
                      </p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs mx-auto">
                        {tTeam(`members.${member.key}.bio`)}
                      </p>
                    </div>

                    {/* Social links */}
                    <div className="flex items-center gap-2.5">
                      {socialEntries.map(([platform, url]) => {
                        const config = SOCIAL_ICONS[platform];
                        if (!config) return null;
                        const Icon = config.icon;

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
          })}
        </div>

        {/* CTA */}
        <motion.div variants={fadeUp} className="text-center mt-10">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {t("cta")}
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
