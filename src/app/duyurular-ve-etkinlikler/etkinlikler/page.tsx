import type { Metadata } from "next";
import { EventCard } from "@/components/cards/event-card";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { associationName } from "@/config/site";
import { getEvents, mapEventToCardProps } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Etkinlikler",
  description: `${associationName} mezun buluşmaları, seminerler, paneller ve yaklaşan etkinlikler.`,
  alternates: {
    canonical: "/duyurular-ve-etkinlikler/etkinlikler",
  },
  openGraph: {
    title: `Etkinlikler | ${associationName}`,
    description: `${associationName} mezun buluşmaları, seminerler, paneller ve yaklaşan etkinlikler.`,
    url: "/duyurular-ve-etkinlikler/etkinlikler",
  },
};

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
      <BreadcrumbJsonLd
        items={[
          { name: "Duyurular ve Etkinlikler", href: "/duyurular-ve-etkinlikler/duyurular" },
          { name: "Etkinlikler", href: "/duyurular-ve-etkinlikler/etkinlikler" },
        ]}
      />
      <PageHero
        eyebrow="SIRADAKİ BULUŞMALAR"
        title="Etkinlikler"
        description="Derneğimizin gerçekleştirdiği çalışmalar ve buluşmalar."
        titleClassName="panel-title--compact"
        descriptionClassName="panel-copy--compact"
      />
      <section className="container-site section-space" aria-label="Etkinlik listesi">
        {loadError ? (
          <p className="rounded-lg border border-dashed border-zinc-300 bg-slate-50/70 px-5 py-3.5 text-center text-sm font-medium text-slate-500">
            Etkinlikler şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyin.
          </p>
        ) : events.length === 0 ? (
          <p className="rounded-lg border border-dashed border-zinc-300 bg-slate-50/70 px-5 py-3.5 text-center text-sm font-medium text-slate-500">
            Henüz yayınlanmış etkinlik bulunmuyor.
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => {
              const cardProps = mapEventToCardProps(event);
              return (
                <EventCard
                  key={event.id}
                  headingLevel="h2"
                  {...cardProps}
                  href={`/duyurular-ve-etkinlikler/etkinlikler/${event.slug}?from=etkinlikler`}
                />
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
