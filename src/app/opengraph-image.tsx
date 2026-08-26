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

        {/* Light subtle translucent overlay so school photo is clearly seen while text remains 100% readable */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0.55) 45%, rgba(255, 255, 255, 0.72) 100%)",
          }}
        />

        {/* Top breathing space */}
        <div style={{ height: "24px" }} />

        {/* Center Content: Logo + Unified 3-line typography */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 50px",
          }}
        >
          {/* Logo */}
          {logoBase64 ? (
            <img
              src={logoBase64}
              alt="Dernek Logosu"
              style={{
                width: "170px",
                height: "170px",
                borderRadius: "50%",
                boxShadow: "0 12px 35px rgba(0, 0, 0, 0.25)",
                border: "5px solid #ffffff",
                marginBottom: "16px",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                background: "#ec1c24",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "48px",
                fontWeight: 700,
                marginBottom: "16px",
                border: "5px solid #ffffff",
              }}
            >
              KAAFL
            </div>
          )}

          {/* 3 lines in exact same Inter Bold font and size */}
          <h1
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "38px",
              fontWeight: 700,
              lineHeight: 1.25,
              color: "#000000",
              margin: 0,
              maxWidth: "1080px",
              textAlign: "center",
              letterSpacing: "-0.5px",
              fontFamily: "Inter",
              textShadow:
                "0 2px 10px rgba(255, 255, 255, 0.95), 0 0 20px rgba(255, 255, 255, 0.9)",
            }}
          >
            <span style={{ color: "#000000" }}>Keçiören Vatansever Şehit Tümgeneral</span>
            <span style={{ color: "#000000" }}>Aydoğan Aydın Fen Lisesi</span>
            <span style={{ color: "#ec1c24" }}>Mezunları Derneği</span>
          </h1>
        </div>

        {/* Bottom solid red header-matching accent bar */}
        <div
          style={{
            width: "100%",
            height: "52px",
            background: "#ec1c24",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.15)",
          }}
        >
          <span
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "1px",
              fontFamily: "Inter",
              textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
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
