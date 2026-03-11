import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { PROJECT_ITEMS } from "@/lib/projectData";
import ProjectDetailContent from "./ProjectDetailContent";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = PROJECT_ITEMS.find((p) => p.slug === slug);
  if (!project) return {};

  const t = await getTranslations({ locale, namespace: "landing.projects" });
  const title = t(`items.${project.key}.title`);

  return {
    title: `${title} — TensorLab`,
    openGraph: {
      images: [{ url: project.thumbnailUrl, width: 1200, height: 630 }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECT_ITEMS.find((p) => p.slug === slug);

  if (!project) notFound();

  return <ProjectDetailContent slug={slug} />;
}
