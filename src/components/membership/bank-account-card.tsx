import { Landmark } from "lucide-react";
import { IbanCopyButton } from "@/app/uyelik/iban-copy-button";
import { associationName } from "@/config/site";

export function BankAccountCard({ className = "", bankName = "Ziraat Bankası", accountName = associationName, iban = "TR91 0001 0016 8398 3927 3550 01", paymentNote = "" }: { className?: string; bankName?: string; accountName?: string; iban?: string; paymentNote?: string }) {
  return (
    <section
      className={`rounded-xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8 ${className}`}
      aria-labelledby="bank-account-title"
    >
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-red-50 text-[#ec1c24]">
          <Landmark className="size-5" aria-hidden="true" />
        </span>
        <h2 id="bank-account-title" className="text-lg font-bold tracking-tight text-zinc-950 md:text-xl">
          Banka hesap bilgileri
        </h2>
      </div>
      <dl className="mt-6 space-y-5">
        <div>
          <dt className="text-sm font-semibold text-slate-500">Banka</dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-900">{bankName}</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-slate-500">Hesap Adı</dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-900">{accountName}</dd>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-slate-50 p-4 md:p-5">
          <dt className="text-sm font-semibold text-slate-500">IBAN</dt>
          <dd className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono text-sm font-semibold tracking-wide text-zinc-950 [overflow-wrap:anywhere] md:text-base">
              {iban}
            </span>
            <IbanCopyButton value={iban} />
          </dd>
        </div>
        {paymentNote ? <div><dt className="text-sm font-semibold text-slate-500">Ödeme açıklaması</dt><dd className="mt-1 whitespace-pre-line text-sm leading-6 text-zinc-900">{paymentNote}</dd></div> : null}
      </dl>
    </section>
  );
}
