"use client";

import {
  CalendarDays,
  CircleHelp,
  Contact,
  Images,
  LayoutDashboard,
  Megaphone,
  Menu,
  Undo2,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { AdminBrandLogo } from "@/components/admin/AdminBrandLogo";
import { LogoutButton } from "@/components/admin/LogoutButton";

const navItems: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/admin", label: "Genel Bakış", icon: LayoutDashboard },
  { href: "/admin/duyurular", label: "Duyurular", icon: Megaphone },
  { href: "/admin/etkinlikler", label: "Etkinlikler", icon: CalendarDays },
  { href: "/admin/galeri", label: "Galeri", icon: Images },
  { href: "/admin/kurul", label: "Yönetim ve Denetim Kurulu", icon: UsersRound },
  { href: "/admin/sss", label: "Sıkça Sorulanlar", icon: CircleHelp },
  { href: "/admin/iletisim", label: "İletişim Formu", icon: Contact },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-zinc-900">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        {/* Mobile Header (Fixed/Sticky on top for mobile screens) */}
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-zinc-800 bg-[#18181b] px-4 py-3 text-white shadow-md lg:hidden">
          <div className="flex items-center gap-3">
            <AdminBrandLogo />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#ec1c24]">Yönetim Paneli</p>
              <p className="text-[11px] font-semibold text-zinc-300 truncate max-w-[200px]">Keçiören Mezunlar Derneği</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="grid size-10 place-items-center rounded-lg bg-zinc-800 text-white transition hover:bg-zinc-700 active:scale-95 cursor-pointer"
            aria-label={mobileMenuOpen ? "Menüyü Kapat" : "Menüyü Aç"}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </header>

        {/* Mobile Navigation Drawer Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Navigation Drawer Content */}
        <div
          className={`fixed inset-x-0 top-[61px] z-30 max-h-[calc(100vh-61px)] overflow-y-auto border-b border-zinc-800 bg-[#18181b] p-4 text-white shadow-2xl transition-all duration-200 lg:hidden ${
            mobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <nav className="flex flex-col gap-1" aria-label="Mobil Admin Menü">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`inline-flex items-center gap-3 rounded-lg px-3.5 py-3 text-sm font-medium transition-colors ${
                    active ? "bg-[#ec1c24] text-white font-semibold shadow-sm" : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {label}
                </Link>
              );
            })}

            <div className="mt-4 flex flex-col gap-1 border-t border-zinc-800/80 pt-3">
              <Link
                href="/"
                className="inline-flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                <Undo2 className="size-4 text-zinc-400" aria-hidden="true" />
                Siteye Dön
              </Link>
              <LogoutButton />
            </div>
          </nav>
        </div>

        {/* Desktop Sidebar (Visible >= 1024px) */}
        <aside className="hidden border-r border-zinc-800 bg-[#18181b] text-white lg:flex lg:w-64 lg:shrink-0 lg:flex-col">
          <div className="px-5 py-5">
            <AdminBrandLogo />
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#ec1c24]">Yönetim Paneli</p>
            <p className="mt-2 max-w-52 text-xs font-semibold leading-5 text-white">Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunları Derneği</p>
          </div>

          <nav className="flex flex-1 flex-col justify-between px-3 pb-6" aria-label="Admin Masaüstü Menü">
            <div className="flex flex-col gap-1">
              {navItems.map(({ href, label, icon: Icon }) => {
                const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`inline-flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      active ? "bg-[#ec1c24] text-white shadow-sm font-semibold" : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    }`}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col gap-1 border-t border-zinc-800/80 pt-3">
              <Link
                href="/"
                className="inline-flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                <Undo2 className="size-4 text-zinc-400" aria-hidden="true" />
                Siteye Dön
              </Link>
              <LogoutButton />
            </div>
          </nav>
        </aside>

        {/* Main Content Viewport */}
        <div className="flex min-w-0 flex-1 flex-col">
          <main className="flex-1 px-3 py-4 sm:px-6 lg:px-8 lg:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
