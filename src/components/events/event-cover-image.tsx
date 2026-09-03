"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (total < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setCurrentIndex((index) => (index + 1) % total), 5000);
    return () => window.clearInterval(timer);
  }, [total]);

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
          <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            {currentIndex + 1} / {total}
          </span>
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
        </div>
      )}
    </>
  );
}
