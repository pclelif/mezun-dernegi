import { FAQAccordion } from "@/components/faq/faq-accordion";
import { PageHero } from "@/components/shared/page-hero";
import { frequentlyAskedQuestions } from "@/content/sample-data";

export default function FAQPage() {
  return (
    <>
      <PageHero title="Sıkça Sorulan Sorular" description="Üyelik ve dernek çalışmaları hakkında merak edilenler." />
      <section className="container-site section-space">
        <div className="max-w-3xl">
          <FAQAccordion items={frequentlyAskedQuestions} defaultOpenIds={[frequentlyAskedQuestions[0].id]} />
        </div>
      </section>
    </>
  );
}
