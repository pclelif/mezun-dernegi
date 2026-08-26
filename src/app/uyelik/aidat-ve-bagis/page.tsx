import { CalendarRange, HeartHandshake } from "lucide-react";
import type { Metadata } from "next";
import { FAQAccordion } from "@/components/faq/faq-accordion";
import { BankAccountCard } from "@/components/membership/bank-account-card";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { contentSections } from "@/config/content";
import { associationName } from "@/config/site";
import { getFaqs, getSiteContent } from "@/lib/supabase/queries";
import { feePeriods, PERIOD_FEE } from "../membership-info";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Aidat ve Bağış",
  description: `${associationName} üyelik aidatı dönemleri, resmî banka hesap bilgileri ve bağış yapma detayları.`,
  alternates: {
    canonical: "/uyelik/aidat-ve-bagis",
  },
  openGraph: {
    title: `Aidat ve Bağış | ${associationName}`,
    description: `${associationName} üyelik aidatı dönemleri, resmî banka hesap bilgileri ve bağış yapma detayları.`,
    url: "/uyelik/aidat-ve-bagis",
  },
};

export default async function AidatVeBagisPage() {
  const [faqs, content] = await Promise.all([
    getFaqs("dues").catch(() => []),
    getSiteContent("aidat-bagis", contentSections["aidat-bagis"].defaults),
  ]);

  const faqItems = faqs.map((faq) => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Üyelik", href: "/uyelik/dernek-uyeligi" },
          { name: "Aidat ve Bağış", href: "/uyelik/aidat-ve-bagis" },
        ]}
      />
      <PageHero
        eyebrow="YOLCULUĞUMUZU BİRLİKTE SÜRDÜRELİM"
        title="Aidat ve Bağış Bilgileri"
        description="Derneğimizin çalışmalarına destek olmak ve aidat işlemlerini yürütmek için izlenecek adımlar."
        titleClassName="panel-title--compact"
        descriptionClassName="panel-copy--compact"
      />

      <div className="mx-auto w-[min(100%-2rem,60rem)] space-y-8 py-12 md:w-[min(100%-4rem,60rem)] md:space-y-10 md:py-20">
        <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8" aria-labelledby="dues-title">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-red-50 text-[#ec1c24]">
              <CalendarRange className="size-5" aria-hidden="true" />
            </span>
            <h2 id="dues-title" className="text-lg font-bold tracking-tight text-zinc-950 md:text-xl">Üyelik aidatı</h2>
          </div>
          <p className="mt-5 text-base leading-7 text-slate-600">
            {content.annual_dues || (
              <>
                Üyelik aidatı her dönem <strong className="font-semibold text-zinc-900">{PERIOD_FEE}</strong> olmak üzere yılda 4 dönem üzerinden ödenmektedir.
              </>
            )}
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {feePeriods.map((period) => (
              <li key={period} className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-slate-50 px-4 py-3 text-sm font-medium text-zinc-900">
                <span className="size-1.5 shrink-0 rounded-full bg-[#ec1c24]" aria-hidden="true" />
                {period}
              </li>
            ))}
          </ul>
        </section>

        <BankAccountCard
          bankName={content.bank_name}
          accountName={content.account_name}
          iban={content.iban}
          paymentNote={content.payment_note}
        />

        <section className="rounded-xl border-l-2 border-[#ec1c24] bg-red-50/60 p-6 md:p-8" aria-labelledby="donation-title">
          <div className="flex items-center gap-3">
            <HeartHandshake className="size-5 shrink-0 text-[#ec1c24]" aria-hidden="true" />
            <h2 id="donation-title" className="text-base font-bold tracking-tight text-zinc-950 md:text-lg">Bağış</h2>
          </div>
          <p className="mt-4 text-sm leading-6 text-zinc-700">
            {content.donation || (
              <>
                Derneğimize ve okulumuz öğrencilerine destek olmak için aynı IBAN numarasına{" "}
                <strong className="font-semibold text-zinc-900">“Bağış”</strong> açıklaması ile
                dilediğiniz tutarda katkıda bulunabilirsiniz.
              </>
            )}
          </p>
        </section>

        {faqItems.length > 0 ? (
          <section className="border-t border-zinc-200 pt-10" aria-labelledby="dues-faq-title">
            <h2 id="dues-faq-title" className="text-xl font-bold tracking-tight text-zinc-950">Ödemeler hakkında merak edilenler</h2>
            <p className="mt-2 mb-6 text-base leading-7 text-slate-600">Aidat, banka transferi ve bağışlarla ilgili kısa yanıtlar.</p>
            <FAQAccordion items={faqItems} />
          </section>
        ) : null}
      </div>
    </>
  );
}
