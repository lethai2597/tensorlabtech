"use client";

import React, { useEffect, useState } from "react";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

/**
 * Sidebar Table of Contents — tự động extract headings từ bài viết.
 * Highlight heading đang active khi scroll.
 */
export function TableOfContents() {
    const [items, setItems] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        // Extract headings từ article content
        const article = document.querySelector("[data-blog-content]");
        if (!article) return;

        const headings = article.querySelectorAll("h2, h3");
        const tocItems: TocItem[] = Array.from(headings).map((h) => ({
            id: h.id,
            text: h.textContent?.replace(/#$/, "").trim() ?? "",
            level: parseInt(h.tagName[1]),
        }));
        setItems(tocItems);

        // Intersection Observer cho active heading
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                }
            },
            {
                rootMargin: "-80px 0px -60% 0px",
                threshold: 0,
            }
        );

        headings.forEach((h) => observer.observe(h));
        return () => observer.disconnect();
    }, []);

    if (items.length === 0) return null;

    return (
        <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto" aria-label="Mục lục">
            <p className="text-sm font-semibold text-foreground mb-4">Mục lục</p>
            <ul className="space-y-1 text-sm">
                {items.map((item) => (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            className={`
                block py-1.5 border-l-2 transition-all duration-200
                ${item.level === 3 ? "pl-6" : "pl-4"}
                ${activeId === item.id
                                    ? "border-primary text-primary font-medium"
                                    : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-foreground hover:border-border"
                                }
              `}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
