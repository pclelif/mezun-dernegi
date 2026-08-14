import { CalendarRange, HeartHandshake, Landmark } from "lucide-react";
import type { Metadata } from "next";
import { associationName } from "@/config/site";
import { IbanCopyButton } from "../iban-copy-button";
import { BANK_NAME, feePeriods, IBAN, PERIOD_FEE } from "../membership-info";

export const metadata: Metadata = {
  title: "Aidat ve Bağış Bilgileri",
  description: "Üyelik aidatı dönemleri, dernek banka hesap bilgileri ve bağış yapma yolları.",
};

export default function DuesPage() {
  return (
    <>
      <section className="border-b border-zinc-200 bg-slate-50">
        <div className="mx-auto w-[min(100%-2rem,52rem)] py-10 md:w-[min(100%-4rem,52rem)] md:py-16">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 md:text-4xl">
            Aidat ve Bağış Bilgileri
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Üyelik aidatı dönemleri, dernek hesap bilgileri ve bağış katkılarına dair ayrıntılar.
          </p>
        </div>
      </section>

      <div className="mx-auto w-[min(100%-2rem,52rem)] space-y-8 py-12 md:w-[min(100%-4rem,52rem)] md:space-y-10 md:py-20">
        <section
          className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8"
          aria-labelledby="dues-title"
        >
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-red-50 text-[#ec1c24]">
              <CalendarRange className="size-5" aria-hidden="true" />
            </span>
            <h2 id="dues-title" className="text-xl font-bold tracking-tight text-zinc-950 md:text-2xl">
              Üyelik aidatı
            </h2>
          </div>

          <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Üyelik aidatı her dönem{" "}
            <strong className="font-semibold text-zinc-900">{PERIOD_FEE}</strong> olmak üzere 4
            dönemden ödenecektir:
          </p>

          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {feePeriods.map((period) => (
              <li
                key={period}
                className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-slate-50 px-4 py-3 text-base font-medium text-zinc-900"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-[#ec1c24]" aria-hidden="true" />
                {period}
              </li>
            ))}
          </ul>
        </section>

        <section
          className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8"
          aria-labelledby="bank-title"
        >
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-red-50 text-[#ec1c24]">
              <Landmark className="size-5" aria-hidden="true" />
            </span>
            <h2 id="bank-title" className="text-xl font-bold tracking-tight text-zinc-950 md:text-2xl">
              Banka hesap bilgileri
            </h2>
          </div>

          <dl className="mt-6 space-y-5">
            <div>
              <dt className="text-sm font-semibold text-slate-500">Banka</dt>
              <dd className="mt-1 text-base leading-7 text-zinc-900">{BANK_NAME}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-slate-500">Hesap Adı</dt>
              <dd className="mt-1 text-base leading-7 text-zinc-900">{associationName}</dd>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-slate-50 p-4 md:p-5">
              <dt className="text-sm font-semibold text-slate-500">IBAN</dt>
              <dd className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-mono text-base font-semibold tracking-wide text-zinc-950 [overflow-wrap:anywhere] md:text-lg">
                  {IBAN}
                </span>
                <IbanCopyButton value={IBAN} />
              </dd>
            </div>
          </dl>
        </section>

        <section
          className="rounded-xl border-l-2 border-[#ec1c24] bg-red-50/60 p-6 md:p-8"
          aria-labelledby="donation-title"
        >
          <div className="flex items-center gap-3">
            <HeartHandshake className="size-5 shrink-0 text-[#ec1c24]" aria-hidden="true" />
            <h2
              id="donation-title"
              className="text-lg font-bold tracking-tight text-zinc-950 md:text-xl"
            >
              Bağış
            </h2>
          </div>
          <p className="mt-4 text-base leading-7 text-zinc-700 md:leading-8">
            Derneğimize ve okulumuz öğrencilerine destek olmak için aynı IBAN numarasına{" "}
            <strong className="font-semibold text-zinc-900">“Bağış”</strong> açıklaması ile
            dilediğiniz tutarda katkıda bulunabilirsiniz.
          </p>
        </section>
      </div>
    </>
  );
}
