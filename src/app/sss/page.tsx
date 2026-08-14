import type { Metadata } from "next";
import { FAQAccordion } from "@/components/faq/faq-accordion";
import { PageHero } from "@/components/shared/page-hero";
import { getFaqs } from "@/lib/supabase/queries";

export const metadata: Metadata = { title: "Sıkça Sorulan Sorular" };
export const dynamic = "force-dynamic";

export default async function FAQPage() {
  let faqs: Awaited<ReturnType<typeof getFaqs>> = [];
  try {
    faqs = await getFaqs();
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
      <PageHero title="Sıkça Sorulan Sorular" description="Üyelik ve dernek çalışmaları hakkında merak edilenler." />
      <section className="container-site section-space">
        <div className="max-w-3xl">
          {items.length === 0 ? (
            <p className="rounded-lg border border-dashed border-zinc-300 bg-slate-50 px-6 py-10 text-center text-slate-600">
              SSS içerikleri henüz eklenmemiş.
            </p>
          ) : (
            <FAQAccordion items={items} defaultOpenIds={[items[0].id]} />
          )}
        </div>
      </section>
    </>
  );
}
