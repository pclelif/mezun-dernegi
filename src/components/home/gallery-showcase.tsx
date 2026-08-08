"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { GalleryHighlight } from "@/content/sample-data";

type GalleryShowcaseProps = {
  items: GalleryHighlight[];
};

export function GalleryShowcase({ items }: GalleryShowcaseProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const lastTouchRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  function move(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;

    const nextIndex = Math.min(Math.max(activeIndex + direction, 0), items.length - 1);
    const nextItem = track.children.item(nextIndex) as HTMLElement | null;
    if (!nextItem) return;

    track.scrollLeft = nextItem.offsetLeft - track.offsetLeft;
    setActiveIndex(nextIndex);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLButtonElement>, direction: -1 | 1) {
    if (event.pointerType === "mouse") return;

    event.preventDefault();
    event.stopPropagation();
    lastTouchRef.current = Date.now();
    move(direction);
  }

  function handleClick(direction: -1 | 1) {
    if (Date.now() - lastTouchRef.current < 500) return;
    move(direction);
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function syncActiveIndex() {
      if (!track) return;

      const children = Array.from(track.children) as HTMLElement[];
      const closestIndex = children.reduce((closest, child, index) =>
        Math.abs(child.offsetLeft - track.scrollLeft) <
        Math.abs(children[closest].offsetLeft - track.scrollLeft)
          ? index
          : closest, 0);

      setActiveIndex(closestIndex);
    }

    track.addEventListener("scroll", syncActiveIndex, { passive: true });
    return () => track.removeEventListener("scroll", syncActiveIndex);
  }, []);

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
          <button type="button" onPointerDown={(event) => handlePointerDown(event, -1)} onClick={() => handleClick(-1)} disabled={activeIndex === 0} className="absolute left-2 top-1/2 z-20 grid size-11 touch-manipulation select-none -translate-y-1/2 place-items-center rounded-full border border-zinc-300 bg-white text-zinc-900 shadow-sm transition-colors hover:border-red-600 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-40" aria-label="Önceki görseller">
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button type="button" onPointerDown={(event) => handlePointerDown(event, 1)} onClick={() => handleClick(1)} disabled={activeIndex === items.length - 1} className="absolute right-2 top-1/2 z-20 grid size-11 touch-manipulation select-none -translate-y-1/2 place-items-center rounded-full border border-zinc-300 bg-white text-zinc-900 shadow-sm transition-colors hover:border-red-600 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-40" aria-label="Sonraki görseller">
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
