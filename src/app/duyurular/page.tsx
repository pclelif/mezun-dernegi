import { AnnouncementCard } from "@/components/cards/announcement-card";
import { PageHero } from "@/components/shared/page-hero";
import { announcements } from "@/content/sample-data";
export default function Page() { return <><PageHero title="Duyurular" description="Dernekten güncel haber ve bilgilendirmeler." /><section className="container-site section-space grid gap-5 md:grid-cols-2">{announcements.map((item) => <AnnouncementCard key={item.slug} {...item} />)}</section></>; }
