"use client";

import { useEffect, useState } from "react";
import { SIGNUP_URL } from "./signup";

/**
 * `_ga` looks like `GA1.1.1234567890.1234567890` (the middle digit is domain
 * depth, so `GA1.2`/`GA1.3` occur too); the client id is the trailing
 * `<digits>.<digits>`. Server-side tagging can store the bare `<digits>.<digits>`
 * form, which `slice(-2)` also handles.
 *
 * The name is anchored so we don't match `_ga_<CONTAINER>` — GA4 always sets
 * that session cookie right next to `_ga`, and it holds a completely different
 * value. Returns null rather than forwarding a guess, since the signup app
 * validates this exact shape and silently drops anything else.
 */
function readGaClientId(): string | null {
  try {
    // All matches, not just the first: a host-only `_ga` on www can sit
    // alongside the domain-scoped one, and cookie order is not guaranteed to
    // put the real one first. Take the first that actually parses.
    const matches = document.cookie.matchAll(/(?:^|;\s*)_ga=([^;]*)/g);
    for (const match of matches) {
      let value: string;
      try {
        value = decodeURIComponent(match[1]);
      } catch {
        continue; // bad percent-escape, try the next candidate
      }
      const clientId = value.split(".").slice(-2).join(".");
      if (/^\d{1,20}\.\d{1,20}$/.test(clientId)) return clientId;
    }
    return null;
  } catch {
    // document.cookie can throw in a sandboxed iframe.
    return null;
  }
}

// GTM loads async, so `_ga` is absent on first paint and we have to wait for
// it. The window is generous on purpose: people read a marketing page for a
// while before clicking, so giving up after a few seconds would silently lose
// attribution for anyone whose GTM settled slowly (bad connection, or a
// consent banner that only writes the cookie once accepted). Polling stops
// the instant the cookie appears, so the full run only ever happens when GA
// is blocked outright — where it costs one cheap regex per tick and changes
// nothing.
const GA_COOKIE_POLL_MS = 500;
const GA_COOKIE_POLL_ATTEMPTS = 120; // ~60s

/**
 * The signup URL, carrying this visitor's GA4 client id once it's available.
 *
 * The signup journey starts on this site and finishes on
 * bloom360.haloemr.com, and we deliberately never run a Google tag over
 * there — those are signed-in pages showing medical records, and Google is
 * not a BAA vendor. So instead of the usual two-tag cross-domain setup, we
 * hand the client id to the signup link and the Halo backend reports
 * sign_up / waitlist_signup / begin_checkout / purchase to GA4 against that
 * same id. Google only ever receives the pseudonymous id, never patient data.
 *
 * Starts as the bare SIGNUP_URL so the server render and the first client
 * render agree (no hydration mismatch), then fills in once the cookie shows
 * up. Returning a real href — rather than rewriting the destination inside an
 * onClick — keeps cmd-click and open-in-new-tab working. Every failure path
 * (GA blocked, consent denied, cookie never set, no JS at all) lands on the
 * plain signup URL, so the CTA always works and only attribution is lost.
 */
export function useSignupUrl(): string {
  const [url, setUrl] = useState(SIGNUP_URL);

  useEffect(() => {
    let attempts = 0;

    const apply = () => {
      const clientId = readGaClientId();
      if (!clientId) return false;
      // A query param, not a fragment, because the signup app reads this
      // server-side. Built through URL so a future param on SIGNUP_URL can't
      // produce a second "?".
      const next = new URL(SIGNUP_URL);
      next.searchParams.set("ga_client_id", clientId);
      setUrl(next.toString());
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
