"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Sign Up",
    description:
      "Choose your membership and complete a quick health intake. It takes less than 10 minutes.",
  },
  {
    number: "02",
    title: "Meet Your Doctor",
    description:
      "Get paired with a dedicated physician who will lead your care team and build a personalized health plan.",
  },
  {
    number: "03",
    title: "Access Your Team",
    description:
      "Connect with your nutritionist, exercise coach, and reproductive health adviser — all coordinated by your doctor.",
  },
  {
    number: "04",
    title: "Stay Well",
    description:
      "Ongoing telehealth visits, proactive check-ins, and a team that knows you. Healthcare that finally works.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="how-it-works"
      className="py-28 md:py-36 bg-teal-950 relative overflow-hidden"
      ref={ref}
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal-800/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-teal-700/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-teal-400/60" />
            <span className="text-teal-300 text-sm font-medium tracking-widest uppercase">
              How It Works
            </span>
            <div className="h-px w-12 bg-teal-400/60" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Getting started is
            <br />
            <span className="text-teal-300">simple.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
              className="relative"
            >
              <span className="text-6xl font-bold text-teal-800/40 block mb-4">
                {step.number}
              </span>
              <h3 className="text-xl font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-teal-200/70 leading-relaxed">
                {step.description}
              </p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-teal-700/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
