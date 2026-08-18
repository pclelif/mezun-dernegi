"use client";

import { ArrowRight, ChevronLeft, ChevronRight, Images } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

export type GalleryShowcaseItem = {
  id: string;
  title: string;
  href: string;
  imageUrl: string | null;
  date?: string;
  dateTime?: string;
};

type GalleryShowcaseProps = {
  items: GalleryShowcaseItem[];
  title?: string;
  description?: string;
  showAllLink?: boolean;
  showHeader?: boolean;
  displayMode?: "albums" | "carousel" | "grid";
};

export function GalleryShowcase({ items, title = "Galeri", description, showAllLink = true, showHeader = true, displayMode = "albums" }: GalleryShowcaseProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const lastTouchRef = useRef(0);
  const pressTimerRef = useRef<number | null>(null);
  const [pressedDirection, setPressedDirection] = useState<-1 | 1 | null>(null);

  function move(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length === 0) return;
    const trackLeft = track.getBoundingClientRect().left;
    const currentIndex = cards.reduce((closest, card, index) =>
      Math.abs(card.getBoundingClientRect().left - trackLeft) < Math.abs(cards[closest].getBoundingClientRect().left - trackLeft)
        ? index
        : closest, 0);
    const nextItem = cards[Math.min(Math.max(currentIndex + direction, 0), cards.length - 1)];
    if (!nextItem) return;
    nextItem.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "nearest",
      inline: "start",
    });
  }

  function showPressedState(direction: -1 | 1) {
    if (pressTimerRef.current) window.clearTimeout(pressTimerRef.current);
    setPressedDirection(direction);
    pressTimerRef.current = window.setTimeout(() => setPressedDirection(null), 350);
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLButtonElement>, direction: -1 | 1) {
    event.preventDefault();
    event.stopPropagation();
    lastTouchRef.current = event.timeStamp;
    showPressedState(direction);
    move(direction);
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>, direction: -1 | 1) {
    if (event.timeStamp - lastTouchRef.current < 500) return;
    showPressedState(direction);
    move(direction);
  }

  // Grid mode for /galeri page
  if (displayMode === "grid") {
    return (
      <section className="overflow-hidden border-t border-zinc-200 bg-white px-4 py-14 text-zinc-950 md:py-20" aria-label="Fotoğraflar">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6">
            {items.map((item) => (
              <figure key={item.id} className="relative aspect-square overflow-hidden rounded-lg border border-zinc-200 bg-white cursor-pointer hover:shadow-lg transition-shadow" onClick={() => window.open(item.imageUrl || '', '_blank')}>
                {item.imageUrl ? (
                  <div className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-300" style={{ backgroundImage: `url(${item.imageUrl})` }} role="img" aria-label={item.title} />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-zinc-400" aria-hidden="true">
                    <Images className="size-12" />
                  </div>
                )}
              </figure>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Carousel mode (albums and carousel displayModes)
  return (
    <section className="overflow-hidden border-t border-zinc-200 bg-white px-4 py-14 text-zinc-950 md:py-20" aria-labelledby={showHeader ? "gallery-showcase-title" : undefined}>
      <div className="mx-auto max-w-7xl">
        {showHeader ? (
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-9 -translate-y-[3px] shrink-0 place-items-center rounded-lg bg-red-50 text-red-600">
                <Images className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase leading-tight tracking-[0.02em] text-red-600">Anılarımızdan Seçkiler</p>
                <h2 id="gallery-showcase-title" className="mt-0.5 text-2xl font-bold leading-tight tracking-tight text-zinc-950 md:text-[1.75rem]">
                  {title}
                </h2>
                {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">{description}</p> : null}
              </div>
            </div>
            {showAllLink ? (
              <Link href="/galeri" className="inline-flex touch-manipulation items-center gap-2 self-start rounded-sm text-sm font-bold text-zinc-900 transition-colors hover:text-red-700 active:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600 sm:self-auto">
                Tüm galeriyi görüntüle <ArrowRight className="size-4 text-zinc-900" aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        ) : null}

        <div className="relative">
          <div ref={trackRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" tabIndex={0} aria-label="Fotoğraf galerisi">
            {items.map((item) => (
              <figure key={item.id} className="relative aspect-[4/3] min-w-[78%] snap-start overflow-hidden rounded-lg border border-zinc-200 bg-white sm:min-w-[43%] lg:min-w-[29%]">
                {item.imageUrl ? (
                  <div className="absolute inset-0 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${item.imageUrl})` }} role="img" aria-label={item.title} />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-zinc-400" aria-hidden="true">
                    <Images className="size-12" />
                  </div>
                )}
              </figure>
            ))}
          </div>

          {items.length > 1 ? (
            <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-between px-2">
              {([-1, 1] as const).map((direction) => {
                const isPrevious = direction === -1;
                const Icon = isPrevious ? ChevronLeft : ChevronRight;
                return (
                  <button
                    key={direction}
                    type="button"
                    onTouchEnd={(event) => handleTouchEnd(event, direction)}
                    onClick={(event) => handleClick(event, direction)}
                    className={`pointer-events-auto grid size-12 touch-manipulation select-none place-items-center rounded-full border shadow-md transition-all hover:border-red-600 hover:bg-red-600 hover:text-white active:scale-95 active:border-red-600 active:bg-red-600 active:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600 ${
                      pressedDirection === direction ? "scale-95 border-red-600 bg-red-600 text-white" : "border-zinc-300 bg-white text-zinc-900"
                    }`}
                    aria-label={isPrevious ? "Önceki görseller" : "Sonraki görseller"}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
