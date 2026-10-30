import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { formatDate } from "@/components/PostCard";
import { getPost, isSection, sections, urlFor } from "@/lib/sanity";

type Props = { params: Promise<{ section: string; slug: string }> };

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section, slug } = await params;
  if (!isSection(section)) return {};
  const post = await getPost(section, slug).catch(() => null);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt || sections[section].subtitle,
    alternates: { canonical: `/${section}/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.coverImage
        ? [urlFor(post.coverImage).width(1200).height(630).url()]
        : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { section, slug } = await params;
  if (!isSection(section)) notFound();

  const post = await getPost(section, slug).catch(() => null);
  if (!post) notFound();

  // stihovi: zadrži prelome redova
  const isPoem = section === "poezija";

  return (
    <main className="container mx-auto px-6 pb-20 pt-32">
      <article className="mx-auto max-w-2xl">
        <Link
          href={`/${section}`}
          className="text-sm uppercase tracking-widest opacity-60 hover:opacity-100"
        >
          ← {sections[section].title}
        </Link>
        <h1 className="mb-3 mt-6 text-4xl font-semibold text-primary md:text-5xl">
          {post.title}
        </h1>
        <p className="mb-10 text-sm opacity-60">{formatDate(post.publishedAt)}</p>

        {post.coverImage && (
          <div className="relative mb-10 aspect-[4/3] overflow-hidden">
            <Image
              src={urlFor(post.coverImage).width(1200).height(900).url()}
              alt={post.coverImage.alt || post.title}
              fill
              priority
              sizes="(min-width: 768px) 672px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <div
          className={`space-y-5 text-lg leading-relaxed md:text-xl ${
            isPoem ? "whitespace-pre-line italic" : ""
          }`}
        >
          <PortableText
            value={post.body as never}
            components={{
              block: {
                h2: ({ children }) => (
                  <h2 className="pt-4 text-2xl font-semibold text-primary md:text-3xl">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="pt-2 text-xl font-semibold text-primary md:text-2xl">
                    {children}
                  </h3>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-primary/40 pl-5 italic opacity-80">
                    {children}
                  </blockquote>
                ),
              },
              types: {
                image: ({ value }) => (
                  <Image
                    src={urlFor(value).width(1200).url()}
                    alt={value.alt || ""}
                    width={1200}
                    height={800}
                    className="h-auto w-full"
                  />
                ),
              },
            }}
          />
        </div>
      </article>
    </main>
  );
}
