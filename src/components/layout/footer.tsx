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
      <div className="mx-auto grid w-[min(100%-2rem,75rem)] items-start gap-10 py-9 md:w-[min(100%-4rem,75rem)] md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        <div className="flex flex-col gap-3">
          <h2 className={footerHeadingClass}>Mezunlar Derneği</h2>
          <div className={footerContentClass}>
            <Link href="/" className="inline-flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" aria-label={`${associationName} ana sayfa`}>
              <Image src="/kaafl-logo-v2.jpg" alt="" width={64} height={64} className="size-16 shrink-0 rounded-full bg-white object-cover" />
              <span className="max-w-xs text-sm font-semibold leading-5">{associationName}</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className={footerHeadingClass}>Hakkımızda</h2>
          <ul className={`${footerContentClass} grid gap-2 text-sm leading-6`}>
            {corporateNavigation.map((item) => <li key={item.href}><Link className={footerLinkClass} href={item.href}>{item.label}</Link></li>)}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className={footerHeadingClass}>İletişim</h2>
          <div className={`${footerContentClass} space-y-3 text-sm leading-6 text-zinc-200`}>
            <p>Adres, telefon ve güncel iletişim bilgilerimiz iletişim bölümünde paylaşılacaktır.</p>
            <p className="font-medium text-white">İletişim panelinde detaylı bilgiye ulaşabilirsiniz.</p>
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
