import { redirect } from "next/navigation";

/**
 * OG Image Render Page
 *
 * This page renders the Open Graph card using real browser fonts.
 * It is only accessible in development — production requests redirect to home.
 *
 * To regenerate the OG image:
 *   1. Run `npm run dev`
 *   2. Open http://localhost:3000/og-render
 *   3. Screenshot at 1200x630 (or use puppeteer with 2x DPR)
 *   4. Save to public/og.png
 */

export default function OGRender() {
  if (process.env.NODE_ENV === "production") {
    redirect("/");
  }

  return (
    <div
      style={{
        width: 1200,
        height: 630,
        margin: 0,
        padding: 0,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#faf8f4",
          padding: "72px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/emblem.svg"
          alt=""
          style={{
            position: "absolute",
            right: -50,
            top: "50%",
            transform: "translateY(-50%)",
            width: 550,
            height: 550,
            opacity: 0.035,
          }}
        />

        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" style={{ height: 56 }} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div
            className="font-serif"
            style={{
              fontSize: 110,
              fontWeight: 400,
              color: "#1a1a1a",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Your health,{" "}
            <span className="italic" style={{ color: "#f26a6c" }}>
              finally
            </span>
          </div>
          <div
            className="font-serif"
            style={{
              fontSize: 110,
              fontWeight: 400,
              color: "#1a1a1a",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            in good hands.
          </div>
        </div>
      </div>
    </div>
  );
}
