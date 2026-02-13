import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { cookies } from "next/headers";
import { getLocale } from "next-intl/server";
import "./globals.css";
import { Providers } from "./providers";
import {
  APP_CONFIG_STORAGE_KEY,
  DEFAULT_METADATA,
  SITE_URL,
  THEME_COOKIE_NAME,
} from "@/lib/constants";
import { parseTheme } from "@/lib/theme";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_METADATA.title,
    template: `%s | ${DEFAULT_METADATA.siteName}`,
  },
  description: DEFAULT_METADATA.description,
  keywords: [...DEFAULT_METADATA.keywords],
  authors: [{ name: DEFAULT_METADATA.siteName, url: SITE_URL }],
  creator: DEFAULT_METADATA.siteName,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: "en_US",
    siteName: DEFAULT_METADATA.siteName,
    title: DEFAULT_METADATA.title,
    description: DEFAULT_METADATA.description,
    url: SITE_URL,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: DEFAULT_METADATA.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_METADATA.title,
    description: DEFAULT_METADATA.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const cookieStore = await cookies();
  const initialTheme = parseTheme(
    cookieStore.get(THEME_COOKIE_NAME)?.value
  );
  const themeScript = `
    (function() {
      try {
        var raw = localStorage.getItem('${APP_CONFIG_STORAGE_KEY}');
        var data = raw ? JSON.parse(raw) : null;
        var theme = data?.state?.theme;
        var isDark = theme === 'dark' || theme === undefined;
        document.documentElement.classList.toggle('dark', !!isDark);
      } catch (e) {}
    })();
  `;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body
        className={`${beVietnamPro.variable} antialiased bg-background text-foreground font-sans`}
      >
        <Providers initialTheme={initialTheme}>{children}</Providers>
      </body>
    </html>
  );
}
