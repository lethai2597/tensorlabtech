import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  outputFileTracingIncludes: {
    "/[locale]/blog/[slug]": ["./content/blog/**/*"],
    "/[locale]/blog": ["./content/blog/**/*"],
  },
  experimental: {
    optimizePackageImports: ["antd", "lucide-react", "framer-motion"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn4.vieclam24h.vn",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(withMDX(nextConfig));
