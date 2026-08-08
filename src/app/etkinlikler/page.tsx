import { EventCard } from "@/components/cards/event-card";
import { PageHero } from "@/components/shared/page-hero";
import { events } from "@/content/sample-data";

export default function EventsPage() {
  return (
    <>
      <PageHero title="Etkinlikler" description="Yaklaşan buluşmalar ve geçmiş etkinliklerimiz." />
      <section className="container-site section-space grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="Etkinlik listesi">
        {events.map((event) => <EventCard key={event.href} {...event} />)}
      </section>
    </>
  );
}
