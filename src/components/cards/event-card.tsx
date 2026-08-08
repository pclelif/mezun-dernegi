import { CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";
import { Card } from "./card";

type EventCardProps = { title: string; date: string; location: string; slug: string };

export function EventCard({ title, date, location, slug }: EventCardProps) {
  return <Card className="h-full border-l-4 border-l-red-600"><div className="flex items-center gap-2 text-sm font-semibold text-red-600"><CalendarDays className="size-4" /><time>{date}</time></div><h3 className="mt-4 text-xl font-bold text-zinc-950"><Link href={`/etkinlikler/${slug}`}>{title}</Link></h3><p className="mt-3 flex items-center gap-2 text-sm text-zinc-600"><MapPin className="size-4" />{location}</p></Card>;
}
