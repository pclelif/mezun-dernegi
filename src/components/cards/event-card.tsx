import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import Link from "next/link";
import { Card } from "./card";

export type EventStatus = "upcoming" | "past";

export type EventCardProps = {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  href: string;
  status?: EventStatus;
  dateTime?: string;
  headingLevel?: "h2" | "h3";
};

export function EventCard({
  title,
  date,
  time,
  location,
  description,
  href,
  status = "upcoming",
  dateTime,
  headingLevel = "h2",
}: EventCardProps) {
  const Heading = headingLevel;
  const isPast = status === "past";

  return (
    <Card interactive className={isPast ? "border-l-4 border-l-zinc-400 bg-zinc-50" : "border-l-4 border-l-red-600"}>
      <p className={`text-xs font-semibold uppercase tracking-wider ${isPast ? "text-zinc-500" : "text-red-600"}`}>
        {isPast ? "Geçmiş etkinlik" : "Yaklaşan etkinlik"}
      </p>
      <div className="mt-3 grid min-w-0 gap-2 text-sm font-semibold text-zinc-700 sm:grid-cols-2">
        <span className="flex min-w-0 items-start gap-2">
          <CalendarDays className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <time dateTime={dateTime} className="[overflow-wrap:anywhere]">{date}</time>
        </span>
        <span className="flex min-w-0 items-start gap-2 sm:justify-end">
          <Clock3 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span className="[overflow-wrap:anywhere]">{time}</span>
        </span>
      </div>
      <Heading className="mt-4 text-xl font-bold leading-snug text-zinc-950 [overflow-wrap:anywhere]">
        <Link
          href={href}
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
        >
          {title}
        </Link>
      </Heading>
      <p className="mt-3 text-sm leading-6 text-zinc-600 [overflow-wrap:anywhere]">{description}</p>
      <p className="mt-auto flex min-w-0 items-start gap-2 border-t border-zinc-200 pt-4 text-sm leading-6 text-zinc-600">
        <MapPin className="mt-1 size-4 shrink-0" aria-hidden="true" />
        <span className="[overflow-wrap:anywhere]">{location}</span>
      </p>
      <Link
        href={href}
        aria-label={`${title} etkinliğinin detaylarını görüntüle`}
        className="flex min-h-11 items-center gap-2 self-start rounded-sm pt-5 text-sm font-semibold text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        Detayları incele
        <ArrowRight className="size-4 shrink-0 text-zinc-900" aria-hidden="true" />
      </Link>
    </Card>
  );
}
