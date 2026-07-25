import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F172A",
          borderRadius: 36,
          color: "#F8FAFC",
          fontSize: 56,
          fontWeight: 700,
          letterSpacing: -1,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        GRW
      </div>
    ),
    { ...size },
  );
}
