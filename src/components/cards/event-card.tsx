import { CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";
import { Card } from "./card";

type EventCardProps = { title: string; date: string; location: string; slug: string };

export function EventCard({ title, date, location, slug }: EventCardProps) {
  return <Card className="border-l-4 border-l-red-600"><div className="flex min-w-0 items-start gap-2 text-sm font-semibold text-red-600"><CalendarDays className="mt-0.5 size-4 shrink-0" aria-hidden="true" /><time className="[overflow-wrap:anywhere]">{date}</time></div><h3 className="mt-4 text-xl font-bold leading-snug text-zinc-950 [overflow-wrap:anywhere]"><Link className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600" href={`/etkinlikler/${slug}`}>{title}</Link></h3><p className="mt-3 flex min-w-0 items-start gap-2 text-sm leading-6 text-zinc-600"><MapPin className="mt-1 size-4 shrink-0" aria-hidden="true" /><span className="[overflow-wrap:anywhere]">{location}</span></p></Card>;
}
