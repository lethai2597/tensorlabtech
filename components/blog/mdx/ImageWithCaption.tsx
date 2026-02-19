import React from "react";
import Image from "next/image";

interface ImageWithCaptionProps {
    src: string;
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
}

/**
 * Ảnh có caption cho bài viết MDX.
 *
 * Usage trong MDX:
 * ```mdx
 * <ImageWithCaption
 *   src="/blog/outsource-vs-product.png"
 *   alt="So sánh Outsource vs Product"
 *   caption="Hình minh họa sự khác biệt giữa hai mô hình"
 * />
 * ```
 */
export function ImageWithCaption({
    src,
    alt,
    caption,
    width = 800,
    height = 450,
}: ImageWithCaptionProps) {
    return (
        <figure className="my-6">
            <div className="rounded-2xl overflow-hidden border border-border">
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className="w-full h-auto object-cover"
                />
            </div>
            {caption && (
                <figcaption className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-400">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
