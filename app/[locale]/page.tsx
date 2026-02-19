import { TensorLabLandingPage } from "@/components/landing/TensorLabLandingPage";
import { getAllPosts } from "@/lib/blog";

export default async function HomePage() {
  const posts = getAllPosts().map(({ slug, title, date, description, readingTime }) => ({
    slug,
    title,
    date,
    description,
    readingTime,
  }));

  return <TensorLabLandingPage blogPosts={posts} />;
}
