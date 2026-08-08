"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, type NavigationItem } from "@/config/navigation";
import { associationName } from "@/config/site";

const desktopLinkClass = "border-b-2 py-7 text-[0.8125rem] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function isItemActive(item: NavigationItem) {
    if (item.href === "/") return pathname === "/";
    return pathname.startsWith(item.href) || Boolean(item.children?.some((child) => pathname.startsWith(child.href)));
  }

  function closeMobileNavigation() {
    setIsOpen(false);
    setOpenMobileMenu(null);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-20 w-[min(100%-2rem,75rem)] items-center justify-between gap-5 md:w-[min(100%-4rem,75rem)]">
        <Link href="/" className="flex items-center gap-3 rounded-sm tracking-tight text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600" aria-label={`${associationName} ana sayfa`}>
          <Image src="/kaafl-logo-v2.jpg" alt="" width={56} height={56} priority className="size-14 shrink-0 rounded-full object-cover" />
          <span><strong className="block text-base leading-5">KAAFL</strong><span className="block text-xs font-semibold leading-4 text-zinc-600">Mezunlar Derneği</span></span>
        </Link>

        <nav className="hidden items-center gap-4 lg:flex" aria-label="Ana menü">
          {navigation.map((item, index) => {
            const active = isItemActive(item);
            const menuId = `desktop-submenu-${index}`;
            const menuOpen = openDesktopMenu === item.href;

            if (item.children) {
              return (
                <div
                  className="relative"
                  key={item.href}
                  onMouseEnter={() => setOpenDesktopMenu(item.href)}
                  onMouseLeave={() => setOpenDesktopMenu(null)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setOpenDesktopMenu(null);
                  }}
                >
                  <button
                    type="button"
                    className={`${desktopLinkClass} flex items-center gap-1 ${active ? "border-red-600 text-red-600" : "border-transparent text-zinc-700 hover:text-red-600"}`}
                    aria-expanded={menuOpen}
                    aria-controls={menuId}
                    onClick={() => setOpenDesktopMenu((current) => current === item.href ? null : item.href)}
                    onFocus={() => setOpenDesktopMenu(item.href)}
                  >
                    {item.label}
                    <ChevronDown className={`size-4 transition-transform motion-reduce:transition-none ${menuOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                  <div id={menuId} className={`${menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"} absolute left-1/2 top-full w-64 -translate-x-1/2 border border-red-700 bg-red-600 py-2 text-center text-white shadow-lg transition-[opacity,transform] motion-reduce:transition-none`}>
                    {item.children.map((child) => <Link key={child.href} href={child.href} onClick={() => setOpenDesktopMenu(null)} className={`block px-4 py-3 text-sm leading-5 outline-none hover:bg-red-700 focus-visible:bg-red-700 ${pathname.startsWith(child.href) ? "bg-red-700 font-semibold" : ""}`}>{child.label}</Link>)}
                  </div>
                </div>
              );
            }

            return <Link className={`${desktopLinkClass} ${active ? "border-red-600 text-red-600" : "border-transparent text-zinc-700 hover:text-red-600"}`} href={item.href} key={item.href}>{item.label}</Link>;
          })}
        </nav>

        <button type="button" className="grid size-11 shrink-0 place-items-center rounded-md border border-zinc-300 text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 lg:hidden" onClick={() => setIsOpen((current) => !current)} aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}>
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav id="mobile-navigation" className={`${isOpen ? "flex" : "hidden"} fixed inset-x-0 top-20 h-[calc(100dvh-5rem)] flex-col overflow-y-auto border-t border-zinc-200 bg-white px-4 py-5 lg:hidden`} aria-label="Mobil menü">
        {navigation.map((item, index) => {
          if (!item.children) {
            return <Link onClick={closeMobileNavigation} className="border-b border-zinc-200 px-2 py-4 text-base font-semibold text-zinc-900 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-red-600" href={item.href} key={item.href}>{item.label}</Link>;
          }

          const menuId = `mobile-submenu-${index}`;
          const menuOpen = openMobileMenu === item.href;

          return (
            <div className="border-b border-zinc-200" key={item.href}>
              <button type="button" className="flex min-h-14 w-full items-center justify-between px-2 text-left text-base font-semibold text-zinc-900 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-red-600" aria-expanded={menuOpen} aria-controls={menuId} onClick={() => setOpenMobileMenu((current) => current === item.href ? null : item.href)}>
                {item.label}
                <ChevronDown className={`size-5 transition-transform motion-reduce:transition-none ${menuOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              <div id={menuId} className={`${menuOpen ? "grid" : "hidden"} mx-2 mb-3 overflow-hidden rounded-md bg-red-600 py-1 text-center text-white`}>
                {item.children.map((child) => <Link onClick={closeMobileNavigation} className="px-3 py-3 text-sm hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-white" href={child.href} key={child.href}>{child.label}</Link>)}
              </div>
            </div>
          );
        })}
        <Link onClick={closeMobileNavigation} href="/uyelik/basvuru" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-red-600 px-5 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Üyelik başvurusu</Link>
      </nav>
    </header>
  );
}
