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
  const fontPath = path.join(process.cwd(), "public", "fonts", "Inter-Bold.ttf");

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

  let fontData: Buffer | null = null;
  try {
    if (fs.existsSync(fontPath)) {
      fontData = fs.readFileSync(fontPath);
    }
  } catch {
    fontData = null;
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
          backgroundColor: "#ffffff",
          overflow: "hidden",
          fontFamily: "Inter, sans-serif",
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
            }}
          />
        ) : null}

        {/* Soft white translucent gradient overlay for clean contrast & visible school */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.93) 0%, rgba(255, 255, 255, 0.83) 65%, rgba(255, 255, 255, 0.72) 100%)",
          }}
        />

        {/* Top breathing space */}
        <div style={{ height: "36px" }} />

        {/* Center Content: Large Logo + School Name + Subtitle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 60px",
          }}
        >
          {/* Logo */}
          {logoBase64 ? (
            <img
              src={logoBase64}
              alt="Dernek Logosu"
              style={{
                width: "185px",
                height: "185px",
                borderRadius: "50%",
                boxShadow: "0 16px 45px rgba(0, 0, 0, 0.20)",
                border: "5px solid #ffffff",
                marginBottom: "20px",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "170px",
                height: "170px",
                borderRadius: "50%",
                background: "#ec1c24",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "48px",
                fontWeight: 700,
                marginBottom: "20px",
                border: "5px solid #ffffff",
              }}
            >
              KAAFL
            </div>
          )}

          {/* School Name */}
          <h1
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "34px",
              fontWeight: 700,
              lineHeight: 1.3,
              color: "#0f172a",
              margin: 0,
              maxWidth: "1040px",
              textAlign: "center",
              letterSpacing: "-0.4px",
              fontFamily: "Inter",
            }}
          >
            <span style={{ color: "#0f172a" }}>Keçiören Vatansever Şehit Tümgeneral</span>
            <span style={{ color: "#0f172a" }}>Aydoğan Aydın Fen Lisesi</span>
          </h1>

          {/* Association Subtitle */}
          <span
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#ec1c24",
              marginTop: "10px",
              letterSpacing: "1.2px",
              fontFamily: "Inter",
            }}
          >
            Mezunları Derneği
          </span>
        </div>

        {/* Bottom semi-transparent gradient bar where school is subtly visible */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background:
              "linear-gradient(to top, rgba(215, 25, 33, 0.88) 0%, rgba(215, 25, 33, 0.65) 60%, rgba(215, 25, 33, 0.15) 95%, rgba(215, 25, 33, 0) 100%)",
            paddingTop: "22px",
            paddingBottom: "16px",
          }}
        >
          <span
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "1.5px",
              fontFamily: "Inter",
              textShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
            }}
          >
            www.kaaflmezunder.org.tr
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontData
        ? {
            fonts: [
              {
                name: "Inter",
                data: fontData,
                style: "normal" as const,
                weight: 700 as const,
              },
            ],
          }
        : {}),
    }
  );
}
