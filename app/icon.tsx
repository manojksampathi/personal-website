import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Generates favicon dynamically — emerald-to-teal gradient with "MS" initials
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background:
            "linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #0d9488 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 800,
          letterSpacing: "-0.05em",
          borderRadius: "8px",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
      >
        MS
      </div>
    ),
    { ...size }
  );
}
