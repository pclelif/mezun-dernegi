import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { footerLinks } from "@/config/navigation";
import { associationName } from "@/config/site";

const footerLinkClass = "rounded-sm text-zinc-200 transition-colors hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";
const footerPanelClass = "border-l-2 border-red-600 pl-3";
const legalLinks = [
  { href: "/kvkk", label: "KVKK Aydınlatma Metni" },
  { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
  { href: "/cerez-politikasi", label: "Çerez Politikası" },
  { href: "/kullanim-kosullari", label: "Kullanım Koşulları" },
];

export function Footer() {
  return (
    <footer className="bg-zinc-700 font-sans text-white">
      <div className="mx-auto grid w-[min(100%-2rem,75rem)] items-start gap-8 py-9 md:w-[min(100%-4rem,75rem)] md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div className={footerPanelClass}>
          <Link href="/" className="inline-flex items-start gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" aria-label={`${associationName} ana sayfa`}>
            <Image src="/kaafl-logo-v2.jpg" alt="" width={64} height={64} className="size-16 shrink-0 rounded-full bg-white object-cover" />
            <span className="max-w-xs text-sm font-semibold leading-5 text-balance">{associationName}</span>
          </Link>
        </div>

        <div className={footerPanelClass}>
          <ul className="grid grid-flow-col grid-cols-[max-content_max-content] grid-rows-4 gap-x-3 gap-y-1.5 text-sm leading-5 sm:grid-cols-2 sm:gap-x-5">
            {footerLinks.map((item) => <li key={item.href}><Link className={footerLinkClass} href={item.href}>{item.label}</Link></li>)}
          </ul>
        </div>

        <div className={footerPanelClass}>
          <div className="text-sm leading-6 text-zinc-200">
            <p>Adres ve güncel iletişim bilgilerimize iletişim sayfasından ulaşabilirsiniz.</p>
            <Link href="/iletisim" className="mt-2 inline-flex items-center gap-2 rounded-sm font-semibold text-white hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">İletişim sayfasına git <ArrowRight className="size-4 shrink-0" aria-hidden="true" /></Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex w-[min(100%-2rem,75rem)] flex-col items-center gap-2 py-4 text-center text-xs leading-5 text-zinc-300 md:w-[min(100%-4rem,75rem)]">
          <p>© {new Date().getFullYear()} {associationName}. Tüm hakları saklıdır.</p>
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6" aria-label="Yasal bağlantılar">
            {legalLinks.map((item, index) => (
              <Fragment key={item.href}>
                {index > 0 ? (
                  <span className="text-zinc-500" aria-hidden="true">
                    •
                  </span>
                ) : null}
                <Link
                  href={item.href}
                  className="rounded-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {item.label}
                </Link>
              </Fragment>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
