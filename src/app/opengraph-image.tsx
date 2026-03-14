import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "bloom360 — Preventive Care, Reimagined";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontRegular = fetch(
  "https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-2zI.ttf"
).then((res) => res.arrayBuffer());

const fontItalic = fetch(
  "https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zATiw.ttf"
).then((res) => res.arrayBuffer());

export default async function OGImage() {
  const [fontRegularData, fontItalicData, logoData, emblemData] =
    await Promise.all([
      fontRegular,
      fontItalic,
      readFile(join(process.cwd(), "public", "logo.svg")),
      readFile(join(process.cwd(), "public", "emblem.svg")),
    ]);

  const logoSrc = `data:image/svg+xml;base64,${logoData.toString("base64")}`;
  const emblemSrc = `data:image/svg+xml;base64,${emblemData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#faf8f4",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Instrument Serif",
        }}
      >
        <img
          src={emblemSrc}
          width={500}
          height={500}
          style={{
            position: "absolute",
            right: -40,
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.04,
          }}
        />

        <div style={{ display: "flex" }}>
          <img src={logoSrc} height={44} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 400,
              color: "#1a1a1a",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            Your health,
            <span style={{ color: "#4a6741", fontStyle: "italic", marginLeft: 16 }}>
              finally
            </span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 400,
              color: "#1a1a1a",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            in good hands.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 18,
              color: "#8a8a8a",
              letterSpacing: "0.1em",
            }}
          >
            Physician-led preventive care membership
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              fontSize: 14,
              color: "#8a8a8a",
              letterSpacing: "0.05em",
            }}
          >
            <span>bloom360.com</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Instrument Serif",
          data: fontRegularData,
          style: "normal",
          weight: 400,
        },
        {
          name: "Instrument Serif",
          data: fontItalicData,
          style: "italic",
          weight: 400,
        },
      ],
    }
  );
}
