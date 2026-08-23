import type { Metadata } from "next";
import { GalleryShowcase, type GalleryShowcaseItem } from "@/components/home/gallery-showcase";
import { PageHero } from "@/components/shared/page-hero";
import { getAllGalleryImages } from "@/lib/supabase/queries";

export const metadata: Metadata = { title: "Galeri" };
export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  let images: Awaited<ReturnType<typeof getAllGalleryImages>> = [];
  let loadError: string | null = null;

  try {
    images = await getAllGalleryImages();
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Galeri yüklenemedi.";
  }

  const items: GalleryShowcaseItem[] = images.map((img) => ({
    id: img.id,
    title: "",
    href: "/galeri",
    imageUrl: img.image_url,
  }));

  return (
    <>
      <PageHero
        eyebrow="ANILARIMIZDAN SEÇKİLER"
        title="Galeri"
        description="Derneğimizle birlikte biriktirdiğimiz hatıralardan geriye kalan kareler."
        titleClassName="panel-title--compact"
        descriptionClassName="panel-copy--compact"
      />
      {loadError || images.length === 0 ? (
        <section className="mx-auto w-[min(100%-2rem,75rem)] py-8 md:w-[min(100%-4rem,75rem)] md:py-12" aria-label="Fotoğraflar">
          <p className="rounded-lg border border-dashed border-zinc-300 bg-slate-50/70 px-5 py-3.5 text-center text-sm font-medium text-slate-500">
            {loadError ? "Galeri şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyin." : "Henüz fotoğraf eklenmemiş."}
          </p>
        </section>
      ) : (
        <GalleryShowcase items={items} displayMode="grid" showAllLink={false} showHeader={false} />
      )}
    </>
  );
}
