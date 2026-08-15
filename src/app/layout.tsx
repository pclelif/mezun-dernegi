import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { SiteShell } from "@/components/layout/site-shell";
import { associationDescription, associationName } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: associationName, template: `%s | ${associationName}` },
  description: associationDescription,
  icons: { icon: "/kaafl-logo-v2.jpg", apple: "/kaafl-logo-v2.jpg" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="tr" data-scroll-behavior="smooth">
      <body>
        <SiteShell>{children}</SiteShell>
        <CookieBanner />
      </body>
    </html>
  );
}
