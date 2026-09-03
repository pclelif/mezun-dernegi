import type { Metadata } from "next";
import { AnnouncementCard } from "@/components/cards/announcement-card";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { associationName } from "@/config/site";
import { formatTurkishDate } from "@/lib/supabase/client";
import { getAnnouncements } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

/** Kart önizlemelerinde satır sonlarının kelimeleri bitiştirmesini önler. */
function flattenContent(text: string) {
  return text.replace(/\r?\n/g, " ").replace(/\s{2,}/g, " ").trim();
}

export const metadata: Metadata = {
  title: "Duyurular",
  description: `${associationName}'nden güncel haberler, resmî duyurular ve önemli bilgilendirmeler.`,
  alternates: {
    canonical: "/duyurular-ve-etkinlikler/duyurular",
  },
  openGraph: {
    title: `Duyurular | ${associationName}`,
    description: `${associationName}'nden güncel haberler, resmî duyurular ve önemli bilgilendirmeler.`,
    url: "/duyurular-ve-etkinlikler/duyurular",
  },
};

export default async function AnnouncementsPage() {
  let announcements: Awaited<ReturnType<typeof getAnnouncements>> = [];
  let loadError: string | null = null;

  try {
    announcements = await getAnnouncements();
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Duyurular yüklenemedi.";
  }

  const items = announcements
    .filter((a) => a.slug)
    .map((a) => ({
      name: a.title,
      url: `/duyurular-ve-etkinlikler/duyurular/${a.slug}`,
    }));

  return (
    <>
      <CollectionPageJsonLd
        title={`Duyurular - ${associationName}`}
        description={`${associationName}'nden güncel haberler, resmî duyurular ve önemli bilgilendirmeler.`}
        path="/duyurular-ve-etkinlikler/duyurular"
        items={items}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Duyurular ve Etkinlikler", href: "/duyurular-ve-etkinlikler/duyurular" },
          { name: "Duyurular", href: "/duyurular-ve-etkinlikler/duyurular" },
        ]}
      />
      <PageHero
        eyebrow="GÜNCEL GELİŞMELER"
        title="Duyurular"
        description="Derneğimizden güncel haberler ve önemli bilgilendirmeler."
        titleClassName="panel-title--compact"
        descriptionClassName="panel-copy--compact"
      />
      <section className="container-site section-space" aria-label="Duyuru listesi">
        {loadError ? (
          <p className="rounded-lg border border-dashed border-zinc-300 bg-slate-50/70 px-5 py-3.5 text-center text-sm font-medium text-slate-500">
            Duyurular şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyin.
          </p>
        ) : announcements.length === 0 ? (
          <p className="rounded-lg border border-dashed border-zinc-300 bg-slate-50/70 px-5 py-3.5 text-center text-sm font-medium text-slate-500">
            Henüz yayınlanmış duyuru bulunmuyor.
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {announcements.map((announcement) => {
              const imageUrls =
                announcement.images && announcement.images.length > 0
                  ? announcement.images
                  : announcement.image_url
                  ? [announcement.image_url]
                  : [];
              return (
                <AnnouncementCard
                  key={announcement.id}
                  title={announcement.title}
                  date={formatTurkishDate(announcement.date) || "Tarih belirtilmedi"}
                  dateTime={announcement.date ?? undefined}
                  summary={flattenContent(announcement.content || "")}
                  href={`/duyurular-ve-etkinlikler/duyurular/${announcement.slug}?from=duyurular`}
                  imageUrls={imageUrls}
                  showImage={true}
                />
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
