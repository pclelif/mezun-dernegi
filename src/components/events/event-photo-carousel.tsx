"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type EventPhotoCarouselProps = {
  photos: string[];
  title: string;
};

export function EventPhotoCarousel({ photos, title }: EventPhotoCarouselProps) {
  const validPhotos = photos.filter((p) => Boolean(p && typeof p === "string" && p.trim().length > 0));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const lastTouchRef = useRef(0);
  const pressTimerRef = useRef<number | null>(null);
  const [pressedDirection, setPressedDirection] = useState<-1 | 1 | null>(null);

  const total = validPhotos.length;

  const goToNext = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay timer: 5 seconds, restarts on manual navigation or hover change
  useEffect(() => {
    if (total <= 1 || isHovered) return;

    const timer = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [total, isHovered, currentIndex, goToNext]);

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
    if (direction === 1) goToNext();
    else goToPrev();
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>, direction: -1 | 1) {
    if (event.timeStamp - lastTouchRef.current < 500) return;
    showPressedState(direction);
    if (direction === 1) goToNext();
    else goToPrev();
  }

  if (total === 0) return null;

  // Single photo: standard full-bleed display without carousel overhead
  if (total === 1) {
    return (
      <>
        <div
          className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900 cursor-pointer group"
          onClick={() => setSelectedImage(validPhotos[0])}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={validPhotos[0]}
            alt={`${title} etkinlik görseli`}
            className="w-full h-full object-cover object-center block transition-transform duration-300 group-hover:scale-[1.02]"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
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
      </>
    );
  }

  // Multi-photo Carousel with Galeri design language
  return (
    <>
      <div
        className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900 select-none group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Layered Images with smooth fade transition */}
        {validPhotos.map((photoUrl, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={`${photoUrl}-${index}`}
              className={`absolute inset-0 size-full transition-opacity duration-700 ease-in-out cursor-pointer ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
              onClick={() => setSelectedImage(photoUrl)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoUrl}
                alt={`${title} etkinlik görseli (${index + 1}/${total})`}
                className="size-full object-cover object-center block"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          );
        })}

        {/* Counter Badge */}
        <div className="absolute bottom-3 right-3 z-20 pointer-events-none rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm shadow-sm">
          {currentIndex + 1} / {total}
        </div>

        {/* Navigation Arrows matching Galeri style */}
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-between px-3 sm:px-4">
          {([-1, 1] as const).map((direction) => {
            const isPrevious = direction === -1;
            const Icon = isPrevious ? ChevronLeft : ChevronRight;
            return (
              <button
                key={direction}
                type="button"
                onTouchEnd={(event) => handleTouchEnd(event, direction)}
                onClick={(event) => handleClick(event, direction)}
                className={`pointer-events-auto grid size-11 sm:size-12 touch-manipulation select-none place-items-center rounded-full border shadow-md transition-all hover:border-red-600 hover:bg-red-600 hover:text-white active:scale-95 active:border-red-600 active:bg-red-600 active:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600 ${
                  pressedDirection === direction
                    ? "scale-95 border-red-600 bg-red-600 text-white"
                    : "border-zinc-300/90 bg-white/95 text-zinc-900 backdrop-blur-xs hover:border-red-600 hover:bg-red-600 hover:text-white"
                }`}
                aria-label={isPrevious ? "Önceki fotoğraf" : "Sonraki fotoğraf"}
              >
                <Icon className="size-5" aria-hidden="true" />
              </button>
            );
          })}
        </div>
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
    </>
  );
}
