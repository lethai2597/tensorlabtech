"use client";

import Image from "next/image";
import { Tag } from "antd";
import { ArrowUpRight, Calendar, ImageIcon, Video } from "lucide-react";

import SpotlightCard from "@/components/SpotlightCard";
import { CountdownBadge } from "@/components/events/CountdownBadge";
import { EVENT_STATUS_CONFIG } from "@/lib/eventHelpers";
import type { EventStatus } from "@/lib/eventHelpers";

type EventCardProps = {
    thumbnailUrl?: string;
    title: string;
    description: string;
    dateText: string;
    format: string;
    status: EventStatus;
    statusLabel: string;
    startAt?: string;
};

export function EventCard({
    thumbnailUrl,
    title,
    description,
    dateText,
    format,
    status,
    statusLabel,
    startAt,
}: EventCardProps) {
    return (
        <SpotlightCard className="h-full flex flex-col overflow-hidden">
            {/* Thumbnail */}
            <div className="rounded-2xl border border-border bg-background dark:bg-surface overflow-hidden mb-8 relative">
                <div className="relative aspect-video">
                    {thumbnailUrl ? (
                        <Image
                            src={thumbnailUrl}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    ) : (
                        <>
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 bg-linear-to-br from-primary/14 via-transparent to-primary/6 dark:from-primary/10 dark:to-primary/4"
                            />
                            <div className="relative h-full w-full flex items-center justify-center">
                                <div className="size-12 rounded-2xl bg-border flex items-center justify-center text-primary">
                                    <ImageIcon size={22} aria-hidden="true" />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Countdown overlay */}
                    {status === "upcoming" && (
                        <div className="absolute bottom-3 right-3 z-10">
                            <CountdownBadge startAt={startAt} />
                        </div>
                    )}

                    {/* Arrow icon */}
                    <div
                        className="absolute top-3 right-3 size-9 rounded-xl bg-surface/90 border border-border flex items-center justify-center text-primary"
                        aria-hidden="true"
                    >
                        <ArrowUpRight size={18} strokeWidth={2.5} />
                    </div>
                </div>
            </div>

            {/* Card content */}
            <div className="flex flex-col gap-4 flex-1">
                <h3 className="text-xl font-bold text-foreground">{title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                    {description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mt-auto">
                    <span className="inline-flex items-center gap-1.5">
                        <Calendar className="size-4" aria-hidden="true" />
                        {dateText}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <Video className="size-4" aria-hidden="true" />
                        {format}
                    </span>
                    <Tag
                        color={EVENT_STATUS_CONFIG[status].color}
                        bordered={false}
                    >
                        {statusLabel}
                    </Tag>
                </div>
            </div>
        </SpotlightCard>
    );
}
