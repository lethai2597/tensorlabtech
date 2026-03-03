"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
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
          {TEAM_MEMBERS.map((member) => {
            const socialEntries = Object.entries(member.social).filter(
              ([, url]) => !!url,
            ) as [keyof typeof SOCIAL_ICONS, string][];

            return (
              <motion.div key={member.key} variants={fadeUp}>
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
                          alt={tTeam(`members.${member.key}.name`)}
                          className="block w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-foreground">
                        {tTeam(`members.${member.key}.name`)}
                      </h3>
                      <p className="text-sm font-semibold text-primary">
                        {tTeam(`members.${member.key}.role`)}
                      </p>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
                      {tTeam(`members.${member.key}.bio`)}
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

                    {/* No CV button on landing page */}
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
