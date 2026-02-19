import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Callout } from "@/components/blog/mdx/Callout";
import { ImageWithCaption } from "@/components/blog/mdx/ImageWithCaption";
import { Heading } from "@/components/blog/mdx/Heading";
import { CodeBlock } from "@/components/blog/mdx/CodeBlock";
import { TableOfContents } from "@/components/blog/TableOfContents";
import type { Metadata } from "next";

type PageProps = {
    params: Promise<{ locale: string; slug: string }>;
};

/* ─── MDX Components mapping ────────────────────────────────────── */

const mdxComponents = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <Heading level={1} {...props} />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <Heading level={2} {...props} />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <Heading level={3} {...props} />
    ),
    h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <Heading level={4} {...props} />
    ),
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
        <CodeBlock {...props} />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className="mb-4 leading-relaxed text-foreground/85" {...props} />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul
            className="mb-4 space-y-2 pl-6 list-disc text-foreground/85 leading-relaxed"
            {...props}
        />
    ),
    ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
        <ol
            className="mb-4 space-y-2 pl-6 list-decimal text-foreground/85 leading-relaxed"
            {...props}
        />
    ),
    li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
        <li className="pl-1" {...props} />
    ),
    strong: (props: React.HTMLAttributes<HTMLElement>) => (
        <strong className="font-semibold text-foreground" {...props} />
    ),
    blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
            className="my-6 border-l-4 border-primary/30 pl-6 italic text-foreground/70"
            {...props}
        />
    ),
    hr: () => <hr className="my-8 border-border" />,
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a
            className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            target={props.href?.startsWith("http") ? "_blank" : undefined}
            rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
            {...props}
        />
    ),
    // Custom MDX components
    Callout,
    ImageWithCaption,
    // Styled table components (GFM tables)
    table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
        <div className="my-6 overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm" {...props} />
        </div>
    ),
    thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <thead className="bg-muted/50 border-b border-border" {...props} />
    ),
    th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
        <th className="px-4 py-3 text-left font-semibold text-foreground" {...props} />
    ),
    td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
        <td className="px-4 py-3 text-foreground/85 border-t border-border" {...props} />
    ),
};

/* ─── Static params for SSG ──────────────────────────────────────── */

export async function generateStaticParams() {
    const slugs = getPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

/* ─── Metadata ───────────────────────────────────────────────────── */

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;
    try {
        const post = getPostBySlug(slug);
        return {
            title: post.title,
            description: post.description,
            openGraph: {
                title: post.title,
                description: post.description,
                type: "article",
                publishedTime: post.date,
            },
        };
    } catch {
        return { title: "Bài viết không tìm thấy" };
    }
}

/* ─── Page ────────────────────────────────────────────────────────── */

export default async function BlogPostPage({ params }: PageProps) {
    const { locale, slug } = await params;

    let post;
    try {
        post = getPostBySlug(slug);
    } catch {
        notFound();
    }

    const backHref = locale === "en" ? "/blog" : `/${locale}/blog`;

    return (
        <div className="container mx-auto px-8 py-8">
            {/* Back link */}
            <Link
                href={backHref}
                className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-primary transition-colors mb-8 no-underline"
            >
                <ArrowLeft size={16} />
                Quay lại Blog
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
                {/* Main content */}
                <article className="min-w-0">
                    {/* Article header */}
                    <header className="mb-8">
                        <h1 className="text-3xl font-semibold text-foreground mb-4">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                            <span className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                {new Date(post.date).toLocaleDateString("vi-VN", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock size={14} />
                                {post.readingTime}
                            </span>
                        </div>
                    </header>

                    {/* MDX Content */}
                    <div data-blog-content className="prose-custom max-w-none">
                        <MDXRemote
                            source={post.content}
                            components={mdxComponents}
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [remarkGfm],
                                },
                            }}
                        />
                    </div>
                </article>

                {/* Sidebar TOC (desktop only) */}
                <aside className="hidden lg:block">
                    <TableOfContents />
                </aside>
            </div>
        </div>
    );
}
