export default function BlogPostLoading() {
    return (
        <div className="container mx-auto px-8 py-8">
            {/* Back link skeleton */}
            <div className="h-5 w-28 animate-pulse rounded-lg bg-border/60 mb-8" />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
                {/* Main content skeleton */}
                <article className="space-y-6">
                    {/* Title */}
                    <div className="space-y-3 mb-8">
                        <div className="h-8 w-4/5 animate-pulse rounded-lg bg-border/60" />
                        <div className="h-8 w-3/5 animate-pulse rounded-lg bg-border/60" />
                        {/* Meta */}
                        <div className="flex gap-4 pt-2">
                            <div className="h-4 w-32 animate-pulse rounded-lg bg-border/60" />
                            <div className="h-4 w-24 animate-pulse rounded-lg bg-border/60" />
                        </div>
                    </div>

                    {/* Content paragraphs */}
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="space-y-3">
                            {i % 2 === 0 && (
                                <div className="h-7 w-2/5 animate-pulse rounded-lg bg-border/60" />
                            )}
                            <div className="h-4 w-full animate-pulse rounded-lg bg-border/60" />
                            <div className="h-4 w-full animate-pulse rounded-lg bg-border/60" />
                            <div className="h-4 w-5/6 animate-pulse rounded-lg bg-border/60" />
                            <div className="h-4 w-3/4 animate-pulse rounded-lg bg-border/60" />
                        </div>
                    ))}
                </article>

                {/* TOC sidebar skeleton (desktop only) */}
                <aside className="hidden lg:block space-y-3">
                    <div className="h-5 w-20 animate-pulse rounded-lg bg-border/60 mb-4" />
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-4 animate-pulse rounded-lg bg-border/60"
                            style={{ width: `${60 + Math.random() * 30}%` }}
                        />
                    ))}
                </aside>
            </div>
        </div>
    );
}
