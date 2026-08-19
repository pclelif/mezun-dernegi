"use client";

import { Undo2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function ReturnButton({
  defaultHref,
  defaultLabel,
}: {
  defaultHref: string;
  defaultLabel: string;
}) {
  const [buttonState] = useState(() => {
    if (typeof window === "undefined") {
      return { href: defaultHref, label: defaultLabel };
    }

    // 1. Check search params first (e.g. ?from=home, ?from=duyurular, ?from=etkinlikler)
    try {
      const params = new URLSearchParams(window.location.search);
      const fromParam = params.get("from");
      if (fromParam === "home") {
        return { href: "/", label: "Ana Sayfaya Dön" };
      }
      if (fromParam === "duyurular") {
        return { href: "/duyurular", label: "Duyurulara Dön" };
      }
      if (fromParam === "etkinlikler") {
        return { href: "/etkinlikler", label: "Etkinliklere Dön" };
      }
    } catch {}

    // 2. Check document.referrer fallback
    if (typeof document !== "undefined" && document.referrer) {
      try {
        const refUrl = new URL(document.referrer);
        const currentUrl = new URL(window.location.href);

        if (refUrl.origin === currentUrl.origin) {
          const path = refUrl.pathname;
          if (path === "/" || path === "") {
            return { href: "/", label: "Ana Sayfaya Dön" };
          }
          if (path === "/duyurular" || path === "/duyurular/") {
            return { href: "/duyurular", label: "Duyurulara Dön" };
          }
          if (path === "/etkinlikler" || path === "/etkinlikler/") {
            return { href: "/etkinlikler", label: "Etkinliklere Dön" };
          }
        }
      } catch {}
    }

    // 3. Fallback to passed defaults
    return { href: defaultHref, label: defaultLabel };
  });

  return (
    <Link
      href={buttonState.href}
      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-slate-50 hover:text-zinc-950 shadow-xs"
    >
      <Undo2 className="size-3.5 text-zinc-500" aria-hidden="true" />
      {buttonState.label}
    </Link>
  );
}
