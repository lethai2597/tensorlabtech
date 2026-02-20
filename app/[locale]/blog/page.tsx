import { getAllPosts } from "@/lib/blog";
import { BlogPageClient } from "@/components/blog/BlogPageClient";

type PageProps = {
    params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: PageProps) {
    const { locale } = await params;
    const posts = getAllPosts();

    return <BlogPageClient posts={posts} locale={locale} />;
}
