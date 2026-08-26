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

  const brandRed = "#ec1c24";

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

        {/* Light subtle translucent overlay so school photo is clearly seen */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.58) 50%, rgba(255, 255, 255, 0.74) 100%)",
          }}
        />

        {/* Top spacing */}
        <div style={{ height: "30px" }} />

        {/* Center Content: Larger Logo + 3-line typography */}
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
                width: "195px",
                height: "195px",
                borderRadius: "50%",
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.22)",
                border: "5px solid #ffffff",
                marginBottom: "20px",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                background: brandRed,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "52px",
                fontWeight: 700,
                marginBottom: "20px",
                border: "5px solid #ffffff",
              }}
            >
              KAAFL
            </div>
          )}

          {/* 3 lines typography */}
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
            }}
          >
            <span style={{ color: "#000000" }}>Keçiören Vatansever Şehit Tümgeneral</span>
            <span style={{ color: "#000000" }}>Aydoğan Aydın Fen Lisesi</span>
            <span style={{ color: brandRed, fontSize: "35px", marginTop: "4px" }}>
              Mezunları Derneği
            </span>
          </h1>
        </div>

        {/* Bottom clean red domain badge with identical Inter Bold typography */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: brandRed,
              padding: "8px 28px",
              borderRadius: "9999px",
              boxShadow: "0 4px 15px rgba(236, 28, 36, 0.35)",
              border: "2px solid #ffffff",
            }}
          >
            <span
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.3px",
                fontFamily: "Inter",
                lineHeight: 1,
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
