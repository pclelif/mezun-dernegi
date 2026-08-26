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
  siteConfig,
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
    default: "KAAFL Mezunlar Derneği",
    template: `%s | ${associationName}`,
  },
  description: associationDescription,
  applicationName: `${associationShortName} Mezunlar Derneği`,
  authors: [{ name: associationName, url: siteUrl }],
  creator: associationName,
  publisher: associationName,
  keywords: [
    "KAAFL",
    "KAAFL Mezunlar Derneği",
    "Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi",
    "Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunlar Derneği",
    "Aydoğan Aydın Fen Lisesi",
    "Keçiören Fen Lisesi Mezunlar Derneği",
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
    siteName: "KAAFL Mezunlar Derneği",
    title: "KAAFL Mezunlar Derneği",
    description: associationDescription,
    images: [
      {
        url: "/images/og-image.jpg?v=15",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "KAAFL Mezunlar Derneği",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KAAFL Mezunlar Derneği",
    description: associationDescription,
    images: ["/images/og-image.jpg?v=15"],
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
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/logo-dernek.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [brand, contact, home] = await Promise.all([
    getSiteContent("marka", {
      logo_url: "/logo-dernek.png",
      favicon_url: "/logo-dernek.png",
    }),
    getSiteContent("iletisim", {
      address: "Kızılay Mahallesi, Fevzi Çakmak-2 Sokak No:33, 06420 Çankaya/Ankara",
      email: "kaaflmezunder@gmail.com",
      instagram_url: "https://www.instagram.com/kaaflmezunder",
      linkedin_url:
        "https://www.linkedin.com/company/ke%C3%A7i%C3%B6ren-vatansever-%C5%9Fehit-t%C3%BCmgeneral-aydo%C4%9Fan-ayd%C4%B1n-fen-lisesi-mezunlar-derne%C4%9Fi/",
    }),
    getSiteContent("ana-sayfa", { logo_url: "/logo-dernek.png" }),
  ]);

  const logoUrl = home.logo_url || brand.logo_url || "/logo-dernek.png";

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
        {/* Explicit OpenGraph metadata for messaging crawlers (WhatsApp, Telegram, LinkedIn, Facebook) */}
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta property="og:image:secure_url" content={siteConfig.ogImage} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* Explicit Favicon and Touch Icon tags */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
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
