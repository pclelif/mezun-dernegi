"use client";

import { ChevronDown, Menu, Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { InstagramIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { navigation, type NavigationItem } from "@/config/navigation";
import { associationName } from "@/config/site";

const desktopLinkClass = "relative flex h-24 appearance-none items-center whitespace-nowrap bg-transparent p-0 font-sans text-base font-semibold leading-5 transition-colors after:absolute after:bottom-8 after:left-0 after:h-0.5 after:w-full after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/kaaflmezunder", Icon: InstagramIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/ke%C3%A7i%C3%B6ren-vatansever-%C5%9Fehit-t%C3%BCmgeneral-aydo%C4%9Fan-ayd%C4%B1n-fen-lisesi-mezunlar-derne%C4%9Fi/", Icon: LinkedinIcon },
];

export function Header() {
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function updateHeaderSurface() {
      setIsScrolled(window.scrollY > 8);
    }

    updateHeaderSurface();
    window.addEventListener("scroll", updateHeaderSurface, { passive: true });
    return () => window.removeEventListener("scroll", updateHeaderSurface);
  }, []);

  useEffect(() => {
    setIsMobileNavOpen(false);
    setOpenMobileMenu(null);
  }, [pathname]);

  function isItemActive(item: NavigationItem) {
    if (item.href === "/") return pathname === "/";
    return pathname.startsWith(item.href) || Boolean(item.children?.some((child) => pathname.startsWith(child.href)));
  }

  return (
    <header className={`site-main-header ${pathname === "/" ? "desktop-home-sticky" : ""} relative z-50 border-b border-black/10 bg-white transition-[box-shadow] duration-200 motion-reduce:transition-none ${isScrolled ? "shadow-lg xl:shadow-md" : ""}`}>
      <div className="relative mx-auto flex w-[min(100%-2rem,75rem)] flex-col items-center justify-center gap-3 py-6 xl:w-[min(100%-4rem,75rem)] xl:flex-row xl:items-center xl:justify-between xl:gap-4 xl:py-4">
        {/* Sol: logo + yazı lockup (Koç tarzı) — mobilde ortalı, xl'den itibaren sola yaslı */}
        <Link href="/" className="flex shrink-0 flex-col items-center gap-3 rounded-sm text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600 xl:-ml-1 xl:flex-row xl:items-center xl:gap-3.5 xl:text-left" aria-label={`${associationName} ana sayfa`}>
          <Image
            src="/kaafl-logo-v2.jpg"
            alt=""
            width={112}
            height={112}
            priority
            className="size-24 shrink-0"
          />
          <span className="flex flex-col items-center justify-center gap-1.5 text-center xl:items-start xl:text-left">
            <span className="whitespace-nowrap text-sm font-extrabold uppercase leading-none tracking-tight text-red-600 xl:text-xl">Keçiören Fen Lisesi</span>
            <span className="whitespace-nowrap text-xs font-bold uppercase leading-none tracking-wide text-zinc-800 xl:text-base">Mezunlar Derneği</span>
          </span>
        </Link>

        {/* Mobil menü tetikleyicisi: içerik kolonunun sağında, dikeyde ortalı */}
        <button
          type="button"
          className="absolute right-4 top-8 grid size-11 z-50 place-items-center rounded-md text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 xl:hidden"
          aria-expanded={isMobileNavOpen}
          aria-controls="mobile-navigation"
          aria-label="Menüyü aç veya kapat"
          onClick={() => setIsMobileNavOpen((current) => !current)}
        >
          {isMobileNavOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        {/* Orta: kalan alanı doldurur, kendi içinde ortalanır — absolute yok */}
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-6 xl:flex" aria-label="Ana menü">
          {navigation.map((item, index) => {
            const active = isItemActive(item);
            const menuId = `desktop-submenu-${index}`;
            const menuOpen = openDesktopMenu === item.href;

            if (item.children) {
              return (
                <div
                  className="relative h-24"
                  key={item.href}
                  onMouseEnter={() => setOpenDesktopMenu(item.href)}
                  onMouseLeave={() => setOpenDesktopMenu(null)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setOpenDesktopMenu(null);
                  }}
                >
                  <button
                    type="button"
                    className={`${desktopLinkClass} gap-1 ${active ? "text-red-600 after:bg-red-600" : "text-zinc-900 after:bg-transparent hover:text-red-600"}`}
                    aria-expanded={menuOpen}
                    aria-controls={menuId}
                    onClick={() => setOpenDesktopMenu((current) => current === item.href ? null : item.href)}
                    onFocus={() => setOpenDesktopMenu(item.href)}
                  >
                    {item.label}
                    <ChevronDown className={`size-4 transition-transform motion-reduce:transition-none ${menuOpen ? "rotate-180" : ""} ${active ? "text-red-600" : "text-zinc-700"}`} aria-hidden="true" />
                  </button>
                  {/* Invisible pt bridge closes the hover gap between trigger and panel */}
                  <div id={menuId} className={`${menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"} absolute left-1/2 top-full w-64 -translate-x-1/2 pt-4 transition-[opacity,transform] motion-reduce:transition-none`}>
                    <div className="rounded-xl border border-zinc-200 bg-white py-2 text-center shadow-lg shadow-zinc-900/10">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpenDesktopMenu(null)}
                          className={`block px-4 py-3 text-center text-sm leading-5 text-zinc-800 outline-none transition-colors hover:bg-zinc-50 hover:text-zinc-950 focus-visible:bg-zinc-50 ${pathname.startsWith(child.href) ? "bg-zinc-50 font-semibold text-red-600" : ""}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return <Link className={`${desktopLinkClass} ${active ? "text-red-600 after:bg-red-600" : "text-zinc-900 after:bg-transparent hover:text-red-600"}`} href={item.href} key={item.href}>{item.label}</Link>;
          })}
        </nav>

        {/* Sağ: doğal genişlik */}
        <div className="hidden shrink-0 items-center gap-4 xl:flex">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-md p-2 text-zinc-900 transition-colors hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
            >
              <Icon className="size-7" />
            </a>
          ))}
        </div>
      </div>

      <div
        data-open={isMobileNavOpen}
        className={`mobile-navigation-details grid transition-all duration-300 ease-in-out motion-reduce:transition-none xl:hidden ${isMobileNavOpen ? "visible grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <nav id="mobile-navigation" className="mobile-navigation-panel flex max-h-[70dvh] flex-col overflow-y-auto border-t border-zinc-300 px-6 py-4 text-center text-zinc-900 shadow-inner" aria-label="Mobil menü">
            {navigation.map((item, index) => {
              if (!item.children) {
                return <Link className="px-2 py-4 text-base font-semibold text-zinc-900 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-red-600" href={item.href} key={item.href}>{item.label}</Link>;
              }

              const menuId = `mobile-submenu-${index}`;
              const menuOpen = openMobileMenu === item.href;

              return (
                <div key={item.href}>
                  <button
                    type="button"
                    className="grid min-h-14 w-full appearance-none grid-cols-[2rem_1fr_2rem] items-center bg-transparent px-2 text-base font-semibold text-zinc-900 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-red-600"
                    aria-expanded={menuOpen}
                    aria-controls={menuId}
                    onClick={() => setOpenMobileMenu((current) => (current === item.href ? null : item.href))}
                  >
                    <span aria-hidden="true" />
                    <span>{item.label}</span>
                    {menuOpen ? (
                      <Minus className="size-5 text-red-500" aria-hidden="true" />
                    ) : (
                      <Plus className="size-5 text-red-500" aria-hidden="true" />
                    )}
                  </button>
                  <div
                    id={menuId}
                    className={`grid transition-all duration-300 ease-in-out motion-reduce:transition-none ${menuOpen ? "visible grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <div className="mx-auto mb-3 w-full max-w-sm overflow-hidden rounded-lg border border-zinc-200 bg-white text-center shadow-sm">
                        {item.children.map((child) => (
                          <Link
                            className="block border-b border-zinc-100 px-3 py-3.5 text-sm font-medium text-gray-900 transition-colors last:border-b-0 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-red-600"
                            href={child.href}
                            key={child.href}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
