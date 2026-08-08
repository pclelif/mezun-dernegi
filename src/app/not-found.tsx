import Link from "next/link";

export default function NotFound() {
  return <section className="container-site section-space min-h-[50vh] text-center"><p className="text-sm font-bold text-[#EC1C24]">404</p><h1 className="mt-3 text-3xl font-bold">Sayfa bulunamadı</h1><Link className="mt-6 inline-flex rounded-md bg-[#EC1C24] px-5 py-2.5 text-white" href="/">Ana sayfaya dön</Link></section>;
}
