import { Heading } from "@/components/blog/mdx/Heading";
import { CodeBlock } from "@/components/blog/mdx/CodeBlock";

type Components = Record<string, React.ComponentType<React.ComponentProps<never>>>;

/**
 * Global MDX component overrides.
 * Next.js @next/mdx sử dụng file này khi render file .mdx trực tiếp.
 */
export function useMDXComponents(components: Components): Components {
    return {
        h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Heading level={1} {...props} />,
        h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Heading level={2} {...props} />,
        h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Heading level={3} {...props} />,
        h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Heading level={4} {...props} />,
        pre: (props: React.HTMLAttributes<HTMLPreElement>) => <CodeBlock {...props} />,
        ...components,
    };
}
