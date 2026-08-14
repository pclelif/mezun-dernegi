import { HomeAnnouncementsSection } from "@/components/home/home-announcements-section";
import { HomeEventsSection } from "@/components/home/home-events-section";
import { HomeHero } from "@/components/home/hero";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeAnnouncementsSection />
      <HomeEventsSection />
    </>
  );
}
