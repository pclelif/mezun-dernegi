"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import type { GalleryHighlight } from "@/content/sample-data";

type GalleryShowcaseProps = {
  items: GalleryHighlight[];
};

export function GalleryShowcase({ items }: GalleryShowcaseProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  function move(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({
      left: direction * track.clientWidth * 0.8,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <section className="bg-zinc-900 py-14 text-white md:py-16" aria-labelledby="gallery-showcase-title">
      <div className="mx-auto w-[min(100%-2rem,75rem)] md:w-[min(100%-4rem,75rem)]">
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-500">Galeri</p>
          <h2 id="gallery-showcase-title" className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Anılarımızdan Seçkiler</h2>
        </div>

        <div className="relative">
          <div ref={trackRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" tabIndex={0} aria-label="Anılarımızdan fotoğraflar">
            {items.map((item) => (
              <div key={item.id} className="aspect-[4/3] min-w-[82%] snap-start rounded-lg border border-zinc-200 bg-zinc-100 sm:min-w-[46%] lg:min-w-[31%]" aria-hidden="true" />
            ))}
          </div>
          <button type="button" onClick={() => move(-1)} className="absolute left-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-zinc-300 bg-white text-zinc-900 shadow-sm transition-colors hover:border-red-600 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" aria-label="Önceki görseller">
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => move(1)} className="absolute right-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-zinc-300 bg-white text-zinc-900 shadow-sm transition-colors hover:border-red-600 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" aria-label="Sonraki görseller">
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>

        <Link href="/galeri" className="mt-6 inline-flex items-center gap-2 rounded-sm text-sm font-bold text-white hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          Tüm galeriyi görüntüle <ArrowRight className="size-4 text-red-500" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
