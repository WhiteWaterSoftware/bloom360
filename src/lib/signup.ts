// bloom360 is live — all CTAs send people to the signup app.
// Deliberately NOT a client module: policy pages and other server components
// need to read this constant as a real string. The client-only hook that
// decorates it with analytics lives in ./useSignupUrl.
export const SIGNUP_URL = "https://bloom360.haloemr.com/signup";

// Mirrors the old waitlist conversion event so we keep tracking CTA
// conversions in GTM. `location` identifies which CTA was clicked.
export function trackSignupClick(location: string) {
  try {
    if (typeof window !== "undefined") {
      const w = window as typeof window & {
        dataLayer?: Record<string, unknown>[];
      };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event: "signup_click", location });
    }
  } catch {
    // Analytics failures must not affect navigation
  }
}
