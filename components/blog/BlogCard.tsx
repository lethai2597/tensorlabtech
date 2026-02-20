import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/blog";

interface BlogCardProps {
    post: PostMeta;
    locale: string;
}

/**
 * Card hiển thị preview bài viết trong listing page.
 */
export function BlogCard({ post, locale }: BlogCardProps) {
    const href = locale === "en" ? `/blog/${post.slug}` : `/${locale}/blog/${post.slug}`;

    return (
        <Link href={href} className="group block h-full no-underline">
            <article className="bg-surface border border-border rounded-3xl p-8 h-full transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.02]">
                {/* Title */}
                <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 line-clamp-3 leading-relaxed">
                    {post.description}
                </p>

                {/* Footer */}
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
                        Đọc thêm
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                </div>
            </article>
        </Link>
    );
}
