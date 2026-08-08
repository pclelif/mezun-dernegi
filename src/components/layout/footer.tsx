import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { corporateNavigation } from "@/config/navigation";
import { associationName } from "@/config/site";

const quickLinks = [
  ["Ana Sayfa", "/"],
  ["Duyurular", "/duyurular"],
  ["Etkinlikler", "/etkinlikler"],
  ["Üyelik", "/uyelik"],
  ["İletişim", "/iletisim"],
] as const;

const footerLinkClass = "rounded-sm text-zinc-200 transition-colors hover:text-white hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";
const footerHeadingClass = "mb-5 text-lg font-bold leading-6 text-red-300";

export function Footer() {
  return (
    <footer className="bg-zinc-700 font-sans text-white">
      <div className="mx-auto grid w-[min(100%-2rem,75rem)] gap-12 py-12 text-center md:w-[min(100%-4rem,75rem)] md:grid-cols-2 md:py-14 lg:grid-cols-4 lg:gap-10">
        <div className="flex flex-col items-center">
          <Link href="/" className="flex max-w-xs flex-col items-center gap-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" aria-label={`${associationName} ana sayfa`}>
            <Image src="/kaafl-logo-v2.jpg" alt="" width={76} height={76} className="size-[4.75rem] shrink-0 rounded-full bg-white object-cover" />
            <span className="text-base font-semibold leading-6">{associationName}</span>
          </Link>
          <p className="mt-4 max-w-xs text-[0.9375rem] leading-7 text-zinc-200">Mezunlarımız arasındaki bağı güçlendiren, dayanışmayı ve okul kültürünü geleceğe taşıyan ortak platform.</p>
        </div>

        <div className="flex flex-col items-center">
          <h2 className={footerHeadingClass}>Hakkımızda</h2>
          <ul className="grid justify-items-center gap-2.5 text-[0.9375rem] leading-6">
            {corporateNavigation.map((item) => <li key={item.href}><Link className={footerLinkClass} href={item.href}>{item.label}</Link></li>)}
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <h2 className={footerHeadingClass}>Bağlantılar</h2>
          <ul className="grid justify-items-center gap-2.5 text-[0.9375rem] leading-6">
            {quickLinks.map(([label, href]) => <li key={href}><Link className={footerLinkClass} href={href}>{label}</Link></li>)}
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <h2 className={footerHeadingClass}>İletişim</h2>
          <address className="not-italic">
            <ul className="grid justify-items-center gap-3 text-[0.9375rem] leading-6 text-zinc-200">
              <li className="flex items-start justify-center gap-3"><MapPin className="mt-1 size-4 shrink-0" aria-hidden="true" /><span>Ankara, Türkiye</span></li>
              <li><a className={`${footerLinkClass} flex items-center justify-center gap-3`} href="tel:+903120000000"><Phone className="size-4 shrink-0" aria-hidden="true" />+90 (312) 000 00 00</a></li>
              <li><a className={`${footerLinkClass} flex items-start justify-center gap-3 [overflow-wrap:anywhere]`} href="mailto:info@kaaflmezun.org"><Mail className="mt-1 size-4 shrink-0" aria-hidden="true" />info@kaaflmezun.org</a></li>
            </ul>
          </address>
          <div className="mt-6 flex justify-center gap-2" aria-label="Sosyal medya bağlantıları">
            <a className="grid size-10 place-items-center rounded-md border border-white/30 text-xs font-semibold transition-colors hover:border-white hover:bg-white hover:text-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href="#" aria-label="Instagram">IG</a>
            <a className="grid size-10 place-items-center rounded-md border border-white/30 text-xs font-semibold transition-colors hover:border-white hover:bg-white hover:text-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href="#" aria-label="Facebook">FB</a>
            <a className="grid size-10 place-items-center rounded-md border border-white/30 text-xs font-semibold transition-colors hover:border-white hover:bg-white hover:text-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href="#" aria-label="LinkedIn">IN</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto w-[min(100%-2rem,75rem)] py-5 text-center text-[0.8125rem] leading-5 text-zinc-300 md:w-[min(100%-4rem,75rem)]">
          <p>© {new Date().getFullYear()} {associationName}. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
