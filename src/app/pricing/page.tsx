"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useWaitlist } from "@/components/WaitlistProvider";
import Link from "next/link";

const features = [
  "Dedicated physician",
  "Registered dietitian",
  "Physical therapist",
  "Care navigator",
  "Unlimited messaging",
  "Video visits",
  "Preventive screenings",
  "Prescription management",
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const openWaitlist = useWaitlist();

  const monthlyPrice = annual ? 149 : 199;
  const billingNote = annual
    ? "Billed annually at $1,788/yr"
    : "Billed monthly";

  return (
    <main className="min-h-screen bg-cream text-ink">
      {/* Back link */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-28">
        <Link
          href="/"
          className="text-[13px] tracking-wide uppercase text-ink-muted hover:text-ink transition-colors duration-300"
        >
          &larr; Back to home
        </Link>
      </div>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-ink-muted text-[13px] tracking-[0.2em] uppercase mb-6">
              Pricing
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.05] tracking-tight">
              One membership.{" "}
              <em className="text-sage">Everything included.</em>
            </h1>
            <p className="mt-6 text-ink-muted text-lg leading-relaxed">
              No copays, no surprise bills, no hidden fees. Just comprehensive
              preventive care for one simple price.
            </p>
          </motion.div>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-16"
          >
            <span
              className={`text-sm tracking-wide uppercase transition-colors duration-300 ${
                !annual ? "text-ink" : "text-ink-muted"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                annual ? "bg-sage" : "bg-ink/20"
              }`}
              aria-label="Toggle annual billing"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-cream rounded-full shadow-sm transition-transform duration-300 ${
                  annual ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
            <span
              className={`text-sm tracking-wide uppercase transition-colors duration-300 ${
                annual ? "text-ink" : "text-ink-muted"
              }`}
            >
              Annual
              <span className="ml-2 text-sage text-xs font-medium">
                Save 25%
              </span>
            </span>
          </motion.div>

          {/* Pricing card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-lg mx-auto"
          >
            <div className="border border-ink/10 rounded-3xl p-10 md:p-12 bg-cream">
              <p className="text-ink-muted text-[13px] tracking-[0.2em] uppercase mb-4">
                bloom360 Membership
              </p>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-6xl md:text-7xl font-serif text-sage">
                  ${monthlyPrice}
                </span>
                <span className="text-ink-muted text-lg">/mo</span>
              </div>

              <p className="text-ink-muted text-sm mb-10">{billingNote}</p>

              <ul className="space-y-4 mb-10">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-ink-light"
                  >
                    <span className="w-5 h-5 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
                      <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        className="text-sage"
                      >
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={openWaitlist}
                className="group w-full inline-flex items-center justify-center gap-3 bg-ink text-cream px-8 py-4 rounded-full text-sm tracking-wide uppercase hover:bg-sage transition-colors duration-500"
              >
                Join the Waitlist
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
