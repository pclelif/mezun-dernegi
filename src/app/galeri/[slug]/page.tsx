import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatTurkishDate } from "@/lib/supabase/client";
import { getGalleryBySlug, getGalleryImages } from "@/lib/supabase/queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const gallery = await getGalleryBySlug(slug);
    if (!gallery) return { title: "Albüm bulunamadı" };
    return { title: gallery.title };
  } catch {
    return { title: "Galeri" };
  }
}

export default async function GalleryAlbumPage({ params }: PageProps) {
  const { slug } = await params;
  let gallery = null;
  try {
    gallery = await getGalleryBySlug(slug);
  } catch {
    notFound();
  }
  if (!gallery) notFound();

  let images: Awaited<ReturnType<typeof getGalleryImages>> = [];
  try {
    images = await getGalleryImages(gallery.id);
  } catch {
    images = [];
  }

  const placeholders = images.length > 0 ? images : Array.from({ length: 6 }, (_, index) => ({ id: `ph-${index}`, image_url: "" }));

  return (
    <article>
      <section className="border-b border-zinc-200 bg-slate-50">
        <div className="mx-auto w-[min(100%-2rem,75rem)] py-10 md:w-[min(100%-4rem,75rem)] md:py-14">
          <Link
            href="/galeri"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 transition-colors hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Geri Dön
          </Link>

          <div className="mt-8 max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-950 md:text-4xl">{gallery.title}</h1>
            <p className="mt-3 text-sm text-slate-500">
              <time dateTime={gallery.date ?? undefined}>{formatTurkishDate(gallery.date) || "Tarih yok"}</time>
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(100%-2rem,75rem)] py-12 md:w-[min(100%-4rem,75rem)] md:py-16" aria-label="Albüm fotoğrafları">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {placeholders.map((item) => (
            <div
              key={"id" in item ? item.id : item.image_url}
              className="aspect-square rounded-lg bg-slate-200 bg-cover bg-center"
              style={"image_url" in item && item.image_url ? { backgroundImage: `url(${item.image_url})` } : undefined}
              aria-hidden="true"
            />
          ))}
        </div>
      </section>
    </article>
  );
}
