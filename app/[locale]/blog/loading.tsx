export default function BlogLoading() {
    return (
        <div className="container mx-auto px-8 py-8 space-y-8">
            {/* Header Skeleton */}
            <header className="space-y-4">
                <div className="h-9 w-32 animate-pulse rounded-lg bg-border/60" />
                <div className="h-5 w-80 animate-pulse rounded-lg bg-border/60" />
            </header>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-surface border border-border rounded-3xl p-8 space-y-4"
                    >
                        {/* Title */}
                        <div className="h-6 w-3/4 animate-pulse rounded-lg bg-border/60" />

                        {/* Description */}
                        <div className="space-y-2">
                            <div className="h-4 w-full animate-pulse rounded-lg bg-border/60" />
                            <div className="h-4 w-5/6 animate-pulse rounded-lg bg-border/60" />
                            <div className="h-4 w-2/3 animate-pulse rounded-lg bg-border/60" />
                        </div>

                        {/* Meta */}
                        <div className="flex gap-4 pt-2">
                            <div className="h-4 w-24 animate-pulse rounded-lg bg-border/60" />
                            <div className="h-4 w-20 animate-pulse rounded-lg bg-border/60" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
