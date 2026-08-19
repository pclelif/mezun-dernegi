"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function DetailFooterLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("from") === "home") {
        setShow(true);
      }
    } catch {}
  }, []);

  if (!show) return null;

  return (
    <div className="flex items-center justify-start border-t border-zinc-100 bg-slate-50/50 px-6 py-4">
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ec1c24] hover:underline"
      >
        {label}
        <ArrowRight className="size-3.5 text-[#ec1c24] -translate-y-[0.5px]" aria-hidden="true" />
      </Link>
    </div>
  );
}
