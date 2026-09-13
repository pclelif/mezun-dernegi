"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function AdminBrandLogo({ compact = false }: { compact?: boolean }) {
  const [url, setUrl] = useState("/logo-dernek.png");

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
      const validUrl = (homeLogo && homeLogo.trim()) || (brandLogo && brandLogo.trim()) || "/logo-dernek.png";
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
          ? "relative size-9 shrink-0 overflow-hidden rounded-full"
          : "relative mb-3 size-16 shrink-0 overflow-hidden rounded-full"
      }
    >
      <Image
        src={url}
        alt="Dernek logosu"
        fill
        quality={75}
        sizes={compact ? "36px" : "64px"}
        className="rounded-full object-contain"
        onError={() => setUrl("/logo-dernek.png")}
      />
    </div>
  );
}
