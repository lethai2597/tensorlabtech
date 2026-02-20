export default function EventsLoading() {
    return (
        <div className="container mx-auto px-8 py-8 space-y-8">
            {/* Header Skeleton */}
            <header className="space-y-4 text-center">
                <div className="h-9 w-48 animate-pulse rounded-lg bg-border/60 mx-auto" />
                <div className="h-5 w-96 max-w-full animate-pulse rounded-lg bg-border/60 mx-auto" />
            </header>

            {/* Event Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {Array.from({ length: 2 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-surface border border-border rounded-3xl overflow-hidden"
                    >
                        {/* Image placeholder */}
                        <div className="h-48 animate-pulse bg-border/60" />

                        {/* Content */}
                        <div className="p-6 space-y-4">
                            {/* Tags */}
                            <div className="flex gap-2">
                                <div className="h-6 w-16 animate-pulse rounded-full bg-border/60" />
                                <div className="h-6 w-20 animate-pulse rounded-full bg-border/60" />
                            </div>
                            {/* Title */}
                            <div className="h-6 w-4/5 animate-pulse rounded-lg bg-border/60" />
                            {/* Description */}
                            <div className="space-y-2">
                                <div className="h-4 w-full animate-pulse rounded-lg bg-border/60" />
                                <div className="h-4 w-3/4 animate-pulse rounded-lg bg-border/60" />
                            </div>
                            {/* Meta */}
                            <div className="flex gap-4 pt-2">
                                <div className="h-4 w-28 animate-pulse rounded-lg bg-border/60" />
                                <div className="h-4 w-24 animate-pulse rounded-lg bg-border/60" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
