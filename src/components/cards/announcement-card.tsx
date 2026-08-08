import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card } from "./card";

export type AnnouncementCardProps = {
  title: string;
  date: string;
  summary: string;
  href: string;
  dateTime?: string;
  headingLevel?: "h2" | "h3";
};

export function AnnouncementCard({
  title,
  date,
  summary,
  href,
  dateTime,
  headingLevel = "h2",
}: AnnouncementCardProps) {
  const Heading = headingLevel;

  return (
    <Card interactive>
      <time dateTime={dateTime} className="text-xs font-semibold uppercase tracking-wider text-red-600">
        {date}
      </time>
      <Heading className="mt-3 text-lg font-bold leading-snug text-zinc-950 [overflow-wrap:anywhere]">
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
        aria-label={`${title} duyurusunun devamını oku`}
        className="mt-auto flex min-h-11 items-center gap-2 self-start rounded-sm pt-5 text-sm font-semibold text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        Devamını oku
        <ArrowRight className="size-4 shrink-0 text-red-600" aria-hidden="true" />
      </Link>
    </Card>
  );
}
