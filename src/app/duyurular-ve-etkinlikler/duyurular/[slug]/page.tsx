import { CalendarDays, Megaphone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { DetailFooterLink } from "@/components/shared/DetailFooterLink";
import { ReturnButton } from "@/components/shared/ReturnButton";
import { associationName, siteUrl } from "@/config/site";
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

    const description =
      announcement.content?.slice(0, 160) ||
      `${announcement.title} başlıklı duyuru - ${associationName}`;
    const ogImage = announcement.image_url || `${siteUrl}/images/og-image.png`;

    return {
      title: announcement.title,
      description,
      alternates: {
        canonical: `/duyurular-ve-etkinlikler/duyurular/${slug}`,
      },
      openGraph: {
        type: "article",
        title: `${announcement.title} | ${associationName}`,
        description,
        url: `/duyurular-ve-etkinlikler/duyurular/${slug}`,
        images: [
          {
            url: ogImage,
            alt: announcement.title,
          },
        ],
        publishedTime: announcement.date || announcement.created_at,
      },
      twitter: {
        card: "summary_large_image",
        title: announcement.title,
        description,
        images: [ogImage],
      },
    };
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
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Duyurular ve Etkinlikler", href: "/duyurular-ve-etkinlikler/duyurular" },
          { name: "Duyurular", href: "/duyurular-ve-etkinlikler/duyurular" },
          { name: announcement.title, href: `/duyurular-ve-etkinlikler/duyurular/${slug}` },
        ]}
      />
      <ArticleJsonLd
        title={announcement.title}
        description={announcement.content || announcement.title}
        datePublished={announcement.date || announcement.created_at}
        url={`/duyurular-ve-etkinlikler/duyurular/${slug}`}
        imageUrl={announcement.image_url}
      />
      <div className="min-h-[80vh] bg-slate-100/70 px-4 py-8 sm:py-12 flex items-center justify-center">
        <article className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xl transition-all">
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

            <ReturnButton defaultHref="/duyurular-ve-etkinlikler/duyurular" defaultLabel="Duyurulara Dön" />
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
                  className="object-contain"
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

          {/* Footer Actions */}
          <DetailFooterLink href="/duyurular-ve-etkinlikler/duyurular" label="Tüm Duyuruları İncele" />
        </article>
      </div>
    </>
  );
}
