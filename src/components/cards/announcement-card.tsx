import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card } from "./card";

type AnnouncementCardProps = { title: string; date: string; slug: string; summary?: string };

export function AnnouncementCard({ title, date, slug, summary }: AnnouncementCardProps) {
  return <Card><time className="text-xs font-semibold uppercase tracking-wider text-red-600">{date}</time><h3 className="mt-3 text-lg font-bold leading-snug text-zinc-950 [overflow-wrap:anywhere]"><Link className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600" href={`/duyurular/${slug}`}>{title}</Link></h3>{summary && <p className="mt-3 text-sm leading-6 text-zinc-600 [overflow-wrap:anywhere]">{summary}</p>}<Link className="mt-auto flex min-h-11 items-center gap-2 self-start rounded-sm pt-5 text-sm font-semibold text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600" href={`/duyurular/${slug}`}>Devamını oku <ArrowRight className="size-4 shrink-0" aria-hidden="true" /></Link></Card>;
}
