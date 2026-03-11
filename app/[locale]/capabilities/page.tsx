import { getTranslations } from "next-intl/server";
import CapabilitiesListContent from "./CapabilitiesListContent";

export async function generateMetadata() {
  const t = await getTranslations("capabilityList");
  return {
    title: t("title") + " — TensorLab",
    description: t("desc"),
  };
}

export default function CapabilitiesPage() {
  return <CapabilitiesListContent />;
}
