export function EventDetailSkeleton() {
    return (
        <div className="container mx-auto px-8 py-8 space-y-8">
            {/* Hero skeleton */}
            <div className="relative rounded-3xl overflow-hidden bg-border/60 animate-pulse h-64 md:h-80" />

            {/* Content skeleton */}
            <div className="max-w-3xl mx-auto space-y-6 pt-4">
                {/* Title */}
                <div className="space-y-3">
                    <div className="h-8 w-3/4 animate-pulse rounded-lg bg-border/60" />
                    <div className="h-8 w-1/2 animate-pulse rounded-lg bg-border/60" />
                </div>

                {/* Tags */}
                <div className="flex gap-2">
                    <div className="h-6 w-16 animate-pulse rounded-full bg-border/60" />
                    <div className="h-6 w-20 animate-pulse rounded-full bg-border/60" />
                    <div className="h-6 w-14 animate-pulse rounded-full bg-border/60" />
                </div>

                {/* Meta row */}
                <div className="flex gap-6 pt-2">
                    <div className="h-4 w-32 animate-pulse rounded-lg bg-border/60" />
                    <div className="h-4 w-28 animate-pulse rounded-lg bg-border/60" />
                </div>

                {/* Body paragraphs */}
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-3 pt-4">
                        <div className="h-6 w-2/5 animate-pulse rounded-lg bg-border/60" />
                        <div className="h-4 w-full animate-pulse rounded-lg bg-border/60" />
                        <div className="h-4 w-full animate-pulse rounded-lg bg-border/60" />
                        <div className="h-4 w-5/6 animate-pulse rounded-lg bg-border/60" />
                        <div className="h-4 w-3/4 animate-pulse rounded-lg bg-border/60" />
                    </div>
                ))}

                {/* CTA button */}
                <div className="h-12 w-48 animate-pulse rounded-xl bg-border/60 mt-4" />
            </div>
        </div>
    );
}
