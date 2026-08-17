import { HomeAnnouncementsSection } from "@/components/home/home-announcements-section";
import { HomeEventsSection } from "@/components/home/home-events-section";
import { HomeFaqSection } from "@/components/home/home-faq-section";
import { HomeGallerySection } from "@/components/home/home-gallery-section";
import { HomeHero } from "@/components/home/hero";
import { contentSections } from "@/config/content";
import { getSiteContent } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getSiteContent("ana-sayfa", contentSections["ana-sayfa"].defaults);
  return (
    <>
      <HomeHero title={content.hero_title} description={content.hero_description} imageUrl={content.hero_image_url} />
      <HomeAnnouncementsSection />
      <HomeEventsSection />
      <HomeGallerySection />
      <HomeFaqSection />
    </>
  );
}
