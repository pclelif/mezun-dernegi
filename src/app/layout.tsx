import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { SiteShell } from "@/components/layout/site-shell";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";
import {
  associationDescription,
  associationName,
  associationShortName,
  siteUrl,
} from "@/config/site";
import { getSiteContent } from "@/lib/supabase/queries";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "only light",
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${associationName} | ${associationShortName}`,
    template: `%s | ${associationName}`,
  },
  description: associationDescription,
  applicationName: `${associationShortName} Mezunları Derneği`,
  authors: [{ name: associationName, url: siteUrl }],
  creator: associationName,
  publisher: associationName,
  keywords: [
    "KAAFL",
    "KAAFL Mezunlar Derneği",
    "Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi",
    "Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunları Derneği",
    "Aydoğan Aydın Fen Lisesi",
    "Keçiören Fen Lisesi Mezunları",
    "KAAFL Dernek",
    "KAAFL Mezun",
    "Ankara Fen Lisesi Mezunlar Derneği",
    "Aydoğan Aydın Kimdir",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: associationName,
    title: `${associationName} | ${associationShortName}`,
    description: associationDescription,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: associationName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${associationName} | ${associationShortName}`,
    description: associationDescription,
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo-dernek.svg", type: "image/svg+xml" },
    ],
    apple: "/logo-dernek.jpg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [brand, contact, home] = await Promise.all([
    getSiteContent("marka", {
      logo_url: "/logo-dernek.jpg",
      favicon_url: "/logo-dernek.svg",
    }),
    getSiteContent("iletisim", {
      address: "Kızılay Mahallesi, Fevzi Çakmak-2 Sokak No:33, 06420 Çankaya/Ankara",
      email: "kaaflmezunder@gmail.com",
      instagram_url: "https://www.instagram.com/kaaflmezunder",
      linkedin_url:
        "https://www.linkedin.com/company/ke%C3%A7i%C3%B6ren-vatansever-%C5%9Fehit-t%C3%BCmgeneral-aydo%C4%9Fan-ayd%C4%B1n-fen-lisesi-mezunlar-derne%C4%9Fi/",
    }),
    getSiteContent("ana-sayfa", { logo_url: "/logo-dernek.jpg" }),
  ]);

  const logoUrl = home.logo_url || brand.logo_url || "/logo-dernek.jpg";

  return (
    <html
      lang="tr"
      data-scroll-behavior="smooth"
      className="light"
      style={{ colorScheme: "only light" }}
    >
      <head>
        <meta name="color-scheme" content="only light" />
        <meta name="supported-color-schemes" content="only light" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: dark)" />
        <OrganizationJsonLd
          logoUrl={logoUrl}
          address={contact.address}
          email={contact.email}
          instagramUrl={contact.instagram_url}
          linkedinUrl={contact.linkedin_url}
        />
        <WebSiteJsonLd />
      </head>
      <body className={`${inter.className} bg-white text-black`}>
        <SiteShell
          settings={{
            logo_url: logoUrl,
            address: contact.address,
            email: contact.email,
            instagram_url: contact.instagram_url,
            linkedin_url: contact.linkedin_url,
          }}
        >
          {children}
        </SiteShell>
        <CookieBanner />
      </body>
    </html>
  );
}
