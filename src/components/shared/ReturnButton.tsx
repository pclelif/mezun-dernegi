"use client";

import { Undo2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

type ReturnButtonProps = { defaultHref: string; defaultLabel: string };

function ReturnLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-slate-50 hover:text-zinc-950 shadow-xs"
    >
      <Undo2 className="size-3.5 text-zinc-500" aria-hidden="true" />
      {label}
    </Link>
  );
}

function ReturnButtonContent({ defaultHref, defaultLabel }: ReturnButtonProps) {
  const from = useSearchParams().get("from");
  const destinations: Record<string, { href: string; label: string }> = {
    home: { href: "/", label: "Ana Sayfaya Dön" },
    duyurular: { href: "/duyurular-ve-etkinlikler/duyurular", label: "Duyurulara Dön" },
    etkinlikler: { href: "/duyurular-ve-etkinlikler/etkinlikler", label: "Etkinliklere Dön" },
  };
  const destination = from && Object.hasOwn(destinations, from)
    ? destinations[from] : { href: defaultHref, label: defaultLabel };
  return <ReturnLink {...destination} />;
}

export function ReturnButton(props: ReturnButtonProps) {
  return <Suspense fallback={<ReturnLink href={props.defaultHref} label={props.defaultLabel} />}>
    <ReturnButtonContent {...props} />
  </Suspense>;
}
