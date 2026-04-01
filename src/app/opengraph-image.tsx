import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Everwood Sauna — Heat Crafted by Nature";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2B2B2B",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: 12,
            color: "#F7F3EE",
            fontFamily: "Georgia, serif",
          }}
        >
          EVERWOOD
        </div>
        <div
          style={{
            fontSize: 28,
            letterSpacing: 8,
            color: "#F7F3EE",
            opacity: 0.7,
            marginTop: 8,
            fontFamily: "Arial, sans-serif",
          }}
        >
          SAUNA
        </div>
        <div
          style={{
            width: 200,
            height: 2,
            backgroundColor: "#A67C52",
            marginTop: 32,
            marginBottom: 32,
          }}
        />
        <div
          style={{
            fontSize: 24,
            color: "#A67C52",
            fontStyle: "italic",
            fontFamily: "Georgia, serif",
          }}
        >
          Heat Crafted by Nature
        </div>
        <div
          style={{
            fontSize: 16,
            color: "#F7F3EE",
            opacity: 0.5,
            marginTop: 24,
            fontFamily: "Arial, sans-serif",
          }}
        >
          Premium Saunas for Your Home
        </div>
      </div>
    ),
    { ...size }
  );
}
