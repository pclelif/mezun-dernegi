import Link from "next/link";

export function AnnouncementCard({ title, date, slug, summary }) {
  return (
    <article className="content-card">
      <time className="content-card__meta">{date}</time>
      <h2 className="content-card__title"><Link href={`/duyurular/${slug}`}>{title}</Link></h2>
      {summary && <p className="content-card__description">{summary}</p>}
    </article>
  );
}
