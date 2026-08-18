import { ArrowRight, CalendarDays, Megaphone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReturnButton } from "@/components/shared/ReturnButton";
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
    <div className="min-h-[80vh] bg-slate-100/70 px-4 py-8 sm:py-12 flex items-center justify-center">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xl transition-all">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-zinc-100 bg-slate-50/80 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-lg bg-red-50 text-[#ec1c24]">
              <Megaphone className="size-4" />
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#ec1c24]">
              Duyuru Detayı
            </span>
          </div>

          <ReturnButton defaultHref="/duyurular" defaultLabel="Duyurulara Dön" />
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-5">
          {/* Optional Image */}
          {announcement.image_url ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-100 bg-slate-50 shadow-xs">
              <Image
                src={announcement.image_url}
                alt={`${announcement.title} duyuru görseli`}
                fill
                sizes="(max-width: 640px) 100vw, 650px"
                className="object-cover"
              />
            </div>
          ) : null}

          {/* Date Badge */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <CalendarDays className="size-4 text-[#ec1c24]" />
            <time dateTime={announcement.date ?? undefined}>
              {formatTurkishDate(announcement.date) || "Tarih belirtilmedi"}
            </time>
          </div>

          {/* Title */}
          <h1 className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl leading-snug">
            {announcement.title}
          </h1>

          {/* Content */}
          <div className="rounded-xl border border-zinc-100 bg-slate-50/50 p-4 sm:p-5 text-sm leading-relaxed text-zinc-700 whitespace-pre-line">
            {announcement.content || "Bu duyuru için henüz detaylı açıklama eklenmemiş."}
          </div>
        </div>

        {/* Footer Actions - Left Aligned with Arrow on the Right */}
        <div className="flex items-center justify-start border-t border-zinc-100 bg-slate-50/50 px-6 py-4">
          <Link
            href="/duyurular"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ec1c24] hover:underline"
          >
            Tüm Duyuruları İncele
            <ArrowRight className="size-3.5 text-[#ec1c24] -translate-y-[0.5px]" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
