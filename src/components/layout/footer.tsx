import Link from "next/link";

export function Footer() {
  return <footer className="bg-[#6C757D] py-12 text-white"><div className="container-site grid gap-8 md:grid-cols-3"><div><p className="text-lg font-bold">KAAFL Mezun Derneği</p><p className="mt-3 text-sm text-white/60">Bir okul. Binlerce hikâye. Tek bir aile.</p></div><div><p className="font-bold">Hızlı bağlantılar</p><div className="mt-3 grid gap-2 text-sm text-white/70"><Link href="/kurumsal/hakkimizda">Hakkımızda</Link><Link href="/uyelik">Üyelik</Link><Link href="/iletisim">İletişim</Link></div></div><div className="text-sm text-white/60 md:text-right">© {new Date().getFullYear()} KAAFL Mezun Derneği</div></div></footer>;
}
