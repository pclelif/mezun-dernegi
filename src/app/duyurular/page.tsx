import type { Metadata } from "next";
import { AnnouncementCard } from "@/components/cards/announcement-card";
import { PageHero } from "@/components/shared/page-hero";
import { formatTurkishDate } from "@/lib/supabase/client";
import { getAnnouncements } from "@/lib/supabase/queries";

export const metadata: Metadata = { title: "Duyurular" };
export const dynamic = "force-dynamic";

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
      <PageHero
        eyebrow="GÜNCEL GELİŞMELER"
        title="Duyurular"
        description="Derneğimizden güncel haberler ve önemli bilgilendirmeler."
        titleClassName="panel-title--compact"
        descriptionClassName="panel-copy--compact"
      />
      <section className="container-site section-space" aria-label="Duyuru listesi">
        {loadError ? (
          <p className="rounded-lg border border-dashed border-zinc-300 bg-slate-50 px-6 py-10 text-center text-slate-600">
            Duyurular şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyin.
          </p>
        ) : announcements.length === 0 ? (
          <p className="rounded-lg border border-dashed border-zinc-300 bg-slate-50 px-6 py-10 text-center text-slate-600">
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
                href={`/duyurular/${announcement.slug}?from=duyurular`}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
