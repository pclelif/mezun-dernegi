import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunları Derneği";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const heroPath = path.join(process.cwd(), "public", "hero-bg.jpg");
  const logoPath = path.join(process.cwd(), "public", "logo-dernek.jpg");

  let heroBase64 = "";
  try {
    if (fs.existsSync(heroPath)) {
      heroBase64 = `data:image/jpeg;base64,${fs.readFileSync(heroPath).toString("base64")}`;
    }
  } catch {
    heroBase64 = "";
  }

  let logoBase64 = "";
  try {
    if (fs.existsSync(logoPath)) {
      logoBase64 = `data:image/jpeg;base64,${fs.readFileSync(logoPath).toString("base64")}`;
    }
  } catch {
    logoBase64 = "";
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          backgroundColor: "#0a0b10",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background Image: School Photo */}
        {heroBase64 ? (
          <img
            src={heroBase64}
            alt="Okul Binası"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.28,
            }}
          />
        ) : null}

        {/* Gradient Overlay for elegance & high contrast legibility */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(135deg, rgba(80, 8, 16, 0.90) 0%, rgba(18, 14, 26, 0.93) 45%, rgba(8, 12, 24, 0.96) 100%)",
          }}
        />

        {/* Subtle decorative glow behind logo */}
        <div
          style={{
            position: "absolute",
            top: "90px",
            left: "450px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(236, 28, 36, 0.35) 0%, rgba(236, 28, 36, 0) 70%)",
          }}
        />

        {/* Top spacer */}
        <div style={{ height: "40px" }} />

        {/* Center Content: Logo + Official Association Name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 70px",
          }}
        >
          {/* Logo */}
          {logoBase64 ? (
            <img
              src={logoBase64}
              alt="Dernek Logosu"
              style={{
                width: "165px",
                height: "165px",
                borderRadius: "50%",
                boxShadow: "0 12px 35px rgba(0, 0, 0, 0.7)",
                border: "4px solid rgba(255, 255, 255, 0.95)",
                marginBottom: "32px",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                background: "#ec1c24",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "44px",
                fontWeight: 900,
                marginBottom: "32px",
                border: "4px solid #ffffff",
              }}
            >
              KAAFL
            </div>
          )}

          {/* Association Full Official Name */}
          <h1
            style={{
              fontSize: "36px",
              fontWeight: 800,
              lineHeight: 1.35,
              color: "#ffffff",
              margin: 0,
              maxWidth: "960px",
              textAlign: "center",
              letterSpacing: "-0.3px",
              textShadow: "0 3px 12px rgba(0, 0, 0, 0.8)",
            }}
          >
            Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunları Derneği
          </h1>
        </div>

        {/* Bottom Banner Bar with Website URL & Top Accent Line */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Accent Line */}
          <div
            style={{
              width: "100%",
              height: "2px",
              background: "linear-gradient(90deg, transparent 0%, #ec1c24 30%, #ec1c24 70%, transparent 100%)",
            }}
          />

          {/* Red banner stripe */}
          <div
            style={{
              width: "100%",
              height: "48px",
              background: "rgba(180, 15, 25, 0.80)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "1.2px",
              }}
            >
              www.kaaflmezunder.org.tr
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
