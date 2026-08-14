import type { Metadata } from "next";
import Link from "next/link";
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

  return (
    <>
      <PageHero title="Galeri" description="Buluşmalarımızdan ve okul yıllarından kareler." />
      <section className="mx-auto w-[min(100%-2rem,75rem)] py-12 md:w-[min(100%-4rem,75rem)] md:py-16" aria-label="Fotoğraf albümleri">
        {loadError ? (
          <p className="rounded-lg border border-dashed border-zinc-300 bg-slate-50 px-6 py-10 text-center text-slate-600">
            Galeri şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyin.
          </p>
        ) : galleries.length === 0 ? (
          <p className="rounded-lg border border-dashed border-zinc-300 bg-slate-50 px-6 py-10 text-center text-slate-600">
            Henüz albüm eklenmemiş.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {galleries.map((album) => (
              <Link
                key={album.id}
                href={`/galeri/${album.slug}`}
                className="group flex flex-col rounded-lg outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
              >
                <div
                  className="aspect-video overflow-hidden rounded-lg bg-slate-200 bg-cover bg-center transition-opacity group-hover:opacity-90"
                  style={album.cover_image_url ? { backgroundImage: `url(${album.cover_image_url})` } : undefined}
                  aria-hidden="true"
                />
                <h2 className="mt-4 text-lg font-bold text-zinc-950 group-hover:text-red-600">{album.title}</h2>
                <p className="mt-1 text-sm text-slate-500">
                  <time dateTime={album.date ?? undefined}>{formatTurkishDate(album.date) || "Tarih yok"}</time>
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
