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
          backgroundColor: "#f1f5f9",
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

        {/* Gradient Overlay for elegance & high contrast legibility (Hero style) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.93) 0%, rgba(255, 255, 255, 0.84) 50%, rgba(255, 255, 255, 0.93) 100%)",
          }}
        />

        {/* Top spacer */}
        <div style={{ height: "14px" }} />

        {/* Center Content: Logo + Official Association Name in 3 lines */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 40px",
          }}
        >
          {/* Logo */}
          {logoBase64 ? (
            <img
              src={logoBase64}
              alt="Dernek Logosu"
              style={{
                width: "175px",
                height: "175px",
                borderRadius: "50%",
                boxShadow: "0 12px 35px rgba(0, 0, 0, 0.22)",
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

          {/* Association Full Official Name split into 3 clear lines with Inter Bold */}
          <h1
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "38px",
              fontWeight: 700,
              lineHeight: 1.25,
              color: "#09090b",
              margin: 0,
              maxWidth: "1080px",
              textAlign: "center",
              letterSpacing: "-0.6px",
              fontFamily: "Inter",
            }}
          >
            <span style={{ color: "#09090b" }}>Keçiören Vatansever Şehit Tümgeneral</span>
            <span style={{ color: "#09090b" }}>Aydoğan Aydın Fen Lisesi</span>
            <span style={{ color: "#ec1c24", fontSize: "44px", marginTop: "4px" }}>
              Mezunları Derneği
            </span>
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
              height: "3px",
              background: "#ec1c24",
            }}
          />

          {/* Red banner stripe */}
          <div
            style={{
              width: "100%",
              height: "54px",
              background: "rgba(236, 28, 36, 0.90)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                color: "#ffffff",
                letterSpacing: "0.5px",
                fontFamily: "Inter",
              }}
            >
              <span style={{ fontSize: "21px", fontWeight: 700, opacity: 0.95 }}>www.</span>
              <span
                style={{
                  fontSize: "27px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                kaaflmezunder
              </span>
              <span style={{ fontSize: "21px", fontWeight: 700, opacity: 0.95 }}>.org.tr</span>
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
