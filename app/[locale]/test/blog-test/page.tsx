import { getPostBySlug } from "@/lib/blog";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Callout } from "@/components/blog/mdx/Callout";
import { Heading } from "@/components/blog/mdx/Heading";
import { CodeBlock } from "@/components/blog/mdx/CodeBlock";

const mdxComponents = {
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <Heading level={2} {...props} />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <Heading level={3} {...props} />
    ),
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
        <CodeBlock {...props} />
    ),
    Callout,
};

export default async function TestBlogPage() {
    try {
        const post = getPostBySlug("deploy-du-an-website-a-z");

        const { content: mdxContent } = await compileMDX({
            source: post.content,
            components: mdxComponents,
            options: {
                mdxOptions: {
                    remarkPlugins: [remarkGfm],
                },
            },
        });

        return (
            <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
                <h1>{post.title}</h1>
                <p>Date: {post.date}</p>
                <hr />
                <div>{mdxContent}</div>
            </div>
        );
    } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        const stack = error instanceof Error ? error.stack : "";
        return (
            <div style={{ padding: "2rem" }}>
                <h1 style={{ color: "red" }}>Error</h1>
                <pre>{msg}</pre>
                <pre>{stack}</pre>
            </div>
        );
    }
}
