"use client";

import { useEffect, useState } from "react";

// bloom360 is live — all CTAs send people to the signup app.
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

/**
 * This visitor's GA4 client id, read from the `_ga` cookie GTM sets.
 *
 * Signup finishes on bloom360.haloemr.com, and we deliberately never run a
 * Google tag over there — those are signed-in pages showing medical records,
 * and Google is not a BAA vendor. So the funnel is stitched the other way
 * round: we hand the client id to the signup app, and its backend reports
 * sign_up / waitlist_signup / begin_checkout / purchase to GA4 against this
 * same id. Google only ever receives the pseudonymous id, never patient data.
 *
 * `_ga` looks like `GA1.1.1234567890.1234567890`; the client id is the trailing
 * `<digits>.<digits>`. The signup app validates that exact shape and silently
 * drops anything else, so return null rather than forwarding a guess.
 */
function readGaClientId(): string | null {
  try {
    const match = document.cookie.match(/(?:^|;\s*)_ga=([^;]*)/);
    if (!match) return null;
    const clientId = decodeURIComponent(match[1]).split(".").slice(-2).join(".");
    return /^\d{1,20}\.\d{1,20}$/.test(clientId) ? clientId : null;
  } catch {
    return null;
  }
}

// GTM loads async, so `_ga` is usually absent on first paint. Re-check briefly
// rather than only on mount, otherwise a fast click on an above-the-fold CTA
// loses attribution — a silent failure that looks like the funnel just under-
// reporting. Gives up after ~3s; an unattributed signup still counts in GA4,
// it just isn't stitched to the marketing visit.
const GA_COOKIE_POLL_MS = 300;
const GA_COOKIE_POLL_ATTEMPTS = 10;

/**
 * The signup URL, carrying the GA client id once it's available.
 *
 * Starts as the bare SIGNUP_URL so the server render and first client render
 * agree (no hydration mismatch), then fills in once the cookie appears.
 * Returning a real href — rather than rewriting the destination inside an
 * onClick — keeps cmd-click and open-in-new-tab working.
 */
export function useSignupUrl(): string {
  const [url, setUrl] = useState(SIGNUP_URL);

  useEffect(() => {
    let attempts = 0;

    const apply = () => {
      const clientId = readGaClientId();
      if (!clientId) return false;
      setUrl(`${SIGNUP_URL}?ga_client_id=${encodeURIComponent(clientId)}`);
      return true;
    };

    if (apply()) return;

    const timer = setInterval(() => {
      attempts += 1;
      if (apply() || attempts >= GA_COOKIE_POLL_ATTEMPTS) {
        clearInterval(timer);
      }
    }, GA_COOKIE_POLL_MS);

    return () => clearInterval(timer);
  }, []);

  return url;
}
