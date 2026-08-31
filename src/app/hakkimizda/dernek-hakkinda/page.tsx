import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { ContentPage } from "@/components/shared/content-page";
import { contentSections } from "@/config/content";
import { associationName } from "@/config/site";
import { getSiteContent } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: `${associationName}'nin kuruluş amacı, mezun topluluğumuz ve yürüttüğümüz çalışmalar hakkında bilgi edinin.`,
  alternates: {
    canonical: "/hakkimizda/dernek-hakkinda",
  },
  openGraph: {
    title: `Hakkımızda | ${associationName}`,
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
          { name: "Hakkımızda", href: "/hakkimizda/dernek-hakkinda" },
        ]}
      />
      <ContentPage
        eyebrow={content.about_title || "GEÇMİŞİN GÜÇLÜ TEMELLERİYLE GELECEĞE UZANAN KÖPRÜ"}
        title="Hakkımızda"
        description={content.about_text}
        titleClassName="about-page__title"
        descriptionClassName="about-page__copy"
        showContent={true}
      >
        <div className="space-y-4 text-base leading-7 text-zinc-700">
          <p>
            Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunlar Derneği, mezunlarımız arasındaki iletişimi güçlendirmek, okulumuzun köklü değerlerini yarınlara taşımak ve öğrencilerimize rehberlik etmek amacıyla kurulmuştur.
          </p>
          <p>
            Farklı dönemlerden mezunlarımızı ortak paydada buluşturan derneğimiz; düzenlediği sosyal, kültürel ve mesleki çalışmalarla güçlü bir dayanışma ağı oluşturmayı hedefler.
          </p>
        </div>
      </ContentPage>
    </>
  );
}
