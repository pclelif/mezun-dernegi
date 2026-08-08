import Link from "next/link";

type Props = { title: string; date: string; slug: string; summary?: string };

export function AnnouncementCard({ title, date, slug, summary }: Props) {
  return <article className="rounded-lg border border-[#6C757D]/20 border-t-4 border-t-[#EC1C24] bg-white p-5"><time className="text-sm text-black">{date}</time><h2 className="mt-2 text-xl font-bold"><Link href={`/duyurular/${slug}`}>{title}</Link></h2>{summary && <p className="mt-3 text-black">{summary}</p>}</article>;
}
