import Link from "next/link";

export default function NotFound() {
  return <section className="container-site section-space min-h-[60vh] text-center"><p className="text-sm font-bold text-[#1f5a40]">404</p><h1 className="mt-3 text-4xl font-bold">Sayfa bulunamadı</h1><Link className="mt-8 inline-flex rounded-full bg-[#143d2b] px-6 py-3 text-white" href="/">Ana sayfaya dön</Link></section>;
}
