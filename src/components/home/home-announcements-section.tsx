import { ArrowRight, Megaphone } from "lucide-react";
import Link from "next/link";
import { AnnouncementCard } from "@/components/cards/announcement-card";
import { formatTurkishDate } from "@/lib/supabase/client";
import { getAnnouncements } from "@/lib/supabase/queries";

const textLinkClass =
  "inline-flex touch-manipulation items-center gap-2 rounded-sm text-sm font-bold text-zinc-900 hover:text-red-700 active:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600";

export async function HomeAnnouncementsSection() {
  let announcements: Awaited<ReturnType<typeof getAnnouncements>> = [];
  let loadError = false;

  try {
    announcements = await getAnnouncements(2);
  } catch {
    loadError = true;
  }

  return (
    <section className="bg-white px-4 py-14 md:py-20" aria-labelledby="home-announcements-title">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-9 -translate-y-[3px] shrink-0 place-items-center rounded-lg bg-red-50 text-red-600">
                <Megaphone className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase leading-tight tracking-[0.02em] text-red-600">GÜNCEL GELİŞMELER</p>
                <h2 id="home-announcements-title" className="mt-0.5 text-2xl font-bold leading-tight tracking-tight text-zinc-950 md:text-[1.75rem]">
                  Duyurular
                </h2>
              </div>
            </div>
          </div>
          <Link className={textLinkClass} href="/duyurular">
            Tüm Duyurular <ArrowRight className="size-4 text-zinc-900" aria-hidden="true" />
          </Link>
        </div>

        {announcements.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                headingLevel="h3"
                title={announcement.title}
                date={formatTurkishDate(announcement.date ?? announcement.created_at) || "Tarih belirtilmedi"}
                dateTime={announcement.date ?? announcement.created_at}
                summary={announcement.content || ""}
                href={`/duyurular/${announcement.slug}`}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-zinc-300 bg-slate-50 px-6 py-10 text-center text-zinc-600">
            {loadError ? "Duyurular şu anda yüklenemiyor." : "Henüz yayınlanmış duyuru bulunmuyor."}
          </p>
        )}
      </div>
    </section>
  );
}
