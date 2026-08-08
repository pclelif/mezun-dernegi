import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card } from "./card";

type AnnouncementCardProps = { title: string; date: string; slug: string; summary?: string };

export function AnnouncementCard({ title, date, slug, summary }: AnnouncementCardProps) {
  return <Card className="flex h-full flex-col"><time className="text-xs font-semibold uppercase tracking-wider text-red-600">{date}</time><h3 className="mt-3 text-lg font-bold leading-snug text-zinc-950"><Link href={`/duyurular/${slug}`}>{title}</Link></h3>{summary && <p className="mt-3 text-sm leading-6 text-zinc-600">{summary}</p>}<Link className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-zinc-900" href={`/duyurular/${slug}`}>Devamını oku <ArrowRight className="size-4" /></Link></Card>;
}
