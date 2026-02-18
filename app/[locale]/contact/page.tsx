"use client";

import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { Suspense } from "react";
import { Tag } from "antd";

import ShinyText from "@/components/ShinyText";
import { ContactForm } from "@/components/landing/ContactForm";

const CONTACT_CHANNELS = [
    {
        key: "email",
        icon: Mail,
        value: "lethai2597@gmail.com",
        href: "mailto:lethai2597@gmail.com",
    },
    {
        key: "phone",
        icon: Phone,
        value: "0961 741 678",
        href: "tel:0961741678",
    },
    {
        key: "facebook",
        icon: MessageCircle,
        value: "Facebook",
        href: "https://www.facebook.com/lehuythaidotcom.fb/",
    },
] as const;

function ContactPageContent() {
    const t = useTranslations("contactPage");
    const searchParams = useSearchParams();
    const type = searchParams.get("type") ?? undefined;
    const shouldReduceMotion = useReducedMotion();
    const reduced = Boolean(shouldReduceMotion);

    const outerStagger = {
        hidden: {},
        show: {
            transition: reduced
                ? undefined
                : { staggerChildren: 0.18, delayChildren: 0.05 },
        },
    } as const;

    const innerStagger = {
        hidden: {},
        show: {
            transition: reduced ? undefined : { staggerChildren: 0.08 },
        },
    } as const;

    const fadeUp = {
        hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
        show: reduced
            ? { opacity: 1, y: 0 }
            : {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.6,
                    ease: [0.21, 0.47, 0.32, 0.98] as const,
                },
            },
    } as const;

    return (
        <motion.section
            initial="hidden"
            animate="show"
            variants={outerStagger}
            className="relative overflow-hidden bg-linear-to-b from-surface via-surface to-background py-20 md:py-28"
        >
            {/* Radial glows — same as Hero */}
            <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                    backgroundImage: `
            radial-gradient(800px circle at 20% 10%, color-mix(in srgb, var(--color-primary) 22%, transparent) 0%, transparent 60%),
            radial-gradient(700px circle at 85% 30%, color-mix(in srgb, var(--color-info) 18%, transparent) 0%, transparent 58%)
          `,
                }}
            />
            <div
                className="pointer-events-none absolute -top-40 -left-40 size-[500px] rounded-full opacity-20 blur-[120px]"
                style={{ background: "var(--color-primary)" }}
            />
            <div
                className="pointer-events-none absolute -right-40 -bottom-20 size-[400px] rounded-full opacity-15 blur-[100px]"
                style={{ background: "var(--color-info)" }}
            />

            <div className="container mx-auto px-8 relative z-10">
                <motion.div
                    variants={innerStagger}
                    className="max-w-2xl mx-auto text-center space-y-8"
                >
                    {/* Badge */}
                    <motion.div variants={fadeUp} className="flex justify-center">
                        <Tag
                            bordered={false}
                            color="geekblue"
                            className="px-4! py-1.5! text-sm! font-medium! rounded-full!"
                        >
                            <span className="inline-flex items-center gap-2">
                                <Mail className="size-4" aria-hidden="true" />
                                <ShinyText
                                    text={t("badge")}
                                    disabled={reduced}
                                    speed={2}
                                    color="var(--color-primary)"
                                    shineColor="rgba(255, 255, 255, 0.7)"
                                />
                            </span>
                        </Tag>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        variants={fadeUp}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight"
                    >
                        {t("title")}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        variants={fadeUp}
                        className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed"
                    >
                        {t("desc")}
                    </motion.p>

                    {/* Contact channels — inline pills */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-wrap items-center justify-center gap-3"
                    >
                        {CONTACT_CHANNELS.map((channel) => {
                            const Icon = channel.icon;
                            return (
                                <a
                                    key={channel.key}
                                    href={channel.href}
                                    target={channel.key === "facebook" ? "_blank" : undefined}
                                    rel={
                                        channel.key === "facebook"
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-surface border border-border text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                                >
                                    <Icon className="size-4 text-primary" />
                                    {channel.value}
                                </a>
                            );
                        })}
                    </motion.div>
                </motion.div>

                {/* Form card */}
                <motion.div
                    variants={fadeUp}
                    className="max-w-xl mx-auto mt-12"
                >
                    <div className="bg-surface border border-border rounded-3xl p-6 sm:p-8">
                        <div className="space-y-1 mb-6">
                            <h2 className="text-xl font-bold text-foreground">
                                {t("formTitle")}
                            </h2>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {t("formDesc")}
                            </p>
                        </div>
                        <ContactForm defaultType={type} />
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}

export default function ContactPage() {
    return (
        <Suspense>
            <div className="-mt-16">
                <ContactPageContent />
            </div>
        </Suspense>
    );
}
