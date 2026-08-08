import Link from "next/link";

type Props = { title: string; date: string; location: string; slug: string };

export function EventCard({ title, date, location, slug }: Props) {
  return <article className="rounded-2xl bg-[#EC1C24] p-6 text-white"><time className="text-sm text-white/70">{date}</time><h2 className="mt-2 text-xl font-bold"><Link href={`/etkinlikler/${slug}`}>{title}</Link></h2><p className="mt-3 text-white/70">{location}</p></article>;
}
