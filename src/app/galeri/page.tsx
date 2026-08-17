import type { Metadata } from "next";
import { GalleryShowcase, type GalleryShowcaseItem } from "@/components/home/gallery-showcase";
import { PageHero } from "@/components/shared/page-hero";
import { formatTurkishDate } from "@/lib/supabase/client";
import { getGalleries } from "@/lib/supabase/queries";

export const metadata: Metadata = { title: "Galeri" };
export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  let galleries: Awaited<ReturnType<typeof getGalleries>> = [];
  let loadError: string | null = null;

  try {
    galleries = await getGalleries();
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Galeri yüklenemedi.";
  }

  const items: GalleryShowcaseItem[] = galleries.map((album) => ({
    id: album.id,
    title: album.title,
    href: `/galeri/${album.slug}`,
    imageUrl: album.cover_image_url,
    date: formatTurkishDate(album.date),
    dateTime: album.date ?? undefined,
  }));

  return (
    <>
      <PageHero
        eyebrow="Anılarımızdan Seçkiler"
        title="Galeri"
        description="Etkinliklerimizden ve buluşmalarımızdan geriye kalan güzel anılar."
        titleClassName="panel-title--compact"
        descriptionClassName="panel-copy--compact"
      />
      {loadError || galleries.length === 0 ? (
      <section className="mx-auto w-[min(100%-2rem,75rem)] py-12 md:w-[min(100%-4rem,75rem)] md:py-16" aria-label="Fotoğraf albümleri">
        {loadError ? (
          <p className="rounded-lg border border-dashed border-zinc-300 bg-slate-50 px-6 py-10 text-center text-slate-600">
            Galeri şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyin.
          </p>
        ) : galleries.length === 0 ? (
          <p className="rounded-lg border border-dashed border-zinc-300 bg-slate-50 px-6 py-10 text-center text-slate-600">
            Henüz albüm eklenmemiş.
          </p>
        ) : null}
      </section>
      ) : (
        <GalleryShowcase
          items={items}
          showAllLink={false}
          showHeader={false}
        />
      )}
    </>
  );
}
