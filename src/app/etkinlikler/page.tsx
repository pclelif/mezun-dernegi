import { EventCard } from "@/components/cards/event-card";
import { PageHero } from "@/components/shared/page-hero";
import { events } from "@/content/sample-data";
export default function Page() { return <><PageHero title="Etkinlikler" description="Yaklaşan buluşmalar ve geçmiş etkinliklerimiz." /><section className="container-site section-space grid gap-5 md:grid-cols-2">{events.map((item) => <EventCard key={item.slug} {...item} />)}</section></>; }
