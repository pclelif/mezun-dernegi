"use client";

import { ArrowRight, ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { CroppedImage } from "@/components/shared/cropped-image";
import type { ImageCrop } from "@/lib/supabase/client";

export type GalleryShowcaseItem = {
  id: string;
  title: string;
  href: string;
  imageUrl: string | null;
  crop?: ImageCrop | null;
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-4">
            {items.map((item) => (
              <figure
                key={item.id}
                className="relative aspect-[4/3] overflow-hidden rounded-xl border border-zinc-200 bg-white cursor-pointer hover:shadow-lg transition-all duration-200"
                onClick={() => item.imageUrl && setSelectedImage(item.imageUrl)}
              >
                {item.imageUrl ? (
                  <CroppedImage src={item.imageUrl} alt={item.title || "Galeri fotoğrafı"} crop={item.crop} className={item.crop ? "" : "absolute inset-0 size-full object-contain p-3 transition-transform duration-300 hover:scale-105"} />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-zinc-400" aria-hidden="true">
                    <Images className="size-12" />
                  </div>
                )}
              </figure>
            ))}
          </div>
        </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute top-5 right-5 z-[100000] grid size-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all hover:bg-red-600 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Kapat"
          >
            <X className="size-6" />
          </button>
          <div className="relative flex max-h-[85vh] max-w-[90vw] items-center justify-center overflow-hidden rounded-2xl bg-black/40 p-2 shadow-2xl backdrop-blur-sm border border-white/10" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Büyütülmüş fotoğraf"
              className="max-h-[80vh] max-w-[85vw] rounded-xl object-contain"
            />
          </div>
        </div>
      )}
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
                <p className="text-xs font-semibold uppercase leading-tight tracking-[0.02em] text-red-600">ANILARIMIZDAN SEÇKİLER</p>
                <h2 id="gallery-showcase-title" className="mt-0.5 text-2xl font-bold leading-tight tracking-tight text-zinc-950 md:text-[1.75rem]">
                  {title}
                </h2>
                {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">{description}</p> : null}
              </div>
            </div>
            {showAllLink ? (
              <Link href="/galeri" className="inline-flex touch-manipulation items-center gap-2 self-start rounded-sm text-sm font-bold text-zinc-900 transition-colors hover:text-red-700 active:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600 sm:self-auto -translate-x-[1.5px] -translate-y-[2.5px]">
                Tüm Fotoğraflar <ArrowRight className="size-4 text-zinc-900" aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        ) : null}

        <div className="relative">
          <div ref={trackRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" tabIndex={0} aria-label="Fotoğraf galerisi">
            {items.map((item) => (
              <figure
                key={item.id}
                className="relative aspect-[4/3] min-w-[72%] sm:min-w-[44%] md:min-w-[34%] lg:min-w-[28%] xl:min-w-[28%] snap-start overflow-hidden rounded-xl border border-zinc-200 bg-white cursor-pointer hover:shadow-lg transition-all duration-200"
                onClick={() => item.imageUrl && setSelectedImage(item.imageUrl)}
              >
                {item.imageUrl ? (
                  <CroppedImage src={item.imageUrl} alt={item.title || "Galeri fotoğrafı"} crop={item.crop} className={item.crop ? "" : "absolute inset-0 size-full object-contain p-3 transition-transform duration-300 hover:scale-105"} />
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

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute top-5 right-5 z-[100000] grid size-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all hover:bg-red-600 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Kapat"
          >
            <X className="size-6" />
          </button>
          <div className="relative flex max-h-[85vh] max-w-[90vw] items-center justify-center overflow-hidden rounded-2xl bg-black/40 p-2 shadow-2xl backdrop-blur-sm border border-white/10" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Büyütülmüş fotoğraf"
              className="max-h-[80vh] max-w-[85vw] rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
