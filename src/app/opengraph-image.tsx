import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Keçiören Vatansever Şehit Tümgeneral Aydoğan Aydın Fen Lisesi Mezunları Derneği";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          background: "linear-gradient(135deg, #18181b 0%, #09090b 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle decorative background circle */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-150px",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(236, 28, 36, 0.25) 0%, rgba(236, 28, 36, 0) 70%)",
          }}
        />

        {/* Top bar with Badge and Short name */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "#ec1c24",
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: 900,
                letterSpacing: "1px",
              }}
            >
              K
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "2px", color: "#ec1c24" }}>
                KAAFL
              </span>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "1px" }}>
                Mezunları Derneği
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 20px",
              background: "rgba(255, 255, 255, 0.08)",
              borderRadius: "9999px",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              fontSize: "15px",
              fontWeight: 600,
              color: "#e4e4e7",
              letterSpacing: "0.5px",
            }}
          >
            Resmî Web Sitesi
          </div>
        </div>

        {/* Center Content: Long official title & description */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "1000px" }}>
          <div
            style={{
              display: "flex",
              width: "80px",
              height: "4px",
              background: "#ec1c24",
              borderRadius: "2px",
            }}
          />
          <h1
            style={{
              fontSize: "44px",
              fontWeight: 900,
              lineHeight: 1.2,
              letterSpacing: "-0.5px",
              color: "#ffffff",
              margin: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Keçiören Vatansever Şehit Tümgeneral</span>
            <span style={{ color: "#ffffff" }}>Aydoğan Aydın Fen Lisesi</span>
            <span style={{ color: "#ec1c24" }}>Mezunları Derneği</span>
          </h1>

          <p
            style={{
              fontSize: "20px",
              lineHeight: 1.5,
              color: "#d4d4d8",
              margin: 0,
            }}
          >
            Bir okul. Binlerce hikâye. Tek bir aile. Mezunlarımızı bir araya getiren dayanışma ve iletişim platformu.
          </p>
        </div>

        {/* Bottom bar: Website URL and Established */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "18px",
              fontWeight: 700,
              color: "#ec1c24",
              letterSpacing: "0.5px",
            }}
          >
            kaaflmezunder.org.tr
          </div>

          <div
            style={{
              display: "flex",
              gap: "24px",
              fontSize: "15px",
              fontWeight: 600,
              color: "#a1a1aa",
            }}
          >
            <span>Duyurular</span>
            <span>•</span>
            <span>Etkinlikler</span>
            <span>•</span>
            <span>Üyelik</span>
            <span>•</span>
            <span>Dayanışma</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
