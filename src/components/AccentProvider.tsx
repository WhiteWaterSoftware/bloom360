"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Accent = "sage" | "salmon";

const AccentContext = createContext<Accent>("sage");

export function useAccent() {
  return useContext(AccentContext);
}

/**
 * Reads accent from ?accent=salmon query param (persists to cookie).
 * Sets data-accent attribute on <html> for CSS variable overrides.
 * Default is "sage" (no attribute set).
 */
export default function AccentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accent, setAccent] = useState<Accent>("sage");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramAccent = params.get("accent");

    if (paramAccent === "salmon") {
      setAccent("salmon");
      document.cookie = "accent=salmon;path=/;max-age=31536000";
      document.documentElement.setAttribute("data-accent", "salmon");
    } else if (paramAccent === "sage") {
      setAccent("sage");
      document.cookie = "accent=;path=/;max-age=0";
      document.documentElement.removeAttribute("data-accent");
    } else {
      // Check cookie
      const match = document.cookie.match(/(?:^|; )accent=(\w+)/);
      if (match?.[1] === "salmon") {
        setAccent("salmon");
        document.documentElement.setAttribute("data-accent", "salmon");
      }
    }
  }, []);

  return (
    <AccentContext.Provider value={accent}>{children}</AccentContext.Provider>
  );
}
