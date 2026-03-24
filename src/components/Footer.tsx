"use client";

import Image from "next/image";
import { useAccent } from "./AccentProvider";

const footerLinks = {
  Care: [
    { label: "Primary Care", href: "#services" },
    { label: "Nutrition", href: "#services" },
    { label: "Physical Therapy", href: "#services" },
    { label: "Reproductive Health", href: "#services" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "mailto:care@bloom360.com" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Telehealth Consent", href: "/telehealth-consent" },
    { label: "Nondiscrimination", href: "/nondiscrimination" },
    { label: "Cancellation", href: "/cancellation" },
    { label: "Controlled Substances", href: "/controlled-substances" },
  ],
};

export default function Footer() {
  const accent = useAccent();
  return (
    <footer className="bg-ink text-cream/40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <Image
              src={accent === "salmon" ? "/logo-white-salmon.svg" : "/logo-white.svg"}
              alt="bloom360"
              width={120}
              height={28}
              className="h-6 w-auto mb-5 opacity-80"
            />
            <p className="text-sm leading-relaxed max-w-xs">
              Tech-powered, physician-led preventive care built for the way you
              actually live.
            </p>
            <p className="mt-6 text-xs text-cream/20">
              care@bloom360.com
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="md:col-span-2 md:col-start-auto">
              <h4 className="text-[11px] font-medium text-cream/20 tracking-[0.2em] uppercase mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-cream/70 transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-cream/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-cream/20">
            &copy; {new Date().getFullYear()} bloom360, Inc. All rights reserved.
          </p>
          <p className="text-[11px] text-cream/15 max-w-lg md:text-right leading-relaxed">
            bloom360 provides telehealth services and is not a substitute for
            emergency care. If you are experiencing a medical emergency, call
            911.
          </p>
        </div>
      </div>
    </footer>
  );
}
