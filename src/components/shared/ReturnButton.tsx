"use client";

import { Undo2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("from") === "home") {
        return { href: "/", label: "Ana Sayfaya Dön" };
      }
    } catch {}

    if (document.referrer) {
      try {
        const refUrl = new URL(document.referrer);
        const currentUrl = new URL(window.location.href);

        if (refUrl.origin === currentUrl.origin) {
          if (refUrl.pathname === "/" || refUrl.pathname === "") {
            return { href: "/", label: "Ana Sayfaya Dön" };
          }
        }
      } catch {}
    }

    return { href: defaultHref, label: defaultLabel };
  });

  return (
    <Link
      href={buttonState.href}
      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-slate-50 hover:text-zinc-950"
    >
      <Undo2 className="size-3.5 text-zinc-500" aria-hidden="true" />
      {buttonState.label}
    </Link>
  );
}
