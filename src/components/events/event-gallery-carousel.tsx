"use client";

import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { useRef, useState } from "react";

type EventGalleryCarouselProps = {
  photos: string[];
  title: string;
};

export function EventGalleryCarousel({ photos, title }: EventGalleryCarouselProps) {
  const validPhotos = photos.filter((p) => Boolean(p && typeof p === "string" && p.trim().length > 0));
  const trackRef = useRef<HTMLDivElement>(null);
  const lastTouchRef = useRef(0);
  const pressTimerRef = useRef<number | null>(null);
  const [pressedDirection, setPressedDirection] = useState<-1 | 1 | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const total = validPhotos.length;

  if (total === 0) return null;

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

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
        <div className="flex items-center gap-2 text-sm font-bold text-zinc-900">
          <span className="grid size-6.5 place-items-center rounded-md bg-red-50 text-[#ec1c24]">
            <Images className="size-3.5" aria-hidden="true" />
          </span>
          <span>Etkinlik Fotoğrafları</span>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
          {total} Fotoğraf
        </span>
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          tabIndex={0}
          aria-label="Etkinlik fotoğraf galerisi"
        >
          {validPhotos.map((photoUrl, index) => (
            <figure
              key={`${photoUrl}-${index}`}
              className="relative aspect-square min-w-[64%] sm:min-w-[38%] md:min-w-[28%] lg:min-w-[23%] xl:min-w-[22%] shrink-0 snap-start overflow-hidden rounded-xl border border-zinc-200 bg-white cursor-pointer transition-all duration-200 hover:shadow-lg"
              onClick={() => setSelectedImage(photoUrl)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoUrl}
                alt={`${title} fotoğrafı (${index + 1}/${total})`}
                className="size-full object-contain p-2 select-none"
                style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
              />
            </figure>
          ))}
        </div>

        {total > 1 && (
          <div className="pointer-events-none absolute inset-0 -mx-2 flex items-center justify-between">
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
                    pressedDirection === direction
                      ? "scale-95 border-red-600 bg-red-600 text-white"
                      : "border-zinc-300 bg-white/95 text-zinc-900 backdrop-blur-xs"
                  }`}
                  aria-label={isPrevious ? "Önceki fotoğraflar" : "Sonraki fotoğraflar"}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal matching Galeri */}
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
          <div
            className="relative flex max-h-[85vh] max-w-[90vw] items-center justify-center overflow-hidden rounded-2xl bg-black/40 p-2 shadow-2xl backdrop-blur-sm border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt="Büyütülmüş etkinlik fotoğrafı"
              className="max-h-[80vh] max-w-[85vw] rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
