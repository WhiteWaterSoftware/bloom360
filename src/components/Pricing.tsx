"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useWaitlist } from "./WaitlistProvider";
import { Check } from "@phosphor-icons/react";

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const openWaitlist = useWaitlist();
  const [annual, setAnnual] = useState(false);
  const [activePlan, setActivePlan] = useState(0);

  const plans = [
    { name: "Individual", monthly: 129, annual: 109, sub: "One member" },
    { name: "Couple", monthly: 209, annual: 179, sub: "Two members" },
  ];

  const allFeatures = [
    "Secure messaging, anytime",
    "Scheduled video visits",
    "Prescription management",
    "Preventive screenings",
    "No copays. Ever.",
    "Full care team included",
  ];

  const planDetails = [
    "Access your care team whenever you need it. Primary care physician, dietitian, physical therapist, and care navigator — all included.",
    "Everything in Individual, for two members. Add any household member 16+ for $80/mo each. Shared care navigator and coordinated care plans.",
  ];

  return (
    <section id="pricing" className="py-24 md:py-40 bg-sage/[0.08]" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <p className="text-ink-muted text-[13px] tracking-[0.2em] uppercase mb-6">
              Membership Pricing
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-[1.05] tracking-tight">
              Simple pricing.
              <br />
              <em className="text-sage">No surprises.</em>
            </h2>
            <p className="mt-6 text-ink-muted leading-relaxed max-w-md">
              Founding member pricing is locked in for your first 12 months, and
              the $99 enrollment fee is waived.
            </p>

            {/* Features grid */}
            <div className="mt-10 grid grid-cols-2 gap-3">
              {allFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-sm text-ink-muted"
                >
                  <Check size={14} weight="bold" className="text-sage shrink-0" />
                  {feature}
                </div>
              ))}
            </div>

            {/* Bottom pills */}
            <div className="mt-8 flex flex-wrap gap-2">
              {["HSA / FSA eligible", "Cancel anytime"].map((note) => (
                <span
                  key={note}
                  className="text-xs text-ink/40 border border-ink/10 rounded-full px-4 py-1.5"
                >
                  {note}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — pricing card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 40 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 lg:flex lg:flex-col"
          >
            <div className="rounded-3xl bg-cream text-ink shadow-xl shadow-ink/[0.04] overflow-hidden">
              {/* Top bar — plan toggle + billing toggle */}
              <div className="flex items-center justify-between p-6 pb-0">
                {/* Plan selector */}
                <div className="flex gap-1 bg-ink/[0.05] rounded-full p-1">
                  {plans.map((plan, i) => (
                    <button
                      key={plan.name}
                      onClick={() => setActivePlan(i)}
                      className={`px-5 py-2 rounded-full text-sm tracking-wide transition-all duration-300 ${
                        activePlan === i
                          ? "bg-sage text-cream"
                          : "text-ink-muted hover:text-ink"
                      }`}
                    >
                      {plan.name}
                    </button>
                  ))}
                </div>

                {/* Billing toggle */}
                <div className="flex gap-1 bg-ink/[0.05] rounded-full p-1">
                  <button
                    onClick={() => setAnnual(false)}
                    className={`px-4 py-2 rounded-full text-xs tracking-wide transition-all duration-300 ${
                      !annual
                        ? "bg-ink text-cream"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setAnnual(true)}
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

              {/* Price area */}
              <div className="p-8 md:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activePlan}-${annual}`}
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="text-ink/30 text-xl">$</span>
                      <span className="text-6xl md:text-7xl font-serif tracking-tighter leading-none">
                        {annual
                          ? plans[activePlan].annual
                          : plans[activePlan].monthly}
                      </span>
                      <span className="text-ink/30 text-lg">/mo</span>
                      {annual && (
                        <span className="ml-2 text-sage text-xs tracking-wide uppercase">
                          ~2 months free
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-ink-muted text-sm">
                      {plans[activePlan].sub} &middot; billed{" "}
                      {annual ? "annually" : "monthly"}
                    </p>

                    <p className="mt-6 text-ink-muted leading-relaxed max-w-lg">
                      {planDetails[activePlan]}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <button
                  onClick={openWaitlist}
                  className="group mt-8 w-full inline-flex items-center justify-center gap-3 bg-ink text-cream px-8 py-4 rounded-full text-sm tracking-wide uppercase hover:bg-sage transition-colors duration-500"
                >
                  Join as Founding Member
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </button>

                <p className="mt-4 text-center text-[11px] text-ink/30 leading-relaxed">
                  Founding member pricing locked for 12 months. $99 enrollment
                  fee waived.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
