import { ContentPage } from "@/components/shared/content-page";
import { contentSections } from "@/config/content";
import { getSiteContent } from "@/lib/supabase/queries";
export const dynamic = "force-dynamic";
export default async function Page() {
  const content = await getSiteContent("hakkimizda", contentSections.hakkimizda.defaults);
  return (
    <ContentPage
      eyebrow={content.about_title}
      title="Hakkımızda"
      description={content.about_text}
      titleClassName="about-page__title"
      descriptionClassName="about-page__copy"
      showContent={false}
    />
  );
}
