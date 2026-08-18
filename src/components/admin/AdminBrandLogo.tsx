"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function AdminBrandLogo({ compact = false }: { compact?: boolean }) {
  const [url, setUrl] = useState("/logo-dernek.jpg");

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    void Promise.all([
      supabase.from("site_content").select("content").eq("section", "ana-sayfa").maybeSingle(),
      supabase.from("site_content").select("content").eq("section", "marka").maybeSingle(),
    ]).then(([homeRes, brandRes]) => {
      if (!active) return;
      const homeLogo = (homeRes.data?.content as { logo_url?: string } | null)?.logo_url;
      const brandLogo = (brandRes.data?.content as { logo_url?: string } | null)?.logo_url;
      const validUrl = (homeLogo && homeLogo.trim()) || (brandLogo && brandLogo.trim()) || "/logo-dernek.jpg";
      setUrl(validUrl);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div
      className={
        compact
          ? "size-9 shrink-0 overflow-hidden rounded-full bg-white p-0.5 shadow-sm ring-1 ring-white/20"
          : "mb-3 size-16 shrink-0 overflow-hidden rounded-full bg-white p-0.5 shadow-md ring-2 ring-white/30"
      }
    >
      <img
        src={url}
        alt="Dernek logosu"
        onError={() => setUrl("/logo-dernek.jpg")}
        className="size-full rounded-full object-cover"
      />
    </div>
  );
}
