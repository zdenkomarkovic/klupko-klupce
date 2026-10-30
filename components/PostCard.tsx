import Image from "next/image";
import Link from "next/link";
import { urlFor, type PostSummary } from "@/lib/sanity";

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("sr-Latn-RS", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link
      href={`/${post.section}/${post.slug}`}
      className="group block bg-muted p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      {post.coverImage && (
        <div className="relative mb-5 aspect-[4/3] overflow-hidden">
          <Image
            src={urlFor(post.coverImage).width(800).height(600).url()}
            alt={post.coverImage.alt || post.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <p className="mb-2 text-sm uppercase tracking-widest opacity-60">
        {post.section} · {formatDate(post.publishedAt)}
      </p>
      <h3 className="mb-2 text-2xl font-semibold text-primary">{post.title}</h3>
      {post.excerpt && (
        <p className="text-base opacity-80 line-clamp-3">{post.excerpt}</p>
      )}
    </Link>
  );
}
