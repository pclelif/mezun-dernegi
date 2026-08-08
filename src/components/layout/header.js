"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { navigation } from "@/config/navigation";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container-site site-header__inner">
        <Link href="/" className="site-header__brand">KAAFL Mezunlar Derneği</Link>
        <nav className="site-header__nav" aria-label="Ana menü">
          {navigation.map((item) => <Link className="site-header__link" href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
        <button className="site-header__toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menüyü aç veya kapat">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="container-site site-header__mobile-nav" aria-label="Mobil menü">
          {navigation.map((item) => <Link className="site-header__mobile-link" href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
        </nav>
      )}
    </header>
  );
}
