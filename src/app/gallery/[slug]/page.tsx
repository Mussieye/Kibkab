import { notFound } from "next/navigation";
import { getGalleryAlbumBySlug, getGalleryAlbums } from "@/lib/cms/content";
import Link from "next/link";

type GalleryAlbumPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const albums = await getGalleryAlbums();
  return albums.map((album) => ({ slug: album.slug }));
}

export default async function GalleryAlbumPage({ params }: GalleryAlbumPageProps) {
  const { slug } = await params;
  const album = await getGalleryAlbumBySlug(slug);
  if (!album) notFound();

  return (
    <div className="min-h-screen bg-[#090909]">
      <div className="mx-auto max-w-6xl px-6 py-16">

        <Link
          href="/gallery"
          className="mb-10 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold/60 transition-colors hover:text-gold"
        >
          <svg className="h-3 w-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          All Albums
        </Link>

        <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-gold/25 bg-gold/[0.06] px-4 py-1.5">
          <span className="block h-px w-4 bg-gold/40" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/80">Photo Album · {album!.year}</span>
          <span className="block h-px w-4 bg-gold/40" />
        </div>

        <h1 className="gold-metallic mb-6 font-serif text-5xl font-bold leading-tight lg:text-6xl">
          {album!.title}
        </h1>

        <div className="mb-10 flex items-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-gold/40 to-transparent" />
          <div className="h-1 w-1 rotate-45 border border-gold/40" />
          <div className="h-px w-16 bg-gradient-to-l from-gold/40 to-transparent" />
        </div>

        {album!.imageUrls.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-3">
            {album!.imageUrls.map((imageUrl) => (
              <div
                key={imageUrl}
                className="flex h-40 items-center justify-center rounded-xl border border-white/[0.07] bg-[#111111] p-3 text-center text-xs text-neutral-600"
              >
                {imageUrl}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/[0.10] bg-[#111111] p-12 text-center">
            <svg className="mx-auto mb-4 h-12 w-12 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-neutral-600">No images yet. Connect media URLs to populate this album.</p>
          </div>
        )}
      </div>
    </div>
  );
}
