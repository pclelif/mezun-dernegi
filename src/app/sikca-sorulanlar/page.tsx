import type { Metadata } from "next";
import { FAQAccordion } from "@/components/faq/faq-accordion";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { associationName } from "@/config/site";
import { getFaqs } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sıkça Sorulanlar",
  description: `${associationName} hakkında genel sorular, üyelik, aidat ve etkinliklere dair merak edilenlerin yanıtları.`,
  alternates: {
    canonical: "/sikca-sorulanlar",
  },
  openGraph: {
    title: `Sıkça Sorulanlar | ${associationName}`,
    description: `${associationName} hakkında genel sorular, üyelik, aidat ve etkinliklere dair merak edilenlerin yanıtları.`,
    url: "/sikca-sorulanlar",
  },
};

export default async function FAQPage() {
  let faqs: Awaited<ReturnType<typeof getFaqs>> = [];
  try {
    faqs = await getFaqs("general");
  } catch {
    faqs = [];
  }

  const items = faqs.map((faq) => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Sıkça Sorulanlar", href: "/sikca-sorulanlar" },
        ]}
      />
      <PageHero
        eyebrow="Merak Edilenler"
        title="Sıkça Sorulan Sorular"
        description="Dernek hakkında genel soruların kısa ve net yanıtları."
        titleClassName="panel-title--compact"
        descriptionClassName="panel-copy--compact"
      />
      <section className="container-site section-space">
        <div className="w-full">
          {items.length === 0 ? (
            <p className="rounded-lg border border-dashed border-zinc-300 bg-slate-50/70 px-5 py-3.5 text-center text-sm font-medium text-slate-500">
              Henüz sıkça sorulan soru eklenmedi.
            </p>
          ) : (
            <FAQAccordion items={items} defaultOpenIds={[items[0].id]} />
          )}
        </div>
      </section>
    </>
  );
}
