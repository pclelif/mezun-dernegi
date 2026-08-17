import { ArrowRight, Download } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { FAQAccordion } from "@/components/faq/faq-accordion";
import { BankAccountCard } from "@/components/membership/bank-account-card";
import { PageHero } from "@/components/shared/page-hero";
import { getFaqs } from "@/lib/supabase/queries";
import { ENTRY_FEE } from "./membership-info";
import { contentSections } from "@/config/content";
import { getSiteContent } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Üyelik İşlemleri",
  description: "Derneğimize üye olmak için izlemeniz gereken başvuru adımları ve gerekli belgeler.",
};

export const dynamic = "force-dynamic";

/**
 * Rozet akış içinde bir flex öğesi; bu yüzden metnin üstüne binemez veya
 * ekran kenarından taşamaz. Dikey çizgi rozetin altındaki bağlayıcıdan gelir.
 */
function Step({
  step,
  title,
  isLast = false,
  children,
}: {
  step: number;
  title: string;
  isLast?: boolean;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-4 md:gap-6">
      <div className="flex shrink-0 flex-col items-center">
        <span
          className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-[#ec1c24] bg-white text-sm font-bold text-[#ec1c24] md:size-12 md:text-base"
          aria-hidden="true"
        >
          {step}
        </span>
        {isLast ? null : <span className="mt-3 w-px flex-1 bg-zinc-200" aria-hidden="true" />}
      </div>

      <div className={`min-w-0 flex-1 ${isLast ? "" : "pb-12 md:pb-16"}`}>
        <h2 className="text-lg font-bold tracking-tight text-zinc-950 md:mt-1 md:text-xl">
          {title}
        </h2>
        {children}
      </div>
    </li>
  );
}

export default async function MembershipPage() {
  const [content, dues, faqs] = await Promise.all([getSiteContent("uyelik", contentSections.uyelik.defaults), getSiteContent("aidat-bagis", contentSections["aidat-bagis"].defaults), getFaqs("membership").catch(() => [])]);
  const faqItems = faqs.map((faq) => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <>
      <PageHero
        eyebrow="Mezun Ailemize Katılın"
        title="Üyelik İşlemleri"
        description={content.intro}
        titleClassName="panel-title--compact"
        descriptionClassName="panel-copy--compact"
      />

      <div className="mx-auto w-[min(100%-2rem,60rem)] py-12 md:w-[min(100%-4rem,60rem)] md:py-20">
        <ol className="pl-1 md:pl-2" aria-label="Üyelik başvuru adımları">
          <Step step={1} title="Üyelik Formu">
            <p className="mt-4 text-base leading-7 text-slate-600">
              Aşağıdaki bağlantıdan Üyelik Formu’nu indirerek eksiksiz şekilde doldurunuz ve ıslak
              imza ile imzalayınız.
            </p>
            <a
              href={content.form_url || "/UYE_KAYIT_FORMU.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#ec1c24] px-7 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
            >
              <Download className="size-5 shrink-0" aria-hidden="true" />
              Üyelik Formunu İndir
            </a>
          </Step>

          <Step step={2} title="Ödeme ve Belgelerinizi Hazırlayın">
            <p className="mt-4 text-base leading-7 text-slate-600">
              Üyelik giriş aidatını {dues.bank_name} hesabına yatırınız. Üyelik giriş aidatı:{" "}
              <strong className="font-semibold text-zinc-900">{ENTRY_FEE}</strong>.
            </p>
            <p className="mt-2 text-base font-medium leading-7 text-zinc-800">
              Açıklama: Üyelik giriş aidatı – İsim Soyisim – T.C.
            </p>

            <Link
              href="/uyelik/aidat"
              className="mt-5 inline-flex items-center gap-2 rounded-sm font-semibold text-[#ec1c24] transition-colors hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
            >
              Üyelik sonrası dönem aidatlarını ve ödeme dönemlerini görüntüle
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </Link>

            <BankAccountCard className="mt-7" bankName={dues.bank_name} accountName={dues.account_name} iban={dues.iban} paymentNote={dues.payment_note} />

            <p className="mt-6 rounded-lg border-l-2 border-[#ec1c24] bg-red-50/60 px-5 py-4 text-sm leading-6 text-zinc-700">
              Giriş ücreti ve girdiğiniz döneme ait üyelik aidatı ödemesinin banka dekontunu, üyelik
              formunun ıslak imzalı halini ve adli sicil kaydını ayrı ayrı PDF dosyaları olarak
              belirtilen e-posta adresine gönderebilir veya belgeleri derneğimize elden
              ulaştırabilirsiniz.
            </p>

          </Step>

          <Step step={3} title="Başvurunuzu Tamamlayın" isLast>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Üyelik formunuzu doldurup gerekli ödeme ve belgeleri ilettikten sonra başvurunuz
              tamamlanacaktır. Başvurunuz dernek yönetimi tarafından incelendikten sonra üyelik
              durumunuzla ilgili bilgilendirme yapılacaktır.
            </p>
          </Step>
        </ol>

        {faqItems.length > 0 ? (
          <section className="mt-16 border-t border-zinc-200 pt-10" aria-labelledby="membership-faq-title">
            <h2 id="membership-faq-title" className="text-xl font-bold tracking-tight text-zinc-950">
              Üyelik hakkında merak edilenler
            </h2>
            <p className="mt-2 mb-6 text-base leading-7 text-slate-600">
              Başvuru süreciyle ilgili sık karşılaşılan soruların kısa yanıtları.
            </p>
            <FAQAccordion items={faqItems} />
          </section>
        ) : null}
      </div>
    </>
  );
}
