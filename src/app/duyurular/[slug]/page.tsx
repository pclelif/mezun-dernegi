import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatTurkishDate } from "@/lib/supabase/client";
import { getAnnouncementBySlug } from "@/lib/supabase/queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const announcement = await getAnnouncementBySlug(slug);
    if (!announcement) return { title: "Duyuru bulunamadı" };
    return { title: announcement.title };
  } catch {
    return { title: "Duyuru" };
  }
}

export default async function AnnouncementDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let announcement = null;
  try {
    announcement = await getAnnouncementBySlug(slug);
  } catch {
    notFound();
  }
  if (!announcement) notFound();

  return (
    <article>
      <section className="border-b border-zinc-200 bg-slate-50">
        <div className="mx-auto w-[min(100%-2rem,75rem)] py-10 md:w-[min(100%-4rem,75rem)] md:py-14">
          <Link
            href="/duyurular"
            className="inline-flex touch-manipulation items-center gap-2 text-sm font-semibold text-zinc-700 transition-colors hover:text-red-600 active:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span className="relative top-[1.5px]">Geri Dön</span>
          </Link>

          <div className="mt-8">
            <p className="text-sm font-semibold text-[#ec1c24] md:text-base">
              <time dateTime={announcement.date ?? undefined}>
                {formatTurkishDate(announcement.date) || "Tarih belirtilmedi"}
              </time>
            </p>
            <h1 className="mt-3 max-w-5xl text-2xl font-bold leading-tight tracking-tight text-zinc-950 md:text-3xl">
              {announcement.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(100%-2rem,75rem)] py-12 md:w-[min(100%-4rem,75rem)] md:py-16">
        <div className={announcement.image_url ? "grid items-start gap-8 lg:grid-cols-[22rem_minmax(0,1fr)]" : undefined}>
          {announcement.image_url ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-200 bg-slate-50">
              <Image
                src={announcement.image_url}
                alt={`${announcement.title} duyuru görseli`}
                fill
                sizes="(max-width: 1023px) calc(100vw - 2rem), 22rem"
                className="object-contain"
              />
            </div>
          ) : null}
          <p className="whitespace-pre-line text-base leading-7 text-zinc-700 md:text-lg md:leading-8">
            {announcement.content || "Bu duyuru için henüz içerik eklenmemiş."}
          </p>
        </div>
      </section>
    </article>
  );
}
