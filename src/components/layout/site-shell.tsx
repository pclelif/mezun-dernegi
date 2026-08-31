"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

type SiteSettings = { logo_url: string; address: string; email: string; instagram_url: string; linkedin_url: string };

export function SiteShell({ children, settings }: { children: ReactNode; settings: SiteSettings }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    }
  }, [pathname]);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="site-shell">
      <Header logoUrl={settings.logo_url} email={settings.email} instagramUrl={settings.instagram_url} linkedinUrl={settings.linkedin_url} />
      <main className="site-shell__main">{children}</main>
      <Footer logoUrl={settings.logo_url} address={settings.address} />
    </div>
  );
}
