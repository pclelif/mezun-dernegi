import { ArrowLeft, CalendarDays, Clock3, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatTurkishDate } from "@/lib/supabase/client";
import { getEventBySlug } from "@/lib/supabase/queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const event = await getEventBySlug(slug);
    if (!event) return { title: "Etkinlik bulunamadı" };
    return { title: event.title };
  } catch {
    return { title: "Etkinlik" };
  }
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let event = null;
  try {
    event = await getEventBySlug(slug);
  } catch {
    notFound();
  }
  if (!event) notFound();

  const isUpcoming = event.status !== "past";

  return (
    <article>
      <section className="border-b border-zinc-200 bg-slate-50">
        <div className="mx-auto w-[min(100%-2rem,75rem)] py-10 md:w-[min(100%-4rem,75rem)] md:py-14">
          <Link
            href="/etkinlikler"
            className="inline-flex touch-manipulation items-center gap-2 text-sm font-semibold text-zinc-700 transition-colors hover:text-red-600 active:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span className="relative top-[1.5px]">Geri Dön</span>
          </Link>

          <div className="mt-8">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                isUpcoming ? "bg-red-600 text-white" : "bg-zinc-300 text-zinc-700"
              }`}
            >
              {isUpcoming ? "Yaklaşan Etkinlik" : "Geçmiş Etkinlik"}
            </span>

            <div className="mt-5 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-x-6">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
                <time dateTime={event.date ?? undefined}>{formatTurkishDate(event.date) || "Tarih yok"}</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="size-4 shrink-0" aria-hidden="true" />
                {event.time || "—"}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 shrink-0" aria-hidden="true" />
                {event.location || "—"}
              </span>
            </div>

            <h1 className="mt-4 max-w-5xl text-2xl font-bold leading-tight tracking-tight text-zinc-950 md:text-3xl">
              {event.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(100%-2rem,75rem)] py-12 md:w-[min(100%-4rem,75rem)] md:py-16">
        <div className={event.image_url ? "grid items-start gap-8 lg:grid-cols-[22rem_minmax(0,1fr)]" : undefined}>
          {event.image_url ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-200 bg-slate-50">
              <Image
                src={event.image_url}
                alt={`${event.title} etkinlik görseli`}
                fill
                sizes="(max-width: 1023px) calc(100vw - 2rem), 22rem"
                className="object-contain"
              />
            </div>
          ) : null}
          <p className="whitespace-pre-line text-base leading-7 text-zinc-700 md:text-lg md:leading-8">
            {event.description || "Bu etkinlik için henüz açıklama eklenmemiş."}
          </p>
        </div>
      </section>
    </article>
  );
}
