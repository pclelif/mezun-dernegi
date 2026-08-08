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

const footerLinkClass = "rounded-sm text-zinc-200 transition-colors hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";
const footerHeadingClass = "mb-3 border-l-2 border-red-600 pl-3 text-base font-bold leading-6 text-white";
const socialLinkClass = "grid size-9 place-items-center rounded-md border border-white/25 text-white transition-colors hover:border-red-500 hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
}

function FacebookIcon() {
  return <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true"><path fill="currentColor" d="M13.6 22v-8h2.8l.4-3h-3.2V9.1c0-.9.3-1.6 1.7-1.6H17V4.8c-.3 0-1.4-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.5v3h2.8v8h3.3Z" /></svg>;
}

function LinkedinIcon() {
  return <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true"><path fill="currentColor" d="M6.6 8.4H3.3V19h3.3V8.4ZM5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm7 5.4H8.8V19H12v-5.2c0-1.4.3-2.7 2-2.7 1.7 0 1.7 1.6 1.7 2.8V19H19v-5.8c0-2.9-.6-5.1-4-5.1-1.8 0-3 .9-3.5 1.8h-.1V8.4h.6Z" /></svg>;
}

export function Footer() {
  return (
    <footer className="bg-zinc-700 font-sans text-white">
      <div className="mx-auto grid w-[min(100%-2rem,75rem)] items-start gap-x-10 gap-y-8 py-10 md:w-[min(100%-4rem,75rem)] md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_0.85fr_1.15fr] lg:gap-x-12">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" aria-label={`${associationName} ana sayfa`}>
            <Image src="/kaafl-logo-v2.jpg" alt="" width={64} height={64} className="size-16 shrink-0 rounded-full bg-white object-cover" />
            <span><strong className="block text-lg leading-6">KAAFL</strong><span className="block text-sm leading-5 text-zinc-200">Mezunlar Derneği</span></span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-200">{associationName}</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-300">Mezunlarımız arasındaki bağı güçlendiren ve okul kültürünü geleceğe taşıyan ortak platform.</p>
        </div>

        <div>
          <h2 className={footerHeadingClass}>Hakkımızda</h2>
          <ul className="grid gap-1.5 text-sm leading-5">
            {corporateNavigation.map((item) => <li key={item.href}><Link className={footerLinkClass} href={item.href}>{item.label}</Link></li>)}
          </ul>
        </div>

        <div>
          <h2 className={footerHeadingClass}>Bağlantılar</h2>
          <ul className="grid gap-1.5 text-sm leading-5">
            {quickLinks.map(([label, href]) => <li key={href}><Link className={footerLinkClass} href={href}>{label}</Link></li>)}
          </ul>
        </div>

        <div>
          <h2 className={footerHeadingClass}>İletişim</h2>
          <address className="not-italic">
            <ul className="grid gap-2.5 text-sm leading-5 text-zinc-200">
              <li className="flex items-center gap-2.5"><MapPin className="size-4 shrink-0" aria-hidden="true" /><span>Ankara, Türkiye</span></li>
              <li><a className={`${footerLinkClass} flex items-center gap-2.5`} href="tel:+903120000000"><Phone className="size-4 shrink-0" aria-hidden="true" />+90 (312) 000 00 00</a></li>
              <li><a className={`${footerLinkClass} flex items-center gap-2.5 [overflow-wrap:anywhere]`} href="mailto:info@kaaflmezun.org"><Mail className="size-4 shrink-0" aria-hidden="true" />info@kaaflmezun.org</a></li>
            </ul>
          </address>
          <div className="mt-4 flex gap-2" aria-label="Sosyal medya bağlantıları">
            <a className={socialLinkClass} href="#" aria-label="Instagram"><InstagramIcon /></a>
            <a className={socialLinkClass} href="#" aria-label="Facebook"><FacebookIcon /></a>
            <a className={socialLinkClass} href="#" aria-label="LinkedIn"><LinkedinIcon /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto w-[min(100%-2rem,75rem)] py-4 text-center text-xs leading-5 text-zinc-300 md:w-[min(100%-4rem,75rem)]">
          <p>© {new Date().getFullYear()} {associationName}. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
