import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { SiteShell } from "@/components/layout/site-shell";
import { associationDescription, associationName } from "@/config/site";
import { getSiteContent } from "@/lib/supabase/queries";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getSiteContent("marka", { logo_url: "/mezunderlogo.jpg", favicon_url: "/logo-dernek.svg" });
  return { title: { default: associationName, template: `%s | ${associationName}` }, description: associationDescription, icons: { icon: brand.favicon_url, apple: brand.logo_url } };
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const [brand, contact] = await Promise.all([
    getSiteContent("marka", { logo_url: "/mezunderlogo.jpg", favicon_url: "/logo-dernek.svg" }),
    getSiteContent("iletisim", { address: "Kızılay Mahallesi, Fevzi Çakmak-2 Sokak No:33, 06420 Çankaya/Ankara", email: "kaaflmezunder@gmail.com", instagram_url: "https://www.instagram.com/kaaflmezunder", linkedin_url: "https://www.linkedin.com/company/ke%C3%A7i%C3%B6ren-vatansever-%C5%9Fehit-t%C3%BCmgeneral-aydo%C4%9Fan-ayd%C4%B1n-fen-lisesi-mezunlar-derne%C4%9Fi/" }),
  ]);
  return (
    <html lang="tr" data-scroll-behavior="smooth">
      <body>
        <SiteShell settings={{ logo_url: brand.logo_url, address: contact.address, email: contact.email, instagram_url: contact.instagram_url, linkedin_url: contact.linkedin_url }}>{children}</SiteShell>
        <CookieBanner />
      </body>
    </html>
  );
}
