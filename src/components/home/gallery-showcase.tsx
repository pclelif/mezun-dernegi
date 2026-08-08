"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
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
        <div className="mb-7 flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-500">Galeri</p>
            <h2 id="gallery-showcase-title" className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Anılarımızdan Seçkiler</h2>
          </div>
          <div className="flex shrink-0 gap-2" aria-label="Galeri kontrolleri">
            <button type="button" onClick={() => move(-1)} className="grid size-11 place-items-center rounded-full border border-white/30 transition-colors hover:border-white hover:bg-white hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" aria-label="Önceki görseller">
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => move(1)} className="grid size-11 place-items-center rounded-full border border-white/30 transition-colors hover:border-white hover:bg-white hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" aria-label="Sonraki görseller">
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div ref={trackRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" tabIndex={0} aria-label="Anılarımızdan fotoğraflar">
          {items.map((item) => (
            <figure key={item.src} className="relative aspect-[4/3] min-w-[82%] snap-start overflow-hidden rounded-lg bg-zinc-800 sm:min-w-[46%] lg:min-w-[31%]">
              <Image src={item.src} alt={item.alt} fill sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 82vw" className="object-cover transition-transform duration-300 motion-reduce:transition-none md:hover:scale-[1.02]" />
            </figure>
          ))}
        </div>

        <Link href="/galeri" className="mt-6 inline-flex rounded-sm text-sm font-bold text-white hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          Tüm galeriyi görüntüle
        </Link>
      </div>
    </section>
  );
}
