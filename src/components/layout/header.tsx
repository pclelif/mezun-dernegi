"use client";

import { ChevronDown, Menu, Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, type NavigationItem } from "@/config/navigation";
import { associationName } from "@/config/site";

const desktopLinkClass = "relative flex h-24 appearance-none items-center whitespace-nowrap bg-transparent p-0 font-sans text-sm font-medium leading-5 transition-colors after:absolute after:bottom-8 after:left-0 after:h-0.5 after:w-full after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600";

export function Header() {
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
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

  function isItemActive(item: NavigationItem) {
    if (item.href === "/") return pathname === "/";
    return pathname.startsWith(item.href) || Boolean(item.children?.some((child) => pathname.startsWith(child.href)));
  }

  function closeMobileNavigation() {
    document.getElementById("mobile-navigation-toggle")?.removeAttribute("open");
  }

  return (
    <header className={`site-main-header ${pathname === "/" ? "desktop-home-sticky" : ""} relative z-50 border-b border-black/10 transition-[background-color,box-shadow] duration-200 motion-reduce:transition-none ${isScrolled ? "shadow-lg xl:bg-white/75 xl:shadow-md xl:backdrop-blur-lg" : "xl:bg-white"}`}>
      <div className="relative mx-auto flex h-40 w-[min(100%-2rem,75rem)] flex-col items-center justify-start gap-2 pt-2 xl:h-auto xl:min-h-24 xl:flex-row xl:justify-between xl:gap-6 xl:pt-0 xl:w-[min(100%-4rem,75rem)]">
        <Link href="/" className="flex min-w-0 flex-col items-center gap-2 rounded-sm text-center tracking-tight text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600 xl:flex-row xl:gap-3 xl:text-left" aria-label={`${associationName} ana sayfa`}>
          <Image src="/kaafl-logo-v2.jpg" alt="" width={80} height={80} priority className="size-20 shrink-0 rounded-full bg-white object-cover xl:size-16" />
          <span className="max-w-[17rem] text-xs font-semibold leading-5 text-zinc-800 xl:max-w-[21rem] xl:text-sm">{associationName}</span>
        </Link>

        <nav className="hidden items-center gap-3 xl:flex" aria-label="Ana menü">
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
                    className={`${desktopLinkClass} gap-0.5 ${active ? "text-red-600 after:bg-red-600" : "text-zinc-700 after:bg-transparent hover:text-red-600"}`}
                    aria-expanded={menuOpen}
                    aria-controls={menuId}
                    onClick={() => setOpenDesktopMenu((current) => current === item.href ? null : item.href)}
                    onFocus={() => setOpenDesktopMenu(item.href)}
                  >
                    {item.label}
                    <ChevronDown className={`size-3.5 transition-transform motion-reduce:transition-none ${menuOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                  <div id={menuId} className={`${menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"} absolute left-1/2 top-full w-64 -translate-x-1/2 border border-red-700 bg-red-600 py-2 text-center text-white shadow-lg transition-[opacity,transform] motion-reduce:transition-none`}>
                    {item.children.map((child) => <Link key={child.href} href={child.href} onClick={() => setOpenDesktopMenu(null)} className={`block px-4 py-3 text-sm leading-5 outline-none hover:bg-red-700 focus-visible:bg-red-700 ${pathname.startsWith(child.href) ? "bg-red-700 font-semibold" : ""}`}>{child.label}</Link>)}
                  </div>
                </div>
              );
            }

            return <Link className={`${desktopLinkClass} ${active ? "text-red-600 after:bg-red-600" : "text-zinc-700 after:bg-transparent hover:text-red-600"}`} href={item.href} key={item.href}>{item.label}</Link>;
          })}
        </nav>

      </div>

        <details id="mobile-navigation-toggle" className="mobile-navigation-details group xl:hidden">
          <summary className="absolute right-4 top-3 grid size-11 list-none place-items-center rounded-md text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 [&::-webkit-details-marker]:hidden" aria-controls="mobile-navigation" aria-label="Menüyü aç veya kapat">
            <Menu className="group-open:hidden" aria-hidden="true" />
            <X className="hidden group-open:block" aria-hidden="true" />
          </summary>

          <nav id="mobile-navigation" className="mobile-navigation-panel flex max-h-[calc(100dvh-10rem)] flex-col overflow-y-auto border-t border-zinc-300 px-6 py-4 text-center text-zinc-900 shadow-inner" aria-label="Mobil menü">
            {navigation.map((item, index) => {
              if (!item.children) {
                return <Link onClick={closeMobileNavigation} className="px-2 py-4 text-base font-semibold text-zinc-900 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-red-600" href={item.href} key={item.href}>{item.label}</Link>;
              }

              const menuId = `mobile-submenu-${index}`;

              return (
                <details className="group/submenu" key={item.href}>
                  <summary className="grid min-h-14 w-full list-none grid-cols-[2rem_1fr_2rem] items-center px-2 text-base font-semibold text-zinc-900 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-red-600 [&::-webkit-details-marker]:hidden" aria-controls={menuId}>
                    <span aria-hidden="true" />
                    <span>{item.label}</span>
                    <Plus className="size-5 text-red-500 group-open/submenu:hidden" aria-hidden="true" />
                    <Minus className="hidden size-5 text-red-500 group-open/submenu:block" aria-hidden="true" />
                  </summary>
                  <div id={menuId} className="mx-auto mb-2 grid w-full max-w-sm border-y border-red-700 bg-red-600 py-1 text-center text-white">
                    {item.children.map((child) => <Link onClick={closeMobileNavigation} className="px-3 py-3 text-sm !text-white hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-white" href={child.href} key={child.href}>{child.label}</Link>)}
                  </div>
                </details>
              );
            })}
          </nav>
        </details>
    </header>
  );
}
