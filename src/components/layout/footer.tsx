import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { corporateNavigation } from "@/config/navigation";
import { associationName } from "@/config/site";

const footerLinkClass = "rounded-sm text-zinc-200 transition-colors hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";
const footerHeadingClass = "mb-3 border-l-2 border-red-600 pl-3 text-base font-bold leading-6 text-white";
const footerContentClass = "pl-[0.875rem]";

export function Footer() {
  return (
    <footer className="bg-zinc-700 font-sans text-white">
      <div className="mx-auto grid w-[min(100%-2rem,75rem)] items-start gap-10 py-9 md:w-[min(100%-4rem,75rem)] md:grid-cols-2 lg:grid-cols-3">
        <div>
          <h2 className={footerHeadingClass}>Mezunlar Derneği</h2>
          <div className={footerContentClass}>
            <Link href="/" className="inline-flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" aria-label={`${associationName} ana sayfa`}>
              <Image src="/kaafl-logo-v2.jpg" alt="" width={64} height={64} className="size-16 shrink-0 rounded-full bg-white object-cover" />
              <span className="max-w-xs text-sm font-semibold leading-5">{associationName}</span>
            </Link>
          </div>
        </div>

        <div>
          <h2 className={footerHeadingClass}>Hakkımızda</h2>
          <ul className={`${footerContentClass} grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm leading-5`}>
            {corporateNavigation.map((item) => <li key={item.href}><Link className={footerLinkClass} href={item.href}>{item.label}</Link></li>)}
          </ul>
        </div>

        <div>
          <h2 className={footerHeadingClass}>İletişim</h2>
          <div className={`${footerContentClass} text-sm leading-6 text-zinc-200`}>
            <p>Adres ve güncel iletişim bilgilerimize iletişim sayfasından ulaşabilirsiniz.</p>
            <Link href="/iletisim" className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold text-white hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">İletişim sayfasına git <ArrowRight className="size-4 shrink-0" aria-hidden="true" /></Link>
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
