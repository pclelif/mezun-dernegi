"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { associationName } from "@/config/site";

export function HomeHero() {
  const pathname = usePathname();

  return (
    <section className="overflow-hidden bg-slate-50 px-4 py-20 md:py-28">
      {/* key, rotalar arasında dönüldüğünde React'i remount'a zorlar; CSS animasyonu baştan oynar. */}
      <div key={pathname} className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <h1 className="animate-fade-in-up text-balance text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl md:text-4xl lg:text-5xl">
          {associationName}
        </h1>
        <p className="animate-fade-in-up animation-delay-150 mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
          Bir okul. Binlerce hikâye. Tek bir aile. Geçmişimizin değerlerini koruyor, geleceğe yönelik
          yeni adımlar atıyoruz.
        </p>
        <div className="animate-fade-in-up animation-delay-300 mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/uyelik"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#ec1c24] px-8 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-lg active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
          >
            Derneğimize Üye Ol!
          </Link>
        </div>
      </div>
    </section>
  );
}
