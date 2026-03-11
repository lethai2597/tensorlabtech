import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PartnershipPage } from "@/components/landing/PartnershipPage/PartnershipPage";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("partnership");
  return {
    title: t("meta.title"),
    description: t("meta.desc"),
  };
}

export default function Page() {
  return <PartnershipPage />;
}
