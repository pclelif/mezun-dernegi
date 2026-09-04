import { ArrowRight, Download } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { FAQAccordion } from "@/components/faq/faq-accordion";
import { BankAccountCard } from "@/components/membership/bank-account-card";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { contentSections } from "@/config/content";
import { associationName } from "@/config/site";
import { getFaqs, getSiteContent } from "@/lib/supabase/queries";
import { ENTRY_FEE } from "../membership-info";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dernek Üyeliği",
  description: `${associationName}'ne üye olmak için başvuru adımları, gerekli belgeler ve kayıt süreci.`,
  alternates: {
    canonical: "/uyelik/dernek-uyeligi",
  },
  openGraph: {
    title: `Dernek Üyeliği | ${associationName}`,
    description: `${associationName}'ne üye olmak için başvuru adımları, gerekli belgeler ve kayıt süreci.`,
    url: "/uyelik/dernek-uyeligi",
  },
};

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

export default async function DernekUyeligiPage() {
  const [content, dues, faqs] = await Promise.all([
    getSiteContent("uyelik", contentSections.uyelik.defaults),
    getSiteContent("aidat-bagis", contentSections["aidat-bagis"].defaults),
    getFaqs("membership").catch(() => []),
  ]);

  const faqItems = faqs.map((faq) => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <>
      <WebPageJsonLd
        title={`Dernek Üyeliği - ${associationName}`}
        description={`${associationName}'ne üye olmak için başvuru adımları, gerekli belgeler ve kayıt süreci.`}
        path="/uyelik/dernek-uyeligi"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Üyelik", href: "/uyelik/dernek-uyeligi" },
          { name: "Dernek Üyeliği", href: "/uyelik/dernek-uyeligi" },
        ]}
      />
      <PageHero
        eyebrow="YOLCULUĞUMUZUN BİR PARÇASI OLUN"
        title="Dernek Üyeliği"
        description={content.intro || "Derneğimize katılmak için izlenecek adımlar."}
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
              className="mt-7 inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 rounded-md bg-[#ec1c24] px-7 text-sm font-semibold text-white transition-colors hover:bg-red-700 active:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
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
              Açıklama: Üyelik giriş aidatı – İsim Soyisim – T.C. Kimlik No
            </p>

            <Link
              href="/uyelik/aidat-ve-bagis"
              className="mt-5 inline-flex touch-manipulation items-center gap-2 rounded-sm font-semibold text-[#ec1c24] transition-colors hover:text-red-700 active:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
            >
              Üyelik sonrası dönem aidatlarını ve ödeme dönemlerini görüntüle
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </Link>

            <BankAccountCard
              className="mt-7"
              bankName={dues.bank_name}
              accountName={dues.account_name}
              iban={dues.iban}
              paymentNote={dues.payment_note}
            />
          </Step>

          <Step step={3} title="Belgelerinizi Hazırlayın">
            <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-7 text-slate-600">
              <li>Üyelik formu (Islak imzalı, PDF formatında)</li>
              <li>Üyelik giriş aidatı dekontu (PDF formatında)</li>
              <li>Adli sicil kaydı (PDF formatında)</li>
              <li>Lise mezuniyet belgesi (PDF formatında)</li>
            </ul>

            <div className="mt-6 space-y-4">
              <div className="rounded-lg border-l-2 border-[#ec1c24] bg-red-50/60 px-5 py-4 text-base leading-7 text-slate-600">
                <p>
                  e-Devlet üzerinden Adli Sicil Kaydınızı oluştururken “Belgenin Verileceği Kurum”
                  alanında “Resmî Kurum” seçeneğini seçiniz. Kurum Adı:{" "}
                  <span className="break-words font-semibold text-black">{associationName}</span>
                </p>
              </div>
              <div className="rounded-lg border-l-2 border-[#ec1c24] bg-red-50/60 px-5 py-4 text-base leading-7 text-slate-600">
                <p>
                  Lise Mezuniyet Belgenizi e-Devlet üzerinden barkodlu PDF olarak alabilirsiniz.
                </p>
              </div>
            </div>
          </Step>

          <Step step={4} title="Başvurunuzu İletin" isLast>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Hazırladığınız 4 adet PDF dosyasını (üyelik formu, dekont, adli sicil kaydı ve mezuniyet
              belgesi) aşağıdaki e-posta adresine göndererek başvurunuzu tamamlayabilirsiniz.
            </p>
            <a
              href="mailto:kaaflmezunderuyelik@gmail.com?subject=%C3%9Cyelik%20Ba%C5%9Fvurusu%20-%20%5B%C4%B0sim%20Soyisminizi%20Buraya%20Yaz%C4%B1n%C4%B1z%5D"
              className="mt-5 inline-flex touch-manipulation text-base font-bold text-[#ec1c24] underline underline-offset-4 transition-colors hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
            >
              kaaflmezunderuyelik@gmail.com
            </a>
            <div className="mt-4 rounded-lg border-l-2 border-[#ec1c24] bg-red-50/60 px-4 py-3 text-sm leading-6 text-slate-600">
              <p>
                <span className="font-semibold text-zinc-800">Not:</span> Lütfen belgelerinizin
                karışmaması adına, e-postanızı gönderirken konu (subject) kısmına İsim ve Soyisminizi
                yazmayı unutmayınız.
              </p>
            </div>
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
