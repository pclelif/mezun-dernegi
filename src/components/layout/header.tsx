"use client";

import { ChevronDown, Mail, Menu, Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { InstagramIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { navigation, type NavigationItem } from "@/config/navigation";
import { associationName } from "@/config/site";

const desktopLinkClass = "relative flex h-24 appearance-none items-center gap-1.5 whitespace-nowrap bg-transparent p-0 font-sans text-base font-semibold leading-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600";

/** Aktif göstergesi metnin kendi alt kenarlığı; böylece yazının ortasından geçemez. */
function labelClass(active: boolean, underline = true) {
  return `inline-block w-fit justify-self-center border-b-2 pb-1 ${active && underline ? "border-red-600" : "border-transparent"}`;
}

export function Header({ logoUrl = "/mezunderlogo.jpg", email = "kaaflmezunder@gmail.com", instagramUrl = "https://www.instagram.com/kaaflmezunder", linkedinUrl = "" }: { logoUrl?: string; email?: string; instagramUrl?: string; linkedinUrl?: string }) {
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const socialLinks = [
    instagramUrl ? { label: "Instagram", href: instagramUrl, Icon: InstagramIcon } : null,
    linkedinUrl ? { label: "LinkedIn", href: linkedinUrl, Icon: LinkedinIcon } : null,
  ].filter((item): item is { label: string; href: string; Icon: typeof InstagramIcon } => Boolean(item));

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

  function isItemExactActive(item: NavigationItem) {
    return pathname === item.href;
  }

  return (
    <header className={`site-main-header relative z-[100] border-b border-black/10 bg-white transition-[box-shadow] duration-200 motion-reduce:transition-none ${isScrolled ? "shadow-lg xl:shadow-md" : ""}`}>
      <div className="bg-[var(--color-accent)] text-white">
        <div className="mx-auto flex min-h-11 w-[min(100%-2rem,75rem)] items-center justify-between gap-4 xl:w-[min(100%-3rem,84rem)]">
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-w-0 touch-manipulation items-center gap-2 rounded-sm py-1 text-xs font-medium transition-opacity hover:opacity-80 active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-sm"
          >
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{email}</span>
          </a>
          <div className="flex shrink-0 items-center gap-1" aria-label="Sosyal medya bağlantıları">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="touch-manipulation rounded p-1.5 transition-opacity hover:opacity-70 active:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white"
              >
                <Icon className="size-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex min-h-24 w-[min(100%-2rem,75rem)] items-center justify-between gap-3 py-2 xl:min-h-0 xl:w-[min(100%-3rem,84rem)] xl:gap-12 xl:py-0">
        <Link
          href="/"
          onClick={() => {
            setIsMobileNavOpen(false);
            setOpenMobileMenu(null);
          }}
          className="flex min-w-0 max-w-[calc(100%-3.5rem)] items-center gap-2.5 rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600 sm:gap-3 xl:max-w-none xl:shrink-0"
          aria-label={`${associationName} ana sayfa`}
        >
          <Image
            src={logoUrl}
            alt=""
            width={96}
            height={96}
            priority
            className="size-[4.5rem] shrink-0 rounded-full bg-white object-contain ring-2 ring-white/90 sm:size-20 xl:size-[5.5rem]"
          />
          <span className="min-w-0 max-w-[16rem] text-[13px] font-black leading-snug text-zinc-900 text-balance sm:max-w-[28rem] sm:text-[15px] xl:max-w-[22rem] xl:text-[15px]">
            {associationName}
          </span>
        </Link>

        <nav className="hidden min-w-0 items-center justify-end gap-6 xl:flex xl:flex-none 2xl:gap-9" aria-label="Ana menü">
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
                    className={`${desktopLinkClass} ${active ? "text-red-600 hover:text-black" : "text-zinc-900 hover:text-black"}`}
                    aria-expanded={menuOpen}
                    aria-controls={menuId}
                    onClick={() => setOpenDesktopMenu((current) => current === item.href ? null : item.href)}
                    onFocus={() => setOpenDesktopMenu(item.href)}
                  >
                    <span className={labelClass(active)}>{item.label}</span>
                    <ChevronDown className={`size-4 transition-transform motion-reduce:transition-none ${menuOpen ? "rotate-180" : ""} ${active ? "text-red-600" : "text-zinc-700"}`} aria-hidden="true" />
                  </button>
                  {/* Invisible pt bridge closes the hover gap between trigger and panel */}
                  <div id={menuId} className={`${menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"} absolute left-1/2 top-full z-[120] w-64 -translate-x-1/2 pt-3 transition-[opacity,transform] motion-reduce:transition-none`}>
                    <div className="rounded-xl border border-zinc-200 bg-white py-2 text-center shadow-lg shadow-zinc-900/10">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpenDesktopMenu(null)}
                          className={`block px-4 py-3 text-center text-sm leading-5 text-zinc-700 outline-none transition-[color,background-color] hover:bg-zinc-50 hover:text-black focus-visible:bg-zinc-50 focus-visible:text-black ${pathname === child.href ? "bg-zinc-50 font-semibold text-black" : ""}`}
                        >
                          <span className={`border-b-2 pb-1 ${pathname === child.href ? "border-black" : "border-transparent"}`}>
                            {child.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                className={`${desktopLinkClass} ${active ? "text-red-600 hover:text-black" : "text-zinc-900 hover:text-black"}`}
                href={item.href}
                key={item.href}
              >
                <span className={labelClass(isItemExactActive(item), isItemExactActive(item))}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="grid size-11 touch-manipulation shrink-0 place-items-center rounded-md text-zinc-900 transition-colors hover:bg-zinc-100 active:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 xl:hidden"
          aria-expanded={isMobileNavOpen}
          aria-controls="mobile-navigation"
          aria-label="Menüyü aç veya kapat"
          onClick={() => setIsMobileNavOpen((current) => !current)}
        >
          {isMobileNavOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div
        data-open={isMobileNavOpen}
        className={`mobile-navigation-details grid transition-all duration-300 ease-in-out motion-reduce:transition-none xl:hidden ${isMobileNavOpen ? "visible grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <nav id="mobile-navigation" className="mobile-navigation-panel flex max-h-[70dvh] flex-col overflow-y-auto border-t border-zinc-300 px-6 py-4 text-center text-zinc-900 shadow-inner" aria-label="Mobil menü">
            {navigation.map((item, index) => {
              const active = isItemActive(item);

              if (!item.children) {
                return <Link className={`touch-manipulation rounded-md px-2 py-4 text-base font-semibold transition-colors active:bg-zinc-200 active:text-black focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-red-600 ${active ? "text-red-600" : "text-zinc-900"}`} href={item.href} key={item.href} onClick={() => setIsMobileNavOpen(false)}><span className={labelClass(active)}>{item.label}</span></Link>;
              }

              const menuId = `mobile-submenu-${index}`;
              const menuOpen = openMobileMenu === item.href;

              return (
                <div key={item.href}>
                  <button
                    type="button"
                    className={`grid min-h-14 w-full touch-manipulation appearance-none grid-cols-[2rem_1fr_2rem] items-center rounded-md bg-transparent px-2 text-base font-semibold transition-colors active:bg-zinc-200 active:text-black focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-red-600 ${active ? "text-red-600" : "text-zinc-900"}`}
                    aria-expanded={menuOpen}
                    aria-controls={menuId}
                    onClick={() => setOpenMobileMenu((current) => (current === item.href ? null : item.href))}
                  >
                    <span aria-hidden="true" />
                    <span className={labelClass(isItemExactActive(item), isItemExactActive(item))}>{item.label}</span>
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
                            className={`block touch-manipulation border-b border-zinc-100 px-3 py-3.5 text-sm font-medium text-zinc-700 transition-[color,background-color] last:border-b-0 hover:bg-zinc-50 hover:text-black active:bg-zinc-200 active:text-black focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-red-600 ${pathname === child.href ? "bg-zinc-50 font-semibold text-black" : ""}`}
                            href={child.href}
                            key={child.href}
                            onClick={() => {
                              setIsMobileNavOpen(false);
                              setOpenMobileMenu(null);
                            }}
                          >
                            <span className={`border-b-2 pb-1 ${pathname === child.href ? "border-black" : "border-transparent"}`}>
                              {child.label}
                            </span>
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
