import { notFound } from "next/navigation";
import { getSermonById, getSermons } from "@/lib/cms/content";
import { SEOLayout } from "@/components/seo/seo-layout";
import { SermonVideoPlayer } from "@/components/sermons/sermon-video-player";
import { SermonPhotoGallery } from "@/components/sermons/sermon-photo-gallery";

type SermonDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const sermons = await getSermons();
  return sermons.map((sermon) => ({ id: sermon.id }));
}

export default async function SermonDetailPage({ params }: SermonDetailPageProps) {
  const { id } = await params;
  const sermon = await getSermonById(id);

  if (!sermon) {
    notFound();
  }

  // Mock data for demonstration - replace with actual media URLs
  const mockVideoUrl = `/videos/sermons/2024/${id}-sermon.mp4`;
  const mockThumbnailUrl = `/images/sermons/2024/${id}/thumbnail.jpg`;
  const mockPhotos = [
    {
      id: `${id}-photo-1`,
      src: `/images/sermons/2024/${id}/gallery-1.jpg`,
      alt: `${sermon.title} - Photo 1`,
      caption: "Worship service"
    },
    {
      id: `${id}-photo-2`,
      src: `/images/sermons/2024/${id}/gallery-2.jpg`,
      alt: `${sermon.title} - Photo 2`,
      caption: "Community gathering"
    },
    {
      id: `${id}-photo-3`,
      src: `/images/sermons/2024/${id}/gallery-3.jpg`,
      alt: `${sermon.title} - Photo 3`,
      caption: "Prayer time"
    }
  ];

  return (
    <SEOLayout
      seoProps={{
        title: `${sermon.title} - Sermon - Maranatha Christian Church`,
        description: `Watch "${sermon.title}" by ${sermon.speaker} from ${sermon.date}. Join us for inspiring biblical teaching and worship.`,
        keywords: `${sermon.title}, ${sermon.speaker}, sermon, biblical teaching, Christian church, Maranatha`,
      }}
    >
      <div className="min-h-screen bg-[#090909] px-6 py-16">
        <div className="mx-auto max-w-4xl space-y-8">
        {/* Sermon Header */}
        <header className="text-center">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-gold/25 bg-gold/[0.06] px-4 py-1.5">
            <span className="block h-px w-4 bg-gold/40" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/80">Sermon</span>
            <span className="block h-px w-4 bg-gold/40" />
          </div>
          <h1 className="gold-metallic mb-5 font-serif text-4xl font-bold leading-tight lg:text-5xl">{sermon.title}</h1>
          <div className="flex items-center justify-center gap-6 text-sm text-neutral-500">
            <span><span className="text-gold/60 font-semibold uppercase tracking-wide text-[10px]">Speaker</span><br />{sermon.speaker}</span>
            <span className="h-8 w-px bg-white/[0.08]" />
            <span><span className="text-gold/60 font-semibold uppercase tracking-wide text-[10px]">Date</span><br />{sermon.date}</span>
          </div>
        </header>

        {/* Video Player */}
        <SermonVideoPlayer
          src={mockVideoUrl}
          thumbnail={mockThumbnailUrl}
          title={sermon.title}
          speaker={sermon.speaker}
          date={sermon.date}
          description={(sermon as any).description || ""}
        />

        {/* Photo Gallery */}
        <section id="photos">
          <SermonPhotoGallery
            photos={mockPhotos}
            title={`${sermon.title} - Photo Gallery`}
          />
        </section>

        {/* Additional Content */}
        <section className="rounded-2xl border border-white/[0.07] bg-[#111111] p-8">
          <h2 className="gold-metallic mb-5 font-serif text-2xl font-bold">About This Sermon</h2>
          <p className="leading-relaxed text-neutral-400">
            {(sermon as any).description || "Join us for this inspiring message from our pastor. This sermon explores important biblical truths and practical applications for daily Christian living."}
          </p>
          {sermon.tags && sermon.tags.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/60">Topics</p>
              <div className="flex flex-wrap gap-2">
                {sermon.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gold/20 bg-gold/[0.07] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
        </div>
      </div>
    </SEOLayout>
  );
}
