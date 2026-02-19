import { getAllPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { BookOpen } from "lucide-react";

type PageProps = {
    params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: PageProps) {
    const { locale } = await params;
    const posts = getAllPosts();

    return (
        <div className="container mx-auto px-8 py-8 space-y-8">
            {/* Page Header */}
            <header className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <BookOpen size={20} />
                    </div>
                    <h1 className="text-3xl font-semibold">Blog</h1>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Chia sẻ kiến thức, kinh nghiệm về lập trình và công nghệ
                </p>
            </header>

            {/* Posts Grid */}
            {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.map((post) => (
                        <BlogCard key={post.slug} post={post} locale={locale} />
                    ))}
                </div>
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
