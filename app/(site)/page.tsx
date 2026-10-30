import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import PostCard from "@/components/PostCard";
import { getLatestPosts } from "@/lib/sanity";

export default async function Home() {
  const posts = await getLatestPosts(3).catch(() => []);

  return (
    <main>
      <Hero />
      <AboutSection />
      {posts.length > 0 && (
        <section className="container mx-auto px-6 py-20">
          <h2 className="mb-12 text-center text-3xl font-semibold text-primary md:text-4xl">
            Najnovije
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p._id} post={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
