import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatTurkishDate } from "@/lib/supabase/client";
import { getEvents } from "@/lib/supabase/queries";

export async function HomeEventsSection() {
  let events: Awaited<ReturnType<typeof getEvents>> = [];
  let loadError: string | null = null;

  try {
    events = await getEvents(3);
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Etkinlikler yüklenemedi.";
  }

  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ec1c24]">
              Kayıtlı Oturumlar
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 md:text-3xl">
              Mezun Buluşmaları
            </h2>
          </div>
          <Link
            href="/etkinlikler"
            className="inline-flex items-center gap-2 self-start rounded-md border border-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600 sm:self-auto"
          >
            Diğer Etkinlikler
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-slate-50 px-6 py-12 text-center">
            <p className="text-base font-medium text-zinc-800">
              {loadError ? "Etkinlikler şu anda yüklenemiyor." : "Henüz yayınlanmış etkinlik bulunmuyor."}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {loadError
                ? "Bağlantıyı kontrol edip sayfayı yenilemeyi deneyin."
                : "Yeni buluşmalar eklendiğinde burada listelenecek."}
            </p>
            <Link
              href="/etkinlikler"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#ec1c24] hover:text-red-700"
            >
              Tüm etkinliklere göz at
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {events.map((event) => {
              const displayDate = formatTurkishDate(event.date);

              return (
                <article key={event.id} className="flex flex-col">
                  <div
                    className="aspect-video overflow-hidden rounded-lg bg-slate-200 bg-cover bg-center"
                    style={event.image_url ? { backgroundImage: `url(${event.image_url})` } : undefined}
                    aria-hidden="true"
                  />
                  <p className="mt-4 text-sm text-slate-500">
                    {displayDate ? <time dateTime={event.date ?? undefined}>{displayDate}</time> : null}
                    {displayDate && event.location ? " · " : null}
                    {event.location}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-zinc-950">{event.title}</h3>
                  {event.description ? (
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{event.description}</p>
                  ) : null}
                  <Link
                    href={`/etkinlikler/${event.slug}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#ec1c24] transition-colors hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
                  >
                    Detayları İncele
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
