"use client";

import { Button, Tag } from "antd";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Calendar, ExternalLink, ImageIcon, Video } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { getEventStatus, formatEventDateLong, EVENT_STATUS_CONFIG } from "@/lib/eventHelpers";
import { useSectionVariants } from "@/lib/landingMotion";
import { CountdownBadge } from "@/components/events/CountdownBadge";

/* ---------- types ---------- */

type Props = {
  thumbnailUrl?: string;
  title: string;
  startAt?: string;
  registrationUrl?: string;
  backLabel: string;
  priceLabel: string;
  calendarLabel: string;
  registerLabel: string;
  dateLabel: string;
  formatLabel: string;
  formatValue: string;
  statusLabel?: string;
};

/* ---------- component ---------- */

export function EventDetailHeroClient({
  thumbnailUrl,
  title,
  startAt,
  registrationUrl,
  backLabel,
  priceLabel,
  calendarLabel,
  registerLabel,
  dateLabel,
  formatLabel,
  formatValue,
  statusLabel,
}: Props) {
  const shouldReduceMotion = useReducedMotion();
  const { fadeUp } = useSectionVariants(Boolean(shouldReduceMotion));

  const status = getEventStatus(startAt);
  const dateValue = startAt ? formatEventDateLong(startAt) : "Đang mở";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: shouldReduceMotion
        ? undefined
        : { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  } as const;

  const thumbnailVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, scale: 1 }
      : { opacity: 0, scale: 0.98 },
    visible: shouldReduceMotion
      ? { opacity: 1, scale: 1 }
      : { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const } },
  };

  return (
    <header className="py-4 md:py-8">
      <div className="container mx-auto px-4 md:px-8">
        {/* Thumbnail — taller on mobile to fit overlay content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={thumbnailVariants}
          className="relative max-w-6xl mx-auto aspect-[3/4] sm:aspect-[4/3] md:aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden border border-border"
        >
          {/* Background image or placeholder */}
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1152px"
              priority
            />
          ) : (
            <div className="absolute inset-0">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-br from-primary/30 via-primary/20 to-primary/25"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-12 rounded-2xl bg-border flex items-center justify-center text-primary">
                  <ImageIcon size={22} aria-hidden="true" />
                </div>
              </div>
            </div>
          )}

          {/* Dark overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40"
          />

          {/* Back link */}
          <div className="absolute top-3 left-3 md:top-8 md:left-8 z-10">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {backLabel}
            </Link>
          </div>

          {/* Center content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-8 gap-3 md:gap-4"
          >
            {/* Price tag — top */}
            <motion.div variants={fadeUp}>
              <Tag color="success" bordered={false} className="rounded-xl! text-sm! px-4! py-1! mr-0!">
                {priceLabel}
              </Tag>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              className="text-2xl text-4xl md:text-5xl font-semibold text-white leading-tight max-w-4xl"
            >
              {title}
            </motion.h1>

            {/* Event info — stacked on mobile, row on desktop */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-1 sm:gap-2 md:gap-8 text-white/90 text-sm"
            >
              <div className="flex items-center justify-center gap-2">
                <Calendar className="size-4 shrink-0" aria-hidden="true" />
                <span className="text-white/70">{dateLabel}:</span>
                <span className="font-medium">{dateValue}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Video className="size-4 shrink-0" aria-hidden="true" />
                <span className="text-white/70">{formatLabel}:</span>
                <span className="font-medium">{formatValue}</span>
              </div>
            </motion.div>

            {/* Countdown or Status */}
            <motion.div variants={fadeUp}>
              {status === "upcoming" ? (
                <CountdownBadge startAt={startAt} />
              ) : statusLabel ? (
                <Tag
                  color={EVENT_STATUS_CONFIG[status].color}
                  bordered={false}
                  className="rounded-xl! text-sm! px-4! py-1! mr-0!"
                >
                  {statusLabel}
                </Tag>
              ) : null}
            </motion.div>

            {/* Registration button */}
            {registrationUrl && (
              <motion.div variants={fadeUp}>
                <Button
                  type="primary"
                  size="large"
                  href={registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<ExternalLink className="size-4" />}
                  className="rounded-xl! font-semibold! shadow-lg shadow-primary/25 mt-4"
                >
                  {registerLabel}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
