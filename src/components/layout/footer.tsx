import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { corporateNavigation } from "@/config/navigation";
import { associationName } from "@/config/site";

const legalLinks = [
  { href: "/kvkk", label: "KVKK Aydınlatma Metni" },
  { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
  { href: "/cerez-politikasi", label: "Çerez Politikası" },
  { href: "/kullanim-kosullari", label: "Kullanım Koşulları" },
];

export function Footer({ logoUrl = "/logo-dernek.png", address = "Kızılay Mahallesi, Fevzi Çakmak-2 Sokak No:33, 06420\nÇankaya/Ankara" }: { logoUrl?: string; address?: string }) {
  return (
    <footer className="bg-[#18181b] font-sans text-white">
      <div className="mx-auto grid w-[min(100%-2rem,80rem)] grid-cols-1 items-start gap-8 py-7 md:grid-cols-2 md:gap-10 lg:grid-cols-[1fr_auto_auto] lg:gap-x-12 lg:gap-y-8 md:py-8">
        {/* Sütun 1: Logo ve Dernek Adı */}
        <div className="w-full md:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-3.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:gap-4" aria-label={`${associationName} ana sayfa`}>
            <Image src={logoUrl} alt="" width={56} height={56} className="size-14 shrink-0 rounded-full object-contain" />
            <span className="flex flex-col justify-center text-[13px] font-bold leading-snug tracking-tight text-white sm:text-[15px]">
              <span className="block sm:whitespace-nowrap">Keçiören Vatansever Şehit Tümgeneral</span>
              <span className="block sm:whitespace-nowrap">Aydoğan Aydın Fen Lisesi Mezunları Derneği</span>
            </span>
          </Link>
        </div>

        {/* Sütun 2: Hakkımızda Bağlantıları */}
        <nav aria-label="Hakkımızda bağlantıları" className="w-full sm:w-auto">
          <div className="w-full">
            <h2 className="relative w-full pb-2 text-left text-sm font-semibold text-white after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/20 after:content-['']">Hakkımızda</h2>
            
            {/* Mobil Görünüm (Doğal sıralı tek sütun) */}
            <ul className="mt-3 grid gap-y-2.5 text-sm leading-5 sm:hidden">
              {corporateNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="touch-manipulation rounded-sm text-zinc-300 transition-colors hover:text-white active:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Masaüstü Görünüm (2 Sütunlu Yan Yana Dağılım) */}
            <div className="mt-3 hidden sm:grid sm:grid-cols-[max-content_max-content] sm:gap-x-6 text-sm leading-5">
              <ul className="grid gap-y-2">
                {[corporateNavigation[0], corporateNavigation[2], corporateNavigation[5]].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="touch-manipulation whitespace-nowrap rounded-sm text-zinc-300 transition-colors hover:text-white active:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="grid gap-y-2">
                {[corporateNavigation[1], corporateNavigation[3], corporateNavigation[4]].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="touch-manipulation whitespace-nowrap rounded-sm text-zinc-300 transition-colors hover:text-white active:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        {/* Sütun 3: Adres */}
        <div className="w-full sm:w-auto">
          <div className="w-full">
            <h2 className="relative w-full pb-2 text-left text-sm font-semibold text-white after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/20 after:content-['']">
              Adres
            </h2>
            <address className="mt-3 text-sm not-italic leading-6 text-zinc-200">
              <span className="block sm:w-max sm:max-w-full">Kızılay Mahallesi, Fevzi Çakmak-2 Sokak No:33, 06420</span>
              <span className="block">Çankaya/Ankara</span>
            </address>
          </div>
        </div>
      </div>

      {/* Alt Telif ve Yasal Bağlantılar Çubuğu */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex w-[min(100%-2rem,52rem)] flex-col items-start justify-start gap-2 py-3 text-left text-xs leading-5 text-zinc-300 md:items-center md:justify-center md:text-center">
          <p className="w-full text-left md:text-center">
            © {new Date().getFullYear()} {associationName}. Tüm hakları saklıdır.
          </p>
          <nav className="flex flex-wrap items-center justify-start gap-x-2 gap-y-1 md:hidden" aria-label="Yasal bağlantılar">
            {[legalLinks[0], legalLinks[1], legalLinks[3], legalLinks[2]].map((item, index) => (
              <Fragment key={item.href}>
                {index > 0 ? (
                  <span className="text-zinc-500" aria-hidden="true">
                    ·
                  </span>
                ) : null}
                <Link
                  href={item.href}
                  className="touch-manipulation rounded-sm text-zinc-400 transition-colors hover:text-white active:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {item.label}
                </Link>
              </Fragment>
            ))}
          </nav>
          <nav className="hidden flex-wrap items-center justify-center gap-4 md:flex md:gap-6" aria-label="Yasal bağlantılar">
            {legalLinks.map((item, index) => (
              <Fragment key={item.href}>
                {index > 0 ? (
                  <span className="text-zinc-500" aria-hidden="true">
                    ·
                  </span>
                ) : null}
                <Link
                  href={item.href}
                  className="touch-manipulation rounded-sm text-zinc-400 transition-colors hover:text-white active:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
