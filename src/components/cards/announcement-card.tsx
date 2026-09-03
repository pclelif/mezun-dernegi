"use client";

import { ArrowRight, Megaphone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "./card";

export type AnnouncementCardProps = {
  title: string;
  date: string;
  summary: string;
  href: string;
  dateTime?: string;
  headingLevel?: "h2" | "h3";
  imageUrls?: string[];
  showImage?: boolean;
};

export function AnnouncementCard({
  title,
  date,
  summary,
  href,
  dateTime,
  headingLevel = "h2",
  imageUrls = [],
  showImage = true,
}: AnnouncementCardProps) {
  const Heading = headingLevel;
  const photos = imageUrls.filter((photo) => Boolean(photo?.trim()));
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    if (!showImage || photos.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setCurrentPhoto((index) => (index + 1) % photos.length), 5000);
    return () => window.clearInterval(timer);
  }, [showImage, photos.length]);

  return (
    <Card interactive className="border-l-4 border-l-red-600">
      {showImage ? (
        photos.length > 0 ? (
          <Link
            href={href}
            tabIndex={-1}
            aria-hidden="true"
            className="group relative mb-4 block h-40 overflow-hidden rounded-md border border-zinc-200 bg-white sm:h-44"
          >
            {photos.map((photo, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${photo}-${index}`}
                src={photo}
                alt=""
                className={`absolute inset-0 size-full object-cover transition-opacity duration-500 group-hover:scale-[1.02] ${
                  index === currentPhoto ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            {photos.length > 1 ? (
              <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                {currentPhoto + 1} / {photos.length}
              </span>
            ) : null}
          </Link>
        ) : null
      ) : null}

      <time dateTime={dateTime} className="text-xs font-semibold uppercase tracking-wider text-red-600">
        {date}
      </time>
      <Heading className="mt-4 text-xl font-bold leading-snug text-zinc-950 [overflow-wrap:anywhere]">
        <Link
          href={href}
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
        >
          {title}
        </Link>
      </Heading>
      <p className="mt-3 text-sm leading-6 text-zinc-600 [overflow-wrap:anywhere]">{summary}</p>
      <Link
        href={href}
        aria-label={`${title} duyurusunun detaylarını görüntüle`}
        className="mt-auto flex min-h-11 items-center gap-2 self-start rounded-sm pt-5 text-sm font-semibold text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        Detayları incele
        <ArrowRight className="size-4 shrink-0 text-zinc-900" aria-hidden="true" />
      </Link>
    </Card>
  );
}
