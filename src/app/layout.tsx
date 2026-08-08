import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "KAAFL Mezunlar Derneği", template: "%s | KAAFL Mezunlar Derneği" },
  description: "KAAFL mezunlarını bir araya getiren dayanışma ve iletişim platformu.",
  icons: { icon: "/kaafl-logo-v2.jpg", apple: "/kaafl-logo-v2.jpg" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="tr" data-scroll-behavior="smooth"><body><Header /><main>{children}</main><Footer /></body></html>;
}
