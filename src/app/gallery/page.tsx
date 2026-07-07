import type { Metadata } from "next";
import Link from "next/link";
import { getGalleryAlbums } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "A visual look at the life of Maranatha Christian Church — worship services, events, ministries, and community moments.",
  openGraph: { title: "Gallery | Maranatha Christian Church", url: "/gallery" },
};

export default async function GalleryPage() {
  const albums = await getGalleryAlbums();

  return (
    <div className="min-h-screen bg-[#090909]">
      <div className="mx-auto max-w-6xl px-6 py-16">

        <div className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-gold/25 bg-gold/[0.06] px-5 py-2">
            <span className="block h-px w-5 bg-gold/40" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/80">Visual Life</span>
            <span className="block h-px w-5 bg-gold/40" />
          </div>
          <h1 className="gold-metallic mb-5 font-serif text-5xl font-bold leading-tight lg:text-6xl">
            Photo Gallery
          </h1>
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
            <div className="h-1.5 w-1.5 rotate-45 border border-gold/40" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-500">
            Moments from worship services, outreach events, and church family life.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => (
            <Link
              key={album.id}
              href={`/gallery/${album.slug}`}
              className="group rounded-2xl border border-white/[0.07] bg-[#111111] p-6 transition-all duration-300 hover:border-gold/20 hover:bg-[#141414]"
            >
              <div className="mb-4 flex h-40 items-center justify-center rounded-xl border border-white/[0.05] bg-[#0d0d0d]">
                <svg className="h-10 w-10 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="mb-2 font-serif text-xl font-semibold text-neutral-100 group-hover:text-gold transition-colors duration-200">
                {album.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-neutral-600">
                <span>{album.year}</span>
                <span>·</span>
                <span>{album.imageUrls.length} photos</span>
              </div>
              <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold/50 transition-colors duration-200 group-hover:text-gold">
                View Album
                <svg className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
