"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { navigation } from "@/config/navigation";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="container-site flex h-18 items-center justify-between">
        <Link href="/" className="font-bold text-[#143d2b]">KAFL Mezun Derneği</Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Ana menü">{navigation.map((item) => <Link className="text-sm font-medium hover:text-[#1f5a40]" href={item.href} key={item.href}>{item.label}</Link>)}</nav>
        <button className="rounded-lg p-2 lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menüyü aç veya kapat">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="container-site grid gap-1 border-t py-4 lg:hidden" aria-label="Mobil menü">{navigation.map((item) => <Link className="rounded-lg px-3 py-3 hover:bg-[#f6f4ee]" href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}</nav>}
    </header>
  );
}
