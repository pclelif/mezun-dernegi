import Link from "next/link";

type Props = { title: string; date: string; location: string; slug: string };

export function EventCard({ title, date, location, slug }: Props) {
  return <article className="rounded-2xl border-l-4 border-[#EC1C24] bg-[#F1F3F5] p-6"><time className="text-sm font-medium text-[#EC1C24]">{date}</time><h2 className="mt-2 text-xl font-bold"><Link href={`/etkinlikler/${slug}`}>{title}</Link></h2><p className="mt-3 text-[#6C757D]">{location}</p></article>;
}
