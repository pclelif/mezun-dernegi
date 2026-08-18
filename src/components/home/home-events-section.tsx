import { ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";
import { EventCard } from "@/components/cards/event-card";
import { getEvents, mapEventToCardProps } from "@/lib/supabase/queries";

const textLinkClass =
  "inline-flex touch-manipulation items-center gap-2 rounded-sm text-sm font-bold text-zinc-900 hover:text-red-700 active:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600";

export async function HomeEventsSection() {
  let events: Awaited<ReturnType<typeof getEvents>> = [];
  let loadError = false;

  try {
    events = await getEvents();
  } catch {
    loadError = true;
  }

  const upcomingEvents = events.filter((event) => event.status !== "past").slice(0, 2);

  return (
    <section className="border-t border-zinc-200 bg-white px-4">
      <div className="mx-auto max-w-7xl py-14 md:py-20">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-9 -translate-y-[3px] shrink-0 place-items-center rounded-lg bg-red-50 text-red-600">
              <CalendarDays className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase leading-tight tracking-[0.02em] text-red-600">SIRADAKİ BULUŞMALAR</p>
              <h2 className="mt-0.5 text-2xl font-bold leading-tight tracking-tight text-zinc-950 md:text-[1.75rem]">Etkinlikler</h2>
            </div>
          </div>
        </div>
        <Link className={`${textLinkClass} -translate-x-[1.5px] -translate-y-[2.5px]`} href="/etkinlikler">
          Tüm Etkinlikler <ArrowRight className="size-4 text-zinc-900" aria-hidden="true" />
        </Link>
      </div>

      {upcomingEvents.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          {upcomingEvents.map((event) => (
            <EventCard
              key={event.id}
              headingLevel="h3"
              {...mapEventToCardProps(event)}
              href={`/etkinlikler/${event.slug}?from=home`}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-zinc-300 bg-slate-50 px-6 py-10 text-center text-zinc-600">
          {loadError ? "Etkinlikler şu anda yüklenemiyor." : "Henüz yaklaşan etkinlik bulunmuyor."}
        </p>
      )}
      </div>
    </section>
  );
}
