import { ArrowRight, CircleHelp } from "lucide-react";
import Link from "next/link";
import { FAQAccordion } from "@/components/faq/faq-accordion";
import { getFaqs } from "@/lib/supabase/queries";

export async function HomeFaqSection() {
  let faqs: Awaited<ReturnType<typeof getFaqs>> = [];

  try {
    faqs = await getFaqs("general");
  } catch {
    faqs = [];
  }

  const items = faqs.slice(0, 4).map((faq) => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <section className="border-t border-zinc-200 bg-white px-4 py-14 md:py-20" aria-labelledby="home-faq-title">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-9 -translate-y-[3px] shrink-0 place-items-center rounded-lg bg-red-50 text-red-600">
              <CircleHelp className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase leading-tight tracking-[0.02em] text-red-600">Merak Edilenler</p>
              <h2 id="home-faq-title" className="mt-0.5 text-2xl font-bold leading-tight tracking-tight text-zinc-950 md:text-[1.75rem]">
                Sıkça Sorulan Sorular
              </h2>
            </div>
          </div>
          <Link
            href="/sss"
            className="inline-flex touch-manipulation items-center gap-2 self-start rounded-sm text-sm font-bold text-zinc-900 transition-colors hover:text-red-700 active:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600 sm:self-auto -translate-x-[1.5px] -translate-y-[2.5px]"
          >
            Tüm Sorular
            <ArrowRight className="size-4 text-zinc-900" aria-hidden="true" />
          </Link>
        </div>

        <div className="w-full">
          {items.length > 0 ? (
            <FAQAccordion items={items} defaultOpenIds={[items[0].id]} />
          ) : (
            <p className="rounded-lg border border-dashed border-zinc-300 bg-slate-50/70 px-5 py-3.5 text-center text-sm font-medium text-zinc-500">
              Henüz sıkça sorulan soru eklenmedi.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
