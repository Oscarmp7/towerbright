import { ImageResponse } from "next/og";

export const alt = "TowerBright — Premium Condo Cleaning Miami";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #111827 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 90px",
        }}
      >
        <div
          style={{
            width: 56,
            height: 2,
            background: "#b8975a",
            marginBottom: 36,
          }}
        />
        <div
          style={{
            fontSize: 26,
            color: "#b8975a",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 28,
            fontWeight: 300,
            display: "flex",
          }}
        >
          TowerBright
        </div>
        <div
          style={{
            fontSize: 76,
            color: "#ffffff",
            fontStyle: "italic",
            fontWeight: 300,
            lineHeight: 1.1,
            marginBottom: 36,
            display: "flex",
            flexDirection: "column",
          }}
        >
          Excellence is
          <span style={{ display: "flex" }}>the Standard.</span>
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#9ca3af",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          Premium Condo Cleaning · Miami · Brickell
        </div>
      </div>
    ),
    { ...size }
  );
}
