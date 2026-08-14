import { ArrowRight, Megaphone } from "lucide-react";
import Link from "next/link";
import { formatTurkishDate } from "@/lib/supabase/client";
import { getAnnouncements } from "@/lib/supabase/queries";

export async function HomeAnnouncementsSection() {
  let announcements: Awaited<ReturnType<typeof getAnnouncements>> = [];

  try {
    announcements = await getAnnouncements(3);
  } catch {
    return null;
  }

  if (announcements.length === 0) return null;

  return (
    <section
      className="mb-20 border-y border-zinc-200 bg-white px-4 pb-20 pt-20 md:mb-24 md:pb-28 md:pt-28"
      aria-labelledby="home-announcements-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-12">
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-red-50 text-red-600">
              <Megaphone className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600">
                Güncel Bilgilendirmeler
              </p>
              <h2
                id="home-announcements-title"
                className="mt-1 text-2xl font-bold tracking-tight text-zinc-950 md:text-3xl"
              >
                Duyurular
              </h2>
            </div>
          </div>

          <Link
            href="/duyurular"
            className="inline-flex items-center gap-2 self-start rounded-sm text-sm font-semibold text-zinc-800 transition-colors hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600 sm:self-auto"
          >
            Tüm Duyuruları Gör
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {announcements.map((announcement) => {
            const displayDate =
              formatTurkishDate(announcement.date ?? announcement.created_at) || "Tarih belirtilmedi";

            return (
              <Link
                key={announcement.id}
                href={`/duyurular/${announcement.slug}`}
                className="group relative flex min-h-56 flex-col overflow-hidden rounded-r-xl border border-zinc-200 border-l-4 border-l-red-600 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
              >
                <span className="absolute right-4 top-4 flex size-3" aria-hidden="true">
                  <span className="absolute inline-flex size-full motion-safe:animate-ping rounded-full bg-red-500 opacity-60" />
                  <span className="relative inline-flex size-3 rounded-full bg-red-600" />
                </span>

                <time
                  dateTime={announcement.date ?? announcement.created_at}
                  className="pr-6 text-xs font-semibold uppercase tracking-wider text-red-600"
                >
                  {displayDate}
                </time>
                <h3 className="mt-4 text-lg font-bold leading-snug text-zinc-950 [overflow-wrap:anywhere]">
                  {announcement.title}
                </h3>
                {announcement.content ? (
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {announcement.content}
                  </p>
                ) : null}
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-zinc-900 transition-colors group-hover:text-red-700">
                  Duyuruyu İncele
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
