import { CalendarDays, Clock3, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventCoverImage } from "@/components/events/event-cover-image";
import { BreadcrumbJsonLd, EventJsonLd } from "@/components/seo/json-ld";
import { DetailFooterLink } from "@/components/shared/DetailFooterLink";
import { ReturnButton } from "@/components/shared/ReturnButton";
import { associationName, siteUrl } from "@/config/site";
import { formatTurkishDate } from "@/lib/supabase/client";
import { getEventBySlug } from "@/lib/supabase/queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const event = await getEventBySlug(slug);
    if (!event) return { title: "Etkinlik bulunamadı" };

    const description =
      event.description?.slice(0, 160) ||
      `${event.title} - ${associationName} Etkinliği`;
    const ogImage =
      (event.images && event.images.length > 0 ? event.images[0] : null) ||
      event.image_url ||
      `${siteUrl}/images/og-image.png`;

    return {
      title: event.title,
      description,
      alternates: {
        canonical: `/duyurular-ve-etkinlikler/etkinlikler/${slug}`,
      },
      openGraph: {
        type: "article",
        title: `${event.title} | ${associationName}`,
        description,
        url: `/duyurular-ve-etkinlikler/etkinlikler/${slug}`,
        images: [
          {
            url: ogImage,
            alt: event.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: event.title,
        description,
        images: [ogImage],
      },
    };
  } catch {
    return { title: "Etkinlik" };
  }
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let event = null;
  try {
    event = await getEventBySlug(slug);
  } catch {
    notFound();
  }
  if (!event) notFound();

  const isUpcoming = event.status !== "past";
  const photos: string[] =
    event.images && event.images.length > 0
      ? event.images
      : event.image_url
      ? [event.image_url]
      : [];

  const coverImage = photos[0] || event.image_url || null;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Duyurular ve Etkinlikler", href: "/duyurular-ve-etkinlikler/duyurular" },
          { name: "Etkinlikler", href: "/duyurular-ve-etkinlikler/etkinlikler" },
          { name: event.title, href: `/duyurular-ve-etkinlikler/etkinlikler/${slug}` },
        ]}
      />
      <EventJsonLd
        title={event.title}
        description={event.description || event.title}
        startDate={event.date}
        location={event.location}
        url={`/duyurular-ve-etkinlikler/etkinlikler/${slug}`}
        imageUrl={coverImage}
      />
      <div className="min-h-[80vh] bg-slate-100/70">
        <div className="container-site py-8 sm:py-12">
          <article className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xl transition-all">
          {/* Top Header Bar */}
          <div className="flex items-center justify-between border-b border-zinc-100 bg-slate-50/80 px-6 py-4">
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  isUpcoming ? "bg-red-100 text-red-700" : "bg-zinc-200 text-zinc-700"
                }`}
              >
                {isUpcoming ? "Yaklaşan Etkinlik" : "Geçmiş Etkinlik"}
              </span>
            </div>

            <ReturnButton defaultHref="/duyurular-ve-etkinlikler/etkinlikler" defaultLabel="Etkinliklere Dön" />
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-8 space-y-5">
            {/* Title */}
            <h1 className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl leading-snug">
              {event.title}
            </h1>

            {/* Meta Information Pills */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-slate-50 px-3 py-1.5">
                <CalendarDays className="size-3.5 text-[#ec1c24]" />
                <time dateTime={event.date ?? undefined}>{formatTurkishDate(event.date) || "Tarih belirtilmedi"}</time>
              </div>
              {event.time && (
                <div className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-slate-50 px-3 py-1.5">
                  <Clock3 className="size-3.5 text-[#ec1c24]" />
                  {event.time}
                </div>
              )}
              {event.location && (
                <div className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-slate-50 px-3 py-1.5">
                  <MapPin className="size-3.5 text-[#ec1c24]" />
                  {event.location}
                </div>
              )}
            </div>

            {/* Scaled & Balanced Cover Image */}
            {coverImage ? (
              <div className="translate-x-[1.5px]">
                <EventCoverImage photos={photos} alt={`${event.title} görseli`} />
              </div>
            ) : null}

            {/* Description */}
            <div className="rounded-xl border border-zinc-100 bg-slate-50/50 p-4 sm:p-5 text-sm leading-relaxed text-zinc-700 whitespace-pre-line">
              {event.description || "Bu etkinlik için henüz detaylı açıklama eklenmemiş."}
            </div>

          </div>

          {/* Footer Actions */}
          <DetailFooterLink href="/duyurular-ve-etkinlikler/etkinlikler" label="Tüm Etkinlikleri İncele" />
          </article>
        </div>
      </div>
    </>
  );
}
