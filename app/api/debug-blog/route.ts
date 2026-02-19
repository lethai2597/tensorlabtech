import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import React from "react";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug") || "deploy-du-an-website-a-z";

    const results: Record<string, unknown> = {
        cwd: process.cwd(),
        nodeEnv: process.env.NODE_ENV,
        slug,
    };

    const blogDir = path.join(process.cwd(), "content/blog");
    const filePath = path.join(blogDir, `${slug}.mdx`);

    try {
        // Step 1: Read file
        const rawContent = fs.readFileSync(filePath, "utf-8");
        const matter = (await import("gray-matter")).default;
        const { content: mdxContent } = matter(rawContent);
        results.step1_fileRead = "OK";
        results.contentLength = mdxContent.length;

        // Step 2: Import components (same as page.tsx)
        const { Callout } = await import("@/components/blog/mdx/Callout");
        const { ImageWithCaption } = await import("@/components/blog/mdx/ImageWithCaption");
        const { Heading } = await import("@/components/blog/mdx/Heading");
        const { CodeBlock } = await import("@/components/blog/mdx/CodeBlock");
        results.step2_imports = "OK";

        // Step 3: Build components map (same as page.tsx)
        const mdxComponents: Record<string, React.ComponentType<any>> = {
            h1: (props: any) => React.createElement(Heading, { level: 1, ...props }),
            h2: (props: any) => React.createElement(Heading, { level: 2, ...props }),
            h3: (props: any) => React.createElement(Heading, { level: 3, ...props }),
            h4: (props: any) => React.createElement(Heading, { level: 4, ...props }),
            pre: (props: any) => React.createElement(CodeBlock, props),
            Callout,
            ImageWithCaption,
        };
        results.step3_components = "OK";

        // Step 4: Compile MDX with components (same as page.tsx)
        const { compileMDX } = await import("next-mdx-remote/rsc");
        const remarkGfm = (await import("remark-gfm")).default;

        const { content: compiled } = await compileMDX({
            source: mdxContent,
            components: mdxComponents,
            options: {
                mdxOptions: {
                    remarkPlugins: [remarkGfm],
                },
            },
        });
        results.step4_compile = "OK";
        results.compiledType = typeof compiled;
        results.success = true;

    } catch (e) {
        results.success = false;
        results.error = e instanceof Error ? e.message : String(e);
        results.errorStack = e instanceof Error ? e.stack?.split("\n").slice(0, 10) : "";
    }

    return NextResponse.json(results, { status: 200 });
}
