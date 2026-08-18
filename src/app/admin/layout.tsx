"use client";

import {
  ArrowLeft,
  CalendarDays,
  CircleHelp,
  Images,
  Home,
  Building2,
  Contact,
  BadgeDollarSign,
  Palette,
  UserRoundCheck,
  LayoutDashboard,
  Megaphone,
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
  { href: "/admin/icerik/ana-sayfa", label: "Ana Sayfa", icon: Home },
  { href: "/admin/icerik/hakkimizda", label: "Hakkımızda", icon: Building2 },
  { href: "/admin/etkinlikler", label: "Etkinlikler", icon: CalendarDays },
  { href: "/admin/duyurular", label: "Duyurular", icon: Megaphone },
  { href: "/admin/galeri", label: "Galeri", icon: Images },
  { href: "/admin/kurul", label: "Yönetim ve Denetim Kurulu", icon: UsersRound },
  { href: "/admin/icerik/uyelik", label: "Üyelik Bilgileri", icon: UserRoundCheck },
  { href: "/admin/icerik/aidat-bagis", label: "Aidat ve Bağış", icon: BadgeDollarSign },
  { href: "/admin/iletisim", label: "İletişim", icon: Contact },
  { href: "/admin/sss", label: "Sıkça Sorulanlar", icon: CircleHelp },
  { href: "/admin/icerik/marka", label: "Logo", icon: Palette },
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

          <nav className="flex gap-1 overflow-x-auto px-3 pb-4 lg:min-h-[calc(100vh-5rem)] lg:flex-col lg:overflow-visible lg:px-3 lg:pb-6" aria-label="Admin menü">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    active ? "bg-red-600 text-white" : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {label}
                </Link>
              );
            })}
            <Link
              href="/"
              className="mt-1 inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white lg:mt-4"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Siteye Dön
            </Link>
            <LogoutButton />
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
