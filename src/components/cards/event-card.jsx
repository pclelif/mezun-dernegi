import Link from "next/link";

type Props = { title: string; date: string; location: string; slug: string };

export function EventCard({ title, date, location, slug }: Props) {
  return <article className="rounded-lg border border-[#6C757D]/20 bg-[#F1F3F5] p-5"><time className="text-sm font-medium text-[#EC1C24]">{date}</time><h2 className="mt-2 text-xl font-bold"><Link className="hover:text-[#EC1C24]" href={`/etkinlikler/${slug}`}>{title}</Link></h2><p className="mt-3 text-[#6C757D]">{location}</p></article>;
}
