"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function HomeHero({ title, description, imageUrl }: { title: string; description: string; imageUrl?: string }) {
  const pathname = usePathname();

  return (
    <section className="relative isolate overflow-hidden bg-slate-200 px-4 py-20 md:py-28">
      {imageUrl ? (
        <>
          <div
            className="absolute inset-0 -z-20 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-white/90 via-white/75 to-white/90"
            aria-hidden="true"
          />
        </>
      ) : null}
      {/* key, rotalar arasında dönüldüğünde React'i remount'a zorlar; CSS animasyonu baştan oynar. */}
      <div key={pathname} className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <h1 className="animate-fade-in-up text-balance text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl md:text-4xl lg:text-5xl">
          {title.replace(/Mezunları Derneği/gi, "Mezunlar Derneği")}
        </h1>
        <p className="animate-fade-in-up animation-delay-150 mt-5 max-w-3xl text-center text-base leading-7 text-slate-600 md:text-lg md:leading-8">
          {description.split("\n").map((line) => <span key={line} className="block">{line}</span>)}
        </p>
        <div className="animate-fade-in-up animation-delay-300 mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/uyelik/dernek-uyeligi"
            className="inline-flex min-h-12 touch-manipulation items-center justify-center rounded-md bg-[#ec1c24] px-8 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-lg active:scale-95 active:bg-red-700 active:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
          >
            Derneğimize Üye Ol!
          </Link>
        </div>
      </div>
    </section>
  );
}
