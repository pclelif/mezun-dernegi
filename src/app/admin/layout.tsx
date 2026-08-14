"use client";

import {
  ArrowLeft,
  CalendarDays,
  Images,
  LayoutDashboard,
  Megaphone,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { LogoutButton } from "@/components/admin/LogoutButton";

const navItems: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/etkinlikler", label: "Etkinlikler", icon: CalendarDays },
  { href: "/admin/duyurular", label: "Duyurular", icon: Megaphone },
  { href: "/admin/galeri", label: "Galeri", icon: Images },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-zinc-900">
      <div className="mx-auto flex min-h-screen max-w-[90rem] flex-col lg:flex-row">
        <aside className="border-b border-zinc-200 bg-zinc-950 text-white lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r lg:border-zinc-800">
          <div className="flex items-center justify-between px-5 py-5 lg:block">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-400">Yönetim</p>
              <p className="mt-1 text-sm font-bold">Dernek Paneli</p>
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
