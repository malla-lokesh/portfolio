import { ImageResponse } from "next/og";

export const alt = "lokesh mvs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#ffffff",
          color: "#141414",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
          }}
        >
          lokesh mvs
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            color: "#6b6b6b",
            letterSpacing: "-0.02em",
            lineHeight: 1.35,
            maxWidth: 800,
          }}
        >
          Frontend developer. Learning design, writing, and sharing what I
          like.
        </div>
      </div>
    ),
    { ...size }
  );
}
