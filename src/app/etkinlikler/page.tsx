import type { Metadata } from "next";
import { EventCard } from "@/components/cards/event-card";
import { PageHero } from "@/components/shared/page-hero";
import { getEvents, mapEventToCardProps } from "@/lib/supabase/queries";

export const metadata: Metadata = { title: "Etkinlikler" };
export const dynamic = "force-dynamic";

export default async function EventsPage() {
  let events: Awaited<ReturnType<typeof getEvents>> = [];
  let loadError: string | null = null;

  try {
    events = await getEvents();
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Etkinlikler yüklenemedi.";
  }

  return (
    <>
      <PageHero
        eyebrow="SIRADAKİ BULUŞMALAR"
        title="Etkinlikler"
        description="Derneğimizin gerçekleştirdiği çalışmalar ve buluşmalar."
        titleClassName="panel-title--compact"
        descriptionClassName="panel-copy--compact"
      />
      <section className="container-site section-space" aria-label="Etkinlik listesi">
        {loadError ? (
          <p className="rounded-lg border border-dashed border-zinc-300 bg-slate-50 px-6 py-10 text-center text-slate-600">
            Etkinlikler şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyin.
          </p>
        ) : events.length === 0 ? (
          <p className="rounded-lg border border-dashed border-zinc-300 bg-slate-50 px-6 py-10 text-center text-slate-600">
            Henüz yayınlanmış etkinlik bulunmuyor.
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} headingLevel="h2" {...mapEventToCardProps(event)} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
