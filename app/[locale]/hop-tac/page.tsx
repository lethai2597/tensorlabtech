import { getTranslations } from "next-intl/server";
import { HopTacPage } from "@/components/landing/HopTacPage/HopTacPage";

export async function generateMetadata() {
  const t = await getTranslations("hopTac.meta");
  return {
    title: t("title"),
    description: t("desc"),
  };
}

export default function HopTacRoute() {
  return <HopTacPage />;
}
