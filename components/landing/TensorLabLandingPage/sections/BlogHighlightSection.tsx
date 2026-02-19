"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "antd";

import { SectionHeader } from "@/components/landing/SectionHeader";
import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

interface BlogPost {
    slug: string;
    title: string;
    date: string;
    description: string;
    readingTime: string;
}

interface BlogHighlightSectionProps {
    posts: BlogPost[];
}

export function BlogHighlightSection({ posts }: BlogHighlightSectionProps) {
    const t = useTranslations("landing.insights");
    const shouldReduceMotion = useReducedMotion();
    const reduced = Boolean(shouldReduceMotion);
    const { fadeUp, stagger } = useSectionVariants(reduced);

    if (posts.length === 0) return null;

    return (
        <motion.section
            id="blog-highlight"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewport}
            variants={stagger}
            className="relative overflow-hidden bg-background py-20 md:py-28"
        >
            <SectionBackdrop variant="cool" />

            <div className="container mx-auto px-8 relative z-10">
                <SectionHeader
                    tag={t("tag")}
                    title={t("title")}
                    description={t("desc")}
                    reducedMotion={reduced}
                    fadeUp={fadeUp}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.map((post) => (
                        <motion.div key={post.slug} variants={fadeUp}>
                            <Link
                                href={`/blog/${post.slug}`}
                                className="group block no-underline h-full"
                            >
                                <article className="bg-surface border border-border rounded-3xl p-8 h-full transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.02] flex flex-col">
                                    <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 line-clamp-3 leading-relaxed flex-1">
                                        {post.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={14} />
                                                {new Date(post.date).toLocaleDateString("vi-VN", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock size={14} />
                                                {post.readingTime}
                                            </span>
                                        </div>

                                        <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                            {t("read")}
                                            <ArrowRight
                                                size={14}
                                                className="group-hover:translate-x-1 transition-transform"
                                            />
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* CTA - View all posts */}
                <motion.div variants={fadeUp} className="text-center mt-12">
                    <Link href="/blog">
                        <Button
                            size="large"
                            className="rounded-xl! h-11! font-semibold!"
                        >
                            {t("ctaAll")} <ArrowRight className="size-4" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    );
}
