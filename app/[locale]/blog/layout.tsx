import type { Metadata } from "next";

type LayoutProps = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Chia sẻ kiến thức, kinh nghiệm về lập trình và công nghệ từ TensorLab",
};

export default async function BlogLayout({ children }: LayoutProps) {
    return <div className="blog-layout pb-24">{children}</div>;
}
