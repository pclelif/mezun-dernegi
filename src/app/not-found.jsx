import Link from "next/link";

export default function NotFound() {
  return <section className="container-site section-space not-found"><p className="not-found__code">404</p><h1>Sayfa bulunamadı</h1><Link className="button button--primary" href="/">Ana sayfaya dön</Link></section>;
}
