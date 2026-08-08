import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const institutionalLinks = [
  ["Hakkımızda", "/kurumsal/hakkimizda"],
  ["Yönetim Kurulu", "/kurumsal/yonetim-kurulu"],
  ["Tüzük", "/kurumsal/tuzuk"],
  ["Vizyon ve Misyon", "/kurumsal/vizyon-misyon"],
] as const;

export function Footer() {
  return (
    <footer className="bg-zinc-700 text-white">
      <div className="mx-auto grid w-[min(100%-2rem,75rem)] gap-10 py-12 md:w-[min(100%-4rem,75rem)] md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-5 flex items-center gap-3"><Image src="/kaafl-logo-v2.jpg" alt="KAAFL Mezunlar Derneği logosu" width={64} height={64} className="size-16 rounded-full bg-white object-cover" /><p className="font-bold leading-tight">Mezunlar<br />Derneği</p></div>
          <p className="max-w-xs text-sm leading-6 text-zinc-200">Mezunlarımız arasındaki bağı güçlendiren, dayanışmayı ve okul kültürünü geleceğe taşıyan ortak platform.</p>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider">Dernek Hakkında</h2>
          <ul className="space-y-3 text-sm text-zinc-200">{institutionalLinks.map(([label, href]) => <li key={href}><Link className="hover:text-white" href={href}>{label}</Link></li>)}</ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider">Hızlı Bağlantılar</h2>
          <ul className="space-y-3 text-sm text-zinc-200"><li><Link href="/etkinlikler">Etkinlikler</Link></li><li><Link href="/duyurular">Duyurular</Link></li><li><Link href="/uyelik">Üyelik</Link></li><li><Link href="/iletisim">İletişim</Link></li></ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider">İletişim</h2>
          <ul className="space-y-3 text-sm text-zinc-200"><li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0" /><span>Ankara, Türkiye</span></li><li><a className="flex gap-3" href="tel:+903120000000"><Phone className="size-4" />+90 (312) 000 00 00</a></li><li><a className="flex gap-3" href="mailto:info@kaaflmezun.org"><Mail className="size-4" />info@kaaflmezun.org</a></li></ul>
          <div className="mt-5 flex gap-2"><a className="grid size-10 place-items-center border border-white/30 text-xs font-bold" href="#" aria-label="Instagram">IG</a><a className="grid size-10 place-items-center border border-white/30 text-xs font-bold" href="#" aria-label="Facebook">FB</a><a className="grid size-10 place-items-center border border-white/30 text-xs font-bold" href="#" aria-label="LinkedIn">IN</a></div>
        </div>
      </div>
      <div className="border-t border-white/15"><div className="mx-auto flex w-[min(100%-2rem,75rem)] flex-col gap-2 py-5 text-xs text-zinc-300 md:w-[min(100%-4rem,75rem)] md:flex-row md:items-center md:justify-between"><p>© {new Date().getFullYear()} KAAFL Mezunlar Derneği. Tüm hakları saklıdır.</p><Link href="/kurumsal/kvkk">KVKK ve Gizlilik</Link></div></div>
    </footer>
  );
}
