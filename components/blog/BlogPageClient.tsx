"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Tag } from "antd";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

import ShinyText from "@/components/ShinyText";
import { BlogCard } from "@/components/blog/BlogCard";
import type { PostMeta } from "@/lib/blog";

interface BlogPageClientProps {
    posts: PostMeta[];
    locale: string;
}

export function BlogPageClient({ posts, locale }: BlogPageClientProps) {
    const shouldReduceMotion = useReducedMotion();
    const { fadeUp, stagger } = useSectionVariants(Boolean(shouldReduceMotion));

    return (
        <div className="container mx-auto px-8 py-8">

            {/* Page header */}
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
                            text="Insights & Articles"
                            disabled={Boolean(shouldReduceMotion)}
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
                    Blog
                </motion.h1>
                <motion.p
                    variants={fadeUp}
                    className="text-sm text-zinc-500 dark:text-zinc-400"
                >
                    Chia sẻ kiến thức, kinh nghiệm về lập trình và công nghệ
                </motion.p>
            </motion.div>

            {/* Posts grid */}
            {posts.length > 0 ? (
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={landingViewport}
                    variants={stagger}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {posts.map((post) => (
                        <motion.div key={post.slug} variants={fadeUp} className="h-full">
                            <BlogCard post={post} locale={locale} />
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <div className="bg-surface border border-border rounded-3xl p-8 text-center">
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Chưa có bài viết nào. Hãy quay lại sau nhé!
                    </p>
                </div>
            )}
        </div>
    );
}
