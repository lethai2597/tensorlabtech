import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

/* ─── Types ───────────────────────────────────────────────────────── */

export interface PostMeta {
    slug: string;
    title: string;
    date: string;
    description: string;
    coverImage?: string;
    readingTime: string;
    /** Rút gọn nội dung cho listing page */
    excerpt?: string;
}

export interface Post extends PostMeta {
    /** Raw MDX content (không bao gồm frontmatter) */
    content: string;
}

/* ─── Constants ───────────────────────────────────────────────────── */

const BLOG_DIR = path.join(process.cwd(), "content/blog");

/* ─── Helpers ─────────────────────────────────────────────────────── */

function ensureBlogDir() {
    if (!fs.existsSync(BLOG_DIR)) {
        fs.mkdirSync(BLOG_DIR, { recursive: true });
    }
}

/**
 * Lấy danh sách tất cả slugs (filename không extension)
 */
export function getPostSlugs(): string[] {
    ensureBlogDir();
    return fs
        .readdirSync(BLOG_DIR)
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => f.replace(/\.mdx$/, ""));
}

/**
 * Đọc và parse 1 bài viết theo slug
 */
export function getPostBySlug(slug: string): Post {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);

    return {
        slug,
        title: data.title ?? "",
        date: data.date ?? "",
        description: data.description ?? "",
        coverImage: data.coverImage,
        readingTime: stats.text.replace("min read", "phút đọc"),
        excerpt: content.slice(0, 200).replace(/[#*>\n]/g, " ").trim() + "...",
        content,
    };
}

/**
 * Lấy tất cả bài viết, sắp xếp theo ngày mới nhất
 */
export function getAllPosts(): PostMeta[] {
    const slugs = getPostSlugs();
    return slugs
        .map((slug) => {
            const post = getPostBySlug(slug);
            // Trả về meta only (không trả content cho listing page)
            const { content: _, ...meta } = post;
            return meta;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

