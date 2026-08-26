import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { ContentPage } from "@/components/shared/content-page";
import { contentSections } from "@/config/content";
import { associationName } from "@/config/site";
import { getSiteContent } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dernek Hakkında",
  description: `${associationName}'nin kuruluş amacı, mezun topluluğumuz ve yürüttüğümüz çalışmalar hakkında bilgi edinin.`,
  alternates: {
    canonical: "/hakkimizda/dernek-hakkinda",
  },
  openGraph: {
    title: `Dernek Hakkında | ${associationName}`,
    description: `${associationName}'nin kuruluş amacı, mezun topluluğumuz ve yürüttüğümüz çalışmalar hakkında bilgi edinin.`,
    url: "/hakkimizda/dernek-hakkinda",
  },
};

export default async function DernekHakkindaPage() {
  const content = await getSiteContent("hakkimizda", contentSections.hakkimizda.defaults);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Hakkımızda", href: "/hakkimizda/dernek-hakkinda" },
          { name: "Dernek Hakkında", href: "/hakkimizda/dernek-hakkinda" },
        ]}
      />
      <ContentPage
        eyebrow={content.about_title || "GEÇMİŞİN GÜÇLÜ TEMELLERİYLE GELECEĞE UZANAN KÖPRÜ"}
        title="Dernek Hakkında"
        description={content.about_text}
        titleClassName="about-page__title"
        descriptionClassName="about-page__copy"
        showContent={false}
      />
    </>
  );
}
