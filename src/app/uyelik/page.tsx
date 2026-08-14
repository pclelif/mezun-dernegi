import { Download } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { associationName } from "@/config/site";
import { IbanCopyButton } from "./iban-copy-button";
import { BANK_NAME, ENTRY_FEE, feePeriods, IBAN, PERIOD_FEE } from "./membership-info";

export const metadata: Metadata = {
  title: "Üyelik İşlemleri",
  description: "Derneğimize üye olmak için izlemeniz gereken adımlar, aidat ve belge bilgileri.",
};

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
        <h2 className="text-xl font-bold tracking-tight text-zinc-950 md:mt-1 md:text-2xl">
          {title}
        </h2>
        {children}
      </div>
    </li>
  );
}

export default function MembershipPage() {
  return (
    <>
      <section className="border-b border-zinc-200 bg-slate-50">
        <div className="mx-auto w-[min(100%-2rem,52rem)] py-10 md:w-[min(100%-4rem,52rem)] md:py-16">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 md:text-4xl">
            Üyelik işlemleri
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Derneğimize üye olmak için aşağıdaki adımları takip edebilirsiniz.
          </p>
        </div>
      </section>

      <div className="mx-auto w-[min(100%-2rem,52rem)] py-12 md:w-[min(100%-4rem,52rem)] md:py-20">
        <ol className="pl-1 md:pl-2" aria-label="Üyelik başvuru adımları">
          <Step step={1} title="Üyelik formunu doldurun">
            <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Aşağıdaki linkten Üyelik Formu'nu indirip ıslak imzalı bir şekilde doldurunuz.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
              Üyelik giriş aidatını {BANK_NAME} hesabına yatırınız. Üyelik giriş aidatı:{" "}
              <strong className="font-semibold text-zinc-900">{ENTRY_FEE}</strong>. Açıklama: Üyelik
              giriş aidatı – İsim Soyisim – T.C.
            </p>
            <a
              href="/UYE_KAYIT_FORMU.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#ec1c24] px-8 text-base font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
            >
              <Download className="size-5 shrink-0" aria-hidden="true" />
              Üyelik Formunu İndir (PDF)
            </a>
          </Step>

          <Step step={2} title="Ödeme ve belgelerinizi hazırlayın">
            <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
              Üyelik aidatı her dönem {PERIOD_FEE} olmak üzere 4 dönemden ödenecektir:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-slate-600 md:text-lg">
              {feePeriods.map((period) => (
                <li key={period}>{period}</li>
              ))}
            </ul>

            <div className="mt-7 rounded-xl border border-zinc-200 bg-slate-50 p-5 md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ec1c24]">
                Banka bilgileri
              </p>
              <dl className="mt-4 space-y-5">
                <div>
                  <dt className="text-sm font-semibold text-slate-500">Hesap Adı</dt>
                  <dd className="mt-1 text-base leading-7 text-zinc-900">{associationName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-slate-500">IBAN</dt>
                  <dd className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-mono text-base font-semibold tracking-wide text-zinc-950 [overflow-wrap:anywhere] md:text-lg">
                      {IBAN}
                    </span>
                    <IbanCopyButton value={IBAN} />
                  </dd>
                </div>
              </dl>
            </div>

            <p className="mt-6 rounded-lg border-l-2 border-[#ec1c24] bg-red-50/60 px-5 py-4 text-base leading-7 text-zinc-700 md:leading-8">
              Giriş ücreti ve girdiğiniz dönemin aidatına ait banka dekontunu, üyelik formunun ıslak
              imzalı halini taratıp ve adli sicil kaydını ayrı ayrı PDF dosyası olarak belirtilen
              e-posta adresine gönderebilir veya bize elden ulaştırabilirsiniz.
            </p>
          </Step>

          <Step step={3} title="Başvurunuzu tamamlayın" isLast>
            <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
              Üyelik formunuzu doldurup gerekli ödeme ve belgeleri ilettikten sonra başvurunuz
              tamamlanacaktır. Başvurunuz dernek yönetimi tarafından incelendikten sonra üyelik
              durumunuzla ilgili bilgilendirme yapılacaktır.
            </p>
          </Step>
        </ol>
      </div>
    </>
  );
}
