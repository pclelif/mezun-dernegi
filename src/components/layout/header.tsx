"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/config/navigation";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-20 w-[min(100%-2rem,75rem)] items-center justify-between gap-6 md:w-[min(100%-4rem,75rem)]">
        <Link href="/" className="flex max-w-64 items-center gap-3 text-sm font-bold leading-tight tracking-tight text-zinc-950" aria-label="KAAFL Mezunlar Derneği ana sayfa">
          <Image src="/kaafl-logo.jpg" alt="" width={56} height={56} priority className="size-14 shrink-0 rounded-full object-cover" />
          <span>Mezunlar<br />Derneği</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Ana menü">
          {navigation.map((item) => {
            const active = pathname.startsWith(item.href);
            return <Link className={`border-b-2 py-7 text-sm font-medium transition-colors ${active ? "border-red-600 text-red-600" : "border-transparent text-zinc-700 hover:text-red-600"}`} href={item.href} key={item.href}>{item.label}</Link>;
          })}
        </nav>

        <button type="button" className="grid size-11 place-items-center rounded-md border border-zinc-300 text-zinc-900 lg:hidden" onClick={() => setIsOpen((current) => !current)} aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}>
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav id="mobile-navigation" className={`${isOpen ? "flex" : "hidden"} fixed inset-x-0 top-20 h-[calc(100dvh-5rem)] flex-col overflow-y-auto border-t border-zinc-200 bg-white px-4 py-5 lg:hidden`} aria-label="Mobil menü">
        {navigation.map((item) => <Link onClick={() => setIsOpen(false)} className="border-b border-zinc-200 px-2 py-4 text-base font-semibold text-zinc-900" href={item.href} key={item.href}>{item.label}</Link>)}
        <Link onClick={() => setIsOpen(false)} href="/uyelik/basvuru" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-red-600 px-5 font-semibold text-white">Üyelik başvurusu</Link>
      </nav>
    </header>
  );
}
