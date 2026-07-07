import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/cms/content";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#090909]">
      <div className="mx-auto max-w-3xl px-6 py-16">

        <Link
          href="/blog-devotionals"
          className="mb-10 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold/60 transition-colors hover:text-gold"
        >
          <svg className="h-3 w-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          All Posts
        </Link>

        <div className="mb-5 flex flex-wrap gap-2">
          {post!.tags.map((tag) => (
            <span
              key={`${post!.id}-${tag}`}
              className="rounded-full border border-gold/20 bg-gold/[0.07] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/80"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="gold-metallic mb-6 font-serif text-5xl font-bold leading-tight lg:text-6xl">
          {post!.title}
        </h1>

        <div className="mb-10 flex items-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-gold/40 to-transparent" />
          <div className="h-1 w-1 rotate-45 border border-gold/40" />
          <div className="h-px w-16 bg-gradient-to-l from-gold/40 to-transparent" />
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-[#111111] p-8">
          <p className="text-lg leading-relaxed text-neutral-400">{post!.body}</p>
        </div>
      </div>
    </div>
  );
}
