"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function AdminBrandLogo({ compact = false }: { compact?: boolean }) {
  const [url, setUrl] = useState("/mezunderlogo.jpg");

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
      <div className="size-9 shrink-0 overflow-hidden rounded-full bg-white p-0.5 shadow-sm">
        <div
          className="size-full rounded-full bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${url})` }}
          aria-label="Dernek logosu"
        />
      </div>
    );
  }

  return (
    <div className="mb-3 size-16 shrink-0 overflow-hidden rounded-full bg-white p-1">
      <div
        className="size-full rounded-full bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${url})` }}
        aria-label="Dernek logosu"
      />
    </div>
  );
}
