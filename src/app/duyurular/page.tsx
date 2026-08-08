import type { Metadata } from "next";
import { AnnouncementCard } from "@/components/cards/announcement-card";
import { PageHero } from "@/components/shared/page-hero";
import { announcements } from "@/content/sample-data";

export const metadata: Metadata = { title: "Duyurular" };

export default function AnnouncementsPage() {
  return (
    <>
      <PageHero title="Duyurular" description="Dernekten güncel haber ve bilgilendirmeler." />
      <section className="container-site section-space grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="Duyuru listesi">
        {announcements.map((announcement) => <AnnouncementCard key={announcement.href} {...announcement} />)}
      </section>
    </>
  );
}
