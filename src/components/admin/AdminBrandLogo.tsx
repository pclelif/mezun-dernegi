"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function AdminBrandLogo({ compact = false }: { compact?: boolean }) {
  const [url, setUrl] = useState("/logo-dernek.jpg");

  useEffect(() => {
    let active = true;
    void createClient()
      .from("site_content")
      .select("content")
      .eq("section", "marka")
      .maybeSingle()
      .then(({ data }) => {
        const next = (data?.content as { logo_url?: string } | null)?.logo_url;
        if (active && next) setUrl(next);
      });
    return () => {
      active = false;
    };
  }, []);

  if (compact) {
    return (
      <div className="size-9 shrink-0 overflow-hidden rounded-full bg-white p-0.5 shadow-sm ring-1 ring-white/20">
        <img
          src={url}
          alt="Dernek logosu"
          className="size-full rounded-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="mb-3 size-16 shrink-0 overflow-hidden rounded-full bg-white p-0.5 shadow-md ring-2 ring-white/30">
      <img
        src={url}
        alt="Dernek logosu"
        className="size-full rounded-full object-cover"
      />
    </div>
  );
}
