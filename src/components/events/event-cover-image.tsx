"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CroppedImage } from "@/components/shared/cropped-image";
import type { ImageCrop } from "@/lib/supabase/client";

type EventCoverImageProps = {
  photos: string[];
  crops?: (ImageCrop | null)[];
  alt: string;
};

export function EventCoverImage({ photos, crops = [], alt }: EventCoverImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const validPhotos = photos
    .map((photo, index) => ({ photo, crop: crops[index] ?? null }))
    .filter(({ photo }) => Boolean(photo && photo.trim()));
  const total = validPhotos.length;
  const currentPhoto = validPhotos[currentIndex] ?? validPhotos[0];

  const goToNext = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((index) => (index + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((index) => (index - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (total < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(goToNext, 5000);
    return () => window.clearInterval(timer);
  }, [total, goToNext]);

  if (!currentPhoto) return null;

  return (
    <>
      <div
        className="group relative aspect-[16/9] w-full max-w-lg cursor-pointer overflow-hidden rounded-xl border border-zinc-200/80 bg-slate-50 transition-all duration-200 hover:border-zinc-300 hover:shadow-sm"
        onClick={() => setIsOpen(true)}
      >
        {validPhotos.map(({ photo, crop }, index) => (
          <div
            key={`${photo}-${index}`}
            className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <CroppedImage
              src={photo}
              alt={index === currentIndex ? alt : ""}
              crop={crop}
              className={crop ? "" : "absolute inset-0 size-full object-cover"}
            />
          </div>
        ))}

        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goToPrev();
              }}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white opacity-70 backdrop-blur-sm transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Önceki fotoğraf"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goToNext();
              }}
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white opacity-70 backdrop-blur-sm transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Sonraki fotoğraf"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
            <span className="pointer-events-none absolute bottom-2 right-2 z-20 rounded-full bg-black/60 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
              {currentIndex + 1} / {total}
            </span>
          </>
        ) : null}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
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
              src={currentPhoto.photo}
              alt={alt}
              className="max-h-[80vh] max-w-[85vw] rounded-xl object-contain"
            />
          </div>

          {total > 1 ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goToPrev();
                }}
                className="absolute left-4 top-1/2 z-[100000] -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-70 backdrop-blur-sm transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-6"
                aria-label="Önceki fotoğraf"
              >
                <ChevronLeft className="size-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 z-[100000] -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-70 backdrop-blur-sm transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6"
                aria-label="Sonraki fotoğraf"
              >
                <ChevronRight className="size-6" aria-hidden="true" />
              </button>
              <span className="pointer-events-none absolute bottom-6 left-1/2 z-[100000] -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {currentIndex + 1} / {total}
              </span>
            </>
          ) : null}
        </div>
      )}
    </>
  );
}
