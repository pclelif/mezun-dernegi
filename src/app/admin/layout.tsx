"use client";

import {
  CalendarDays,
  CircleHelp,
  Contact,
  Images,
  LayoutDashboard,
  Megaphone,
  Undo2,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
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

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-zinc-900">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        <aside className="border-b border-zinc-800 bg-[#18181b] text-white lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r lg:border-zinc-800">
          <div className="flex items-center justify-between px-5 py-5 lg:block">
            <div>
              <AdminBrandLogo />
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-400">Yönetim Paneli</p>
              <p className="mt-2 max-w-52 text-xs font-semibold leading-5 text-white">Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunları Derneği</p>
            </div>
          </div>

          <nav className="flex flex-col justify-between px-3 pb-6 lg:min-h-[calc(100vh-8rem)]" aria-label="Admin menü">
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

            {/* Bottom Actions: Siteye Dön & Çıkış Yap Stacked Vertically */}
            <div className="mt-6 flex flex-col gap-1 border-t border-zinc-800/80 pt-3">
              <Link
                href="/"
                className="inline-flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                <Undo2 className="size-4 text-red-500" aria-hidden="true" />
                Siteye Dön
              </Link>
              <LogoutButton />
            </div>
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
