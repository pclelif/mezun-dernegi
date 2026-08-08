import Link from "next/link";

export function EventCard({ title, date, location, slug }) {
  return (
    <article className="content-card content-card--surface">
      <time className="content-card__date">{date}</time>
      <h2 className="content-card__title"><Link href={`/etkinlikler/${slug}`}>{title}</Link></h2>
      <p className="content-card__description">{location}</p>
    </article>
  );
}
