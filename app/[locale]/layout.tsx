import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { MainLayout } from "@/components/layout/MainLayout";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "vi")) {
    notFound();
  }
  const messages = await getMessages();
  const currentLocale = await getLocale();

  return (
    <NextIntlClientProvider locale={currentLocale} messages={messages}>
      <MainLayout>{children}</MainLayout>
    </NextIntlClientProvider>
  );
}
