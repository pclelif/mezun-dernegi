import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 transition-colors hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Geri Dön
          </Link>

          <div className="mt-8 max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-950 md:text-4xl">{announcement.title}</h1>
            <p className="mt-4 text-sm font-semibold text-[#ec1c24] md:text-base">
              <time dateTime={announcement.date ?? undefined}>
                {formatTurkishDate(announcement.date) || "Tarih belirtilmedi"}
              </time>
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(100%-2rem,75rem)] py-12 md:w-[min(100%-4rem,75rem)] md:py-16">
        <p className="max-w-3xl text-lg leading-8 text-zinc-800 md:text-xl md:leading-9">
          {announcement.content || "Bu duyuru için henüz içerik eklenmemiş."}
        </p>
      </section>
    </article>
  );
}
