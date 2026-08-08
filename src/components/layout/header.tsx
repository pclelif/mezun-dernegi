"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, type NavigationItem } from "@/config/navigation";

const desktopLinkClass = "border-b-2 py-7 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCorporateOpen, setIsCorporateOpen] = useState(false);
  const [isMobileCorporateOpen, setIsMobileCorporateOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function isItemActive(item: NavigationItem) {
    return pathname.startsWith(item.href) || item.children?.some((child) => pathname.startsWith(child.href));
  }

  function closeMobileNavigation() {
    setIsOpen(false);
    setIsMobileCorporateOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-20 w-[min(100%-2rem,75rem)] items-center justify-between gap-6 md:w-[min(100%-4rem,75rem)]">
        <Link href="/" className="flex max-w-64 items-center gap-3 text-sm font-bold leading-tight tracking-tight text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600" aria-label="KAAFL Mezunlar Derneği ana sayfa">
          <Image src="/kaafl-logo-v2.jpg" alt="" width={56} height={56} priority className="size-14 shrink-0 rounded-full object-cover" />
          <span>Mezunlar<br />Derneği</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Ana menü">
          {navigation.map((item) => {
            const active = isItemActive(item);

            if (item.children) {
              return (
                <div
                  className="relative"
                  key={item.href}
                  onMouseEnter={() => setIsCorporateOpen(true)}
                  onMouseLeave={() => setIsCorporateOpen(false)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setIsCorporateOpen(false);
                  }}
                >
                  <button
                    type="button"
                    className={`${desktopLinkClass} flex items-center gap-1 ${active ? "border-red-600 text-red-600" : "border-transparent text-zinc-700 hover:text-red-600"}`}
                    aria-expanded={isCorporateOpen}
                    aria-controls="corporate-desktop-menu"
                    onClick={() => setIsCorporateOpen((current) => !current)}
                    onFocus={() => setIsCorporateOpen(true)}
                  >
                    {item.label}
                    <ChevronDown className={`size-4 transition-transform motion-reduce:transition-none ${isCorporateOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                  <div id="corporate-desktop-menu" className={`${isCorporateOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"} absolute left-0 top-full w-64 border border-zinc-200 bg-white py-2 shadow-lg transition-[opacity,transform] motion-reduce:transition-none`}>
                    {item.children.map((child) => <Link key={child.href} href={child.href} onClick={() => setIsCorporateOpen(false)} className={`block px-4 py-3 text-sm leading-5 outline-none hover:bg-zinc-50 hover:text-red-600 focus-visible:bg-zinc-50 focus-visible:text-red-600 ${pathname.startsWith(child.href) ? "font-semibold text-red-600" : "text-zinc-700"}`}>{child.label}</Link>)}
                  </div>
                </div>
              );
            }

            return <Link className={`${desktopLinkClass} ${active ? "border-red-600 text-red-600" : "border-transparent text-zinc-700 hover:text-red-600"}`} href={item.href} key={item.href}>{item.label}</Link>;
          })}
        </nav>

        <button type="button" className="grid size-11 place-items-center rounded-md border border-zinc-300 text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 lg:hidden" onClick={() => setIsOpen((current) => !current)} aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}>
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav id="mobile-navigation" className={`${isOpen ? "flex" : "hidden"} fixed inset-x-0 top-20 h-[calc(100dvh-5rem)] flex-col overflow-y-auto border-t border-zinc-200 bg-white px-4 py-5 lg:hidden`} aria-label="Mobil menü">
        {navigation.map((item) => item.children ? (
          <div className="border-b border-zinc-200" key={item.href}>
            <button type="button" className="flex min-h-14 w-full items-center justify-between px-2 text-left text-base font-semibold text-zinc-900 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-red-600" aria-expanded={isMobileCorporateOpen} aria-controls="corporate-mobile-menu" onClick={() => setIsMobileCorporateOpen((current) => !current)}>
              {item.label}
              <ChevronDown className={`size-5 transition-transform motion-reduce:transition-none ${isMobileCorporateOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            <div id="corporate-mobile-menu" className={`${isMobileCorporateOpen ? "grid" : "hidden"} gap-1 pb-3 pl-3`}>
              {item.children.map((child) => <Link onClick={closeMobileNavigation} className="rounded-md px-3 py-3 text-sm text-zinc-700 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-red-600" href={child.href} key={child.href}>{child.label}</Link>)}
            </div>
          </div>
        ) : <Link onClick={closeMobileNavigation} className="border-b border-zinc-200 px-2 py-4 text-base font-semibold text-zinc-900 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-red-600" href={item.href} key={item.href}>{item.label}</Link>)}
        <Link onClick={closeMobileNavigation} href="/uyelik/basvuru" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-red-600 px-5 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Üyelik başvurusu</Link>
      </nav>
    </header>
  );
}
