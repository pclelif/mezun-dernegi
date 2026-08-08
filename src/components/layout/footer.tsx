import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { corporateNavigation } from "@/config/navigation";

const quickLinks = [
  ["Duyurular", "/duyurular"],
  ["Etkinlikler", "/etkinlikler"],
  ["Üyelik", "/uyelik"],
  ["İletişim", "/iletisim"],
] as const;

const footerLinkClass = "rounded-sm text-zinc-200 transition-colors hover:text-white hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export function Footer() {
  return (
    <footer className="bg-zinc-700 font-sans text-white">
      <div className="mx-auto grid w-[min(100%-2rem,75rem)] gap-x-10 gap-y-10 py-12 md:w-[min(100%-4rem,75rem)] md:grid-cols-2 md:py-14 lg:grid-cols-[1.25fr_1fr_0.8fr_1.2fr] lg:gap-x-12">
        <div>
          <Link href="/" className="inline-flex items-center gap-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" aria-label="KAAFL Mezunlar Derneği ana sayfa">
            <Image src="/kaafl-logo-v2.jpg" alt="" width={68} height={68} className="size-[4.25rem] shrink-0 rounded-full bg-white object-cover" />
            <span className="text-base font-semibold leading-6">KAAFL Mezunlar<br />Derneği</span>
          </Link>
          <p className="mt-5 max-w-sm text-[0.9375rem] leading-7 text-zinc-200">Mezunlarımız arasındaki bağı güçlendiren, dayanışmayı ve okul kültürünü geleceğe taşıyan ortak platform.</p>
        </div>

        <div>
          <h2 className="mb-4 text-base font-semibold leading-6 text-white">Kurumsal</h2>
          <ul className="grid gap-2.5 text-[0.9375rem] leading-6">
            {corporateNavigation.map((item) => <li key={item.href}><Link className={footerLinkClass} href={item.href}>{item.label}</Link></li>)}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-base font-semibold leading-6 text-white">Bağlantılar</h2>
          <ul className="grid gap-2.5 text-[0.9375rem] leading-6">
            {quickLinks.map(([label, href]) => <li key={href}><Link className={footerLinkClass} href={href}>{label}</Link></li>)}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-base font-semibold leading-6 text-white">İletişim</h2>
          <address className="not-italic">
            <ul className="grid gap-3 text-[0.9375rem] leading-6 text-zinc-200">
              <li className="flex items-start gap-3"><MapPin className="mt-1 size-4 shrink-0" aria-hidden="true" /><span>Ankara, Türkiye</span></li>
              <li><a className={`${footerLinkClass} flex items-center gap-3`} href="tel:+903120000000"><Phone className="size-4 shrink-0" aria-hidden="true" />+90 (312) 000 00 00</a></li>
              <li><a className={`${footerLinkClass} flex items-start gap-3 [overflow-wrap:anywhere]`} href="mailto:info@kaaflmezun.org"><Mail className="mt-1 size-4 shrink-0" aria-hidden="true" />info@kaaflmezun.org</a></li>
            </ul>
          </address>
          <div className="mt-6 flex gap-2" aria-label="Sosyal medya bağlantıları">
            <a className="grid size-10 place-items-center rounded-md border border-white/30 text-xs font-semibold transition-colors hover:border-white hover:bg-white hover:text-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href="#" aria-label="Instagram">IG</a>
            <a className="grid size-10 place-items-center rounded-md border border-white/30 text-xs font-semibold transition-colors hover:border-white hover:bg-white hover:text-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href="#" aria-label="Facebook">FB</a>
            <a className="grid size-10 place-items-center rounded-md border border-white/30 text-xs font-semibold transition-colors hover:border-white hover:bg-white hover:text-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href="#" aria-label="LinkedIn">IN</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex w-[min(100%-2rem,75rem)] flex-col gap-3 py-5 text-[0.8125rem] leading-5 text-zinc-300 md:w-[min(100%-4rem,75rem)] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} KAAFL Mezunlar Derneği. Tüm hakları saklıdır.</p>
          <Link className="rounded-sm hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" href="/kurumsal/tuzuk">Dernek Tüzüğü</Link>
        </div>
      </div>
    </footer>
  );
}
