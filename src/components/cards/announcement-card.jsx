import Link from "next/link";

type Props = { title: string; date: string; slug: string; summary?: string };

export function AnnouncementCard({ title, date, slug, summary }: Props) {
  return <article className="rounded-lg border border-[#6C757D]/20 bg-white p-5"><time className="text-sm text-[#6C757D]">{date}</time><h2 className="mt-2 text-xl font-bold"><Link className="hover:text-[#EC1C24]" href={`/duyurular/${slug}`}>{title}</Link></h2>{summary && <p className="mt-3 text-[#6C757D]">{summary}</p>}</article>;
}
