import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import { getPostsBySection, isSection, sections } from "@/lib/sanity";

type Props = { params: Promise<{ section: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  if (!isSection(section)) return {};
  return {
    title: sections[section].title,
    description: sections[section].subtitle,
    alternates: { canonical: `/${section}` },
  };
}

export default async function SectionPage({ params }: Props) {
  const { section } = await params;
  if (!isSection(section)) notFound();

  const posts = await getPostsBySection(section).catch(() => []);

  return (
    <main className="container mx-auto min-h-[80dvh] px-6 pb-20 pt-32">
      <header className="mx-auto mb-14 max-w-2xl text-center text-primary">
        <h1 className="mb-4 text-4xl font-semibold md:text-6xl">
          {sections[section].title}
        </h1>
        <p className="text-xl italic opacity-80">{sections[section].subtitle}</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-center opacity-70">Uskoro novi tekstovi.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p._id} post={p} />
          ))}
        </div>
      )}
    </main>
  );
}
