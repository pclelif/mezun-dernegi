"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import type { DbGallery } from "@/lib/supabase/client";

type GalleryShowcaseProps = {
  items: Pick<DbGallery, "slug">[];
};

export function GalleryShowcase({ items }: GalleryShowcaseProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const lastTouchRef = useRef(0);
  const pressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pressedDirection, setPressedDirection] = useState<-1 | 1 | null>(null);

  function move(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length === 0) return;

    const trackLeft = track.getBoundingClientRect().left;
    const currentIndex = cards.reduce((closest, card, index) =>
      Math.abs(card.getBoundingClientRect().left - trackLeft) <
      Math.abs(cards[closest].getBoundingClientRect().left - trackLeft)
        ? index
        : closest, 0);
    const nextIndex = Math.min(Math.max(currentIndex + direction, 0), cards.length - 1);
    const nextItem = cards[nextIndex];
    if (!nextItem) return;

    nextItem.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "nearest",
      inline: "start",
    });
  }

  function showPressedState(direction: -1 | 1) {
    if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
    setPressedDirection(direction);
    pressTimerRef.current = setTimeout(() => setPressedDirection(null), 350);
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLButtonElement>, direction: -1 | 1) {
    event.preventDefault();
    event.stopPropagation();
    lastTouchRef.current = Date.now();
    showPressedState(direction);
    move(direction);
  }

  function handleClick(direction: -1 | 1) {
    if (Date.now() - lastTouchRef.current < 500) return;
    showPressedState(direction);
    move(direction);
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
              <div key={item.slug} className="aspect-[4/3] min-w-[82%] snap-start rounded-lg border border-zinc-200 bg-zinc-100 sm:min-w-[46%] lg:min-w-[31%]" aria-hidden="true" />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-between px-2" aria-hidden="false">
            <button type="button" onTouchEnd={(event) => handleTouchEnd(event, -1)} onClick={() => handleClick(-1)} className={`pointer-events-auto grid size-12 touch-manipulation select-none place-items-center rounded-full border shadow-md transition-all hover:border-red-600 hover:bg-red-600 hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${pressedDirection === -1 ? "scale-95 border-red-600 bg-red-600 text-white" : "border-zinc-300 bg-white text-zinc-900"}`} aria-label="Önceki görseller">
              <ChevronLeft className="pointer-events-none size-5" aria-hidden="true" />
            </button>
            <button type="button" onTouchEnd={(event) => handleTouchEnd(event, 1)} onClick={() => handleClick(1)} className={`pointer-events-auto grid size-12 touch-manipulation select-none place-items-center rounded-full border shadow-md transition-all hover:border-red-600 hover:bg-red-600 hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${pressedDirection === 1 ? "scale-95 border-red-600 bg-red-600 text-white" : "border-zinc-300 bg-white text-zinc-900"}`} aria-label="Sonraki görseller">
              <ChevronRight className="pointer-events-none size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <Link href="/galeri" className="mt-6 inline-flex items-center gap-2 rounded-sm text-sm font-bold text-white hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          Tüm galeriyi görüntüle <ArrowRight className="size-4 text-red-500" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
