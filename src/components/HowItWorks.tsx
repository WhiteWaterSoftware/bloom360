"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    title: "Sign up",
    description: "Pick your membership and complete a 10-minute health intake. That's it.",
  },
  {
    title: "Meet your doctor",
    description:
      "Get paired with a physician who leads your care and builds a plan around your life.",
  },
  {
    title: "Access your team",
    description:
      "Your dietitian, exercise coach, and care navigator — one centralized and managed plan from day one.",
  },
  {
    title: "Stay well",
    description:
      "Proactive check-ins and visits when you need them — that's the whole point.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 md:py-40" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
          >
            <p className="text-ink-muted text-[13px] tracking-[0.2em] uppercase mb-6">
              How It Works
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-[1.08] tracking-tight">
              From signup to{" "}
              <em className="text-sage">feeling taken care of</em> — in days,
              not months.
            </h2>
          </motion.div>

          <div className="lg:col-span-7 lg:col-start-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                className="group relative pl-16 pb-16 last:pb-0"
              >
                {/* Vertical line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[19px] top-10 bottom-0 w-px bg-ink/10" />
                )}

                {/* Step number circle */}
                <div className="absolute left-0 top-0 w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center text-sm text-ink-muted group-hover:bg-sage group-hover:border-sage group-hover:text-cream transition-all duration-500">
                  {i + 1}
                </div>

                <h3 className="text-2xl font-serif mb-3">{step.title}</h3>
                <p className="text-ink-muted leading-relaxed max-w-md">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
