import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HomeAboutSection() {
  return (
    <section className="border-b border-zinc-200 bg-white px-4 py-14 md:py-20" aria-labelledby="home-about-title">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-600">Hakkımızda</p>
        <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="home-about-title" className="max-w-3xl text-2xl font-bold tracking-tight text-zinc-950 md:text-3xl">
            Geçmişin Güçlü Temelleriyle Geleceğe Uzanan Köprü
          </h2>
          <Link href="/kurumsal/hakkimizda" className="inline-flex touch-manipulation items-center gap-2 self-start rounded-sm text-sm font-bold text-zinc-900 hover:text-red-700 active:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600 sm:self-auto">
            Detaylı Bilgi <ArrowRight className="size-4 text-red-600" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
