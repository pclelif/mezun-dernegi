import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { corporateNavigation } from "@/config/navigation";
import { associationName } from "@/config/site";

const footerLinkClass = "rounded-sm text-zinc-200 transition-colors hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";
const footerHeadingClass = "mb-3 border-l-2 border-red-600 pl-3 text-base font-bold leading-6 text-white";
const footerContentIndent = "pl-[0.875rem]";

export function Footer() {
  return (
    <footer className="bg-zinc-700 font-sans text-white">
      <div className="mx-auto grid w-[min(100%-2rem,75rem)] items-start gap-x-12 gap-y-8 py-9 md:w-[min(100%-4rem,75rem)] md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" aria-label={`${associationName} ana sayfa`}>
            <Image src="/kaafl-logo-v2.jpg" alt="" width={72} height={72} className="size-[4.5rem] shrink-0 rounded-full bg-white object-cover" />
            <span className="max-w-sm text-sm font-semibold leading-6">{associationName}</span>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-zinc-300">Mezunlarımız arasındaki bağı güçlendiren ve okul kültürünü geleceğe taşıyan ortak platform.</p>
        </div>

        <div>
          <h2 className={footerHeadingClass}>Hakkımızda</h2>
          <ul className={`${footerContentIndent} grid gap-1.5 text-sm leading-5`}>
            {corporateNavigation.map((item) => <li key={item.href}><Link className={footerLinkClass} href={item.href}>{item.label}</Link></li>)}
          </ul>
        </div>

        <div>
          <h2 className={footerHeadingClass}>İletişim</h2>
          <address className={`${footerContentIndent} not-italic`}>
            <ul className="grid gap-2.5 text-sm leading-5 text-zinc-200">
              <li className="flex items-center gap-2.5"><MapPin className="size-4 shrink-0" aria-hidden="true" /><span>Ankara, Türkiye</span></li>
              <li><a className={`${footerLinkClass} flex items-center gap-2.5`} href="tel:+903120000000"><Phone className="size-4 shrink-0" aria-hidden="true" />+90 (312) 000 00 00</a></li>
              <li><a className={`${footerLinkClass} flex items-center gap-2.5 [overflow-wrap:anywhere]`} href="mailto:info@kaaflmezun.org"><Mail className="size-4 shrink-0" aria-hidden="true" />info@kaaflmezun.org</a></li>
            </ul>
          </address>
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
