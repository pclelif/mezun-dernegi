import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "./globals.css";

export const metadata = {
  title: { default: "KAAFL Mezunlar Derneği", template: "%s | KAAFL Mezunlar Derneği" },
  description: "KAAFL mezunlarını bir araya getiren dayanışma ve iletişim platformu.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
