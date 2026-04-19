"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useWaitlist } from "./WaitlistProvider";
import { Check } from "@phosphor-icons/react";

const plans = [
  {
    name: "Individual",
    monthly: 149,
    annual: 125,
    annualTotal: 1490,
    sub: "One member",
    detail:
      "Access your care team whenever you need it. Primary care physician, dietitian, physical therapist, and Concierge Health Assistant \u2014 all included.",
  },
  {
    name: "Couple",
    monthly: 249,
    annual: 208,
    annualTotal: 2490,
    sub: "Two members",
    detail:
      "Everything in Individual, for two members. Add any household member 16+ for $100/mo each. Shared Concierge Health Assistant and coordinated care plans.",
  },
];

function PlanCard({
  plan,
  annual,
  setAnnual,
  isFront,
  onClick,
  openWaitlist,
}: {
  plan: (typeof plans)[number];
  annual: boolean;
  setAnnual: (v: boolean) => void;
  isFront: boolean;
  onClick: () => void;
  openWaitlist: () => void;
}) {
  return (
    <motion.div
      layout
      onClick={isFront ? undefined : onClick}
      animate={
        isFront
          ? { scale: 1, y: 0, x: 0, rotate: 0, zIndex: 2, opacity: 1 }
          : { scale: 0.95, y: -18, x: 14, rotate: 1.5, zIndex: 1, opacity: 0.7 }
      }
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className={`absolute inset-0 rounded-3xl bg-cream text-ink shadow-xl shadow-ink/[0.04] overflow-hidden ${
        isFront ? "" : "cursor-pointer"
      }`}
    >
      {/* Back card tab — visible label peeking out */}
      {!isFront && (
        <div className="absolute top-5 right-5 z-10">
          <span className="text-[11px] tracking-[0.15em] uppercase text-ink/40 font-medium">
            {plan.name} &rarr;
          </span>
        </div>
      )}

      {/* Card content — only interactive when front */}
      <div className={`h-full flex flex-col ${isFront ? "" : "pointer-events-none"}`}>
        {/* Header */}
        <div className="flex items-center justify-end p-6 md:p-5 pb-0">
          {/* Billing toggle */}
          <div className="flex gap-1 bg-ink/[0.05] rounded-full p-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setAnnual(false);
              }}
              className={`px-4 py-2 rounded-full text-xs tracking-wide transition-all duration-300 ${
                !annual
                  ? "bg-ink text-cream"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setAnnual(true);
              }}
              className={`px-4 py-2 rounded-full text-xs tracking-wide transition-all duration-300 ${
                annual
                  ? "bg-ink text-cream"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              Annual
            </button>
          </div>
        </div>

        {/* Dynamic content area — grows to fill, pushes CTA to bottom */}
        <div className="px-6 md:px-5 pt-5 md:pt-6 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${plan.name}-${annual}`}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-baseline gap-2">
                <span className="text-ink/30 text-lg">$</span>
                <span className="text-6xl md:text-6xl font-serif tracking-tighter leading-none">
                  {annual ? plan.annual : plan.monthly}
                </span>
                <span className="text-ink/30 text-base">/mo</span>
                {annual && (
                  <span className="ml-2 text-salmon text-xs tracking-wide uppercase">
                    ~2 months free
                  </span>
                )}
              </div>
              <p className="mt-2 text-ink-muted text-sm">
                {plan.sub} &middot; billed{" "}
                {annual ? (
                  <>
                    annually at{" "}
                    <span className="text-ink font-medium">
                      ${plan.annualTotal.toLocaleString()}
                    </span>
                  </>
                ) : (
                  "monthly"
                )}
              </p>

              <p className="mt-5 text-ink-muted leading-relaxed text-sm max-w-lg">
                {plan.detail}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Divider — desktop only */}
        <div className="hidden md:block mx-5 mt-5 h-px bg-ink/[0.07]" />

        {/* Fixed CTA area — never moves */}
        <div className="px-6 md:px-5 py-5 md:py-6">
          <button
            onClick={openWaitlist}
            className="group w-full inline-flex items-center justify-center gap-3 bg-ink text-cream px-6 py-3.5 rounded-full text-sm tracking-wide uppercase hover:bg-salmon transition-colors duration-500"
          >
            Join as Founding Member
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </button>

          <p className="mt-3 text-center text-[11px] text-ink/30 leading-relaxed">
            Founding member pricing locked for 12 months. $99 enrollment
            fee waived.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const openWaitlist = useWaitlist();
  const [annual, setAnnual] = useState(true);
  const [activePlan, setActivePlan] = useState(0);

  const allFeatures = [
    "Secure messaging, anytime",
    "Scheduled video visits",
    "Prescription management",
    "Preventive screenings",
    "No copays. No deductibles.",
    "Full care team included",
  ];

  return (
    <section id="pricing" className="py-24 md:py-40 bg-salmon/[0.08] overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 lg:pr-[min(calc(38vw_+_5rem),38rem)]">
        <div className="grid gap-10 xl:grid-cols-2 xl:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-ink-muted text-[13px] tracking-[0.2em] uppercase mb-6">
              Membership Pricing
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-[1.05] tracking-tight">
              Simple pricing.
              <br />
              <em className="text-salmon">No surprises.</em>
            </h2>
            <p className="mt-6 text-ink-muted leading-relaxed max-w-md">
              Founding member pricing is locked in for your first 12 months, and
              the $99 enrollment fee is waived.
            </p>

            {/* Features grid */}
            <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {allFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-sm text-ink-muted"
                >
                  <Check size={14} weight="bold" className="text-salmon shrink-0" />
                  {feature}
                </div>
              ))}
            </div>

            {/* Bottom pills */}
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="text-sm font-medium text-salmon border-2 border-salmon/30 bg-salmon/[0.06] rounded-full px-5 py-2">
                HSA / FSA eligible
              </span>
              <span className="text-sm font-medium text-ink/60 border-2 border-ink/10 bg-ink/[0.03] rounded-full px-5 py-2">
                Cancel anytime
              </span>
            </div>
          </motion.div>

          {/* Stacked pricing cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 30 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Plan switcher */}
            <div className="flex items-center justify-center gap-4 mb-5">
              <button
                onClick={() => setActivePlan(activePlan === 0 ? 1 : 0)}
                aria-label="Previous plan"
                className="w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center text-ink/40 hover:text-ink hover:border-ink/30 transition-colors duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8.5 3L4.5 7L8.5 11" />
                </svg>
              </button>
              <span className="text-sm tracking-wide min-w-[140px] text-center">
                <button
                  onClick={() => setActivePlan(0)}
                  className={`transition-colors duration-300 ${activePlan === 0 ? "font-medium text-ink" : "text-ink/35 hover:text-ink/50"}`}
                >
                  Individual
                </button>
                <span className="text-ink/20 mx-2">/</span>
                <button
                  onClick={() => setActivePlan(1)}
                  className={`transition-colors duration-300 ${activePlan === 1 ? "font-medium text-ink" : "text-ink/35 hover:text-ink/50"}`}
                >
                  Couple
                </button>
              </span>
              <button
                onClick={() => setActivePlan(activePlan === 0 ? 1 : 0)}
                aria-label="Next plan"
                className="w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center text-ink/40 hover:text-ink hover:border-ink/30 transition-colors duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5.5 3L9.5 7L5.5 11" />
                </svg>
              </button>
            </div>

            <div className="relative min-h-[420px] md:min-h-[480px]">
              {plans.map((plan, i) => (
                <PlanCard
                  key={plan.name}
                  plan={plan}
                  annual={annual}
                  setAnnual={setAnnual}
                  isFront={activePlan === i}
                  onClick={() => setActivePlan(i)}
                  openWaitlist={openWaitlist}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
