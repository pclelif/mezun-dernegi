import type { Metadata } from "next";
import { AnnouncementCard } from "@/components/cards/announcement-card";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { associationName } from "@/config/site";
import { formatTurkishDate } from "@/lib/supabase/client";
import { getAnnouncements } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

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

  return (
    <>
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
            {announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                title={announcement.title}
                date={formatTurkishDate(announcement.date) || "Tarih belirtilmedi"}
                dateTime={announcement.date ?? undefined}
                summary={announcement.content || ""}
                href={`/duyurular-ve-etkinlikler/duyurular/${announcement.slug}?from=duyurular`}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
