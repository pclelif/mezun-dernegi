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
  const [buttonState, setButtonState] = useState({
    href: defaultHref,
    label: defaultLabel,
  });

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const fromParam = params.get("from");
      if (fromParam === "home") {
        setButtonState({ href: "/", label: "Ana Sayfaya Dön" });
      } else if (fromParam === "duyurular") {
        setButtonState({ href: "/duyurular-ve-etkinlikler/duyurular", label: "Duyurulara Dön" });
      } else if (fromParam === "etkinlikler") {
        setButtonState({ href: "/duyurular-ve-etkinlikler/etkinlikler", label: "Etkinliklere Dön" });
      } else {
        setButtonState({ href: defaultHref, label: defaultLabel });
      }
    } catch {
      setButtonState({ href: defaultHref, label: defaultLabel });
    }
  }, [defaultHref, defaultLabel]);

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
