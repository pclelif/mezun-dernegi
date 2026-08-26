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
          backgroundColor: "#f1f5f9",
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
              "linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.82) 50%, rgba(255, 255, 255, 0.92) 100%)",
          }}
        />

        {/* Top spacer */}
        <div style={{ height: "24px" }} />

        {/* Center Content: Logo + Official Association Name in 3 lines */}
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
                width: "145px",
                height: "145px",
                borderRadius: "50%",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.18)",
                border: "4px solid #ffffff",
                marginBottom: "18px",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                background: "#ec1c24",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "44px",
                fontWeight: 900,
                marginBottom: "18px",
                border: "4px solid #ffffff",
              }}
            >
              KAAFL
            </div>
          )}

          {/* Association Full Official Name split into 3 clear lines */}
          <h1
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "39px",
              fontWeight: 900,
              lineHeight: 1.25,
              color: "#09090b",
              margin: 0,
              maxWidth: "1050px",
              textAlign: "center",
              letterSpacing: "-0.5px",
            }}
          >
            <span style={{ color: "#09090b" }}>Keçiören Vatansever Şehit Tümgeneral</span>
            <span style={{ color: "#09090b" }}>Aydoğan Aydın Fen Lisesi</span>
            <span style={{ color: "#ec1c24", fontSize: "43px", marginTop: "4px" }}>
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
              background: "rgba(236, 28, 36, 0.88)",
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
              }}
            >
              <span style={{ fontSize: "21px", fontWeight: 600, opacity: 0.95 }}>www.</span>
              <span
                style={{
                  fontSize: "27px",
                  fontWeight: 900,
                  letterSpacing: "1px",
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                kaaflmezunder
              </span>
              <span style={{ fontSize: "21px", fontWeight: 600, opacity: 0.95 }}>.org.tr</span>
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
