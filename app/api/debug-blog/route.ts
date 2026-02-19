import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug") || "deploy-du-an-website-a-z";

    const results: Record<string, unknown> = {
        cwd: process.cwd(),
        nodeEnv: process.env.NODE_ENV,
        slug,
    };

    // Step 1: Check if content/blog directory exists
    const blogDir = path.join(process.cwd(), "content/blog");
    results.blogDirExists = fs.existsSync(blogDir);

    if (results.blogDirExists) {
        results.blogFiles = fs.readdirSync(blogDir);
    }

    // Step 2: Try reading the specific MDX file
    const filePath = path.join(blogDir, `${slug}.mdx`);
    results.fileExists = fs.existsSync(filePath);

    if (results.fileExists) {
        try {
            const content = fs.readFileSync(filePath, "utf-8");
            results.fileSize = content.length;
            results.filePreview = content.slice(0, 200);
        } catch (e) {
            results.fileReadError = e instanceof Error ? e.message : String(e);
        }
    }

    // Step 3: Try MDX compilation
    try {
        const { compileMDX } = await import("next-mdx-remote/rsc");
        const remarkGfm = (await import("remark-gfm")).default;

        if (results.fileExists) {
            const content = fs.readFileSync(filePath, "utf-8");
            // Extract content after frontmatter
            const matter = (await import("gray-matter")).default;
            const { content: mdxContent } = matter(content);

            const { content: compiled } = await compileMDX({
                source: mdxContent,
                options: {
                    mdxOptions: {
                        remarkPlugins: [remarkGfm],
                    },
                },
            });
            results.mdxCompiled = true;
            results.mdxType = typeof compiled;
        }
    } catch (e) {
        results.mdxCompiled = false;
        results.mdxError = e instanceof Error ? e.message : String(e);
        results.mdxStack = e instanceof Error ? e.stack : "";
    }

    return NextResponse.json(results, { status: 200 });
}
