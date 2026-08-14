import { ArrowLeft, CalendarDays, Clock3, MapPin } from "lucide-react";
import type { Metadata } from "next";
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 transition-colors hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Geri Dön
          </Link>

          <div className="mt-8 max-w-3xl">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                isUpcoming ? "bg-red-600 text-white" : "bg-zinc-300 text-zinc-700"
              }`}
            >
              {isUpcoming ? "Yaklaşan Etkinlik" : "Geçmiş Etkinlik"}
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 md:text-4xl">{event.title}</h1>

            <div className="mt-6 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-x-6">
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
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(100%-2rem,75rem)] py-12 md:w-[min(100%-4rem,75rem)] md:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <div>
            <div
              className="aspect-video w-full rounded-xl bg-slate-100 bg-cover bg-center"
              style={event.image_url ? { backgroundImage: `url(${event.image_url})` } : undefined}
              aria-hidden="true"
            />
            <div className="prose prose-zinc mt-8 max-w-3xl">
              <p className="text-base leading-7 text-zinc-700 md:text-lg md:leading-8">
                {event.description || "Bu etkinlik için henüz açıklama eklenmemiş."}
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <Link
              href="/uyelik"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#ec1c24] px-8 font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600 lg:min-w-48 lg:w-auto"
            >
              Etkinliğe Katıl
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
