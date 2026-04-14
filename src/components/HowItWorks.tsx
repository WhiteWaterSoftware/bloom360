"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    title: "Sign up",
    description:
      "Pick your membership and create your account. Takes just a few minutes.",
  },
  {
    title: "Meet your doctor",
    description:
      "Book your initial appointment with your dedicated physician. Most new members are seen within 2–3 days.",
  },
  {
    title: "Complete your intake",
    description:
      "We'll email you a short health intake form before your appointment — about 10 minutes. It helps your physician get to know you before you even meet.",
  },
  {
    title: "Stay well",
    description:
      "Regular visits, proactive check-ins, and a team that stays engaged between appointments. That's the whole point.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "end 0.3"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 md:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 lg:pr-[min(calc(38vw_+_5rem),38rem)]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20 max-w-2xl"
        >
          <p className="text-ink-muted text-[13px] tracking-[0.2em] uppercase mb-6">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-[1.08] tracking-tight">
            From signup to{" "}
            <em className="text-salmon">feeling taken care of</em> — in days,
            not months.
          </h2>
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative max-w-2xl">
          {/* Full line background */}
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-ink/10" />
          {/* Progress line */}
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[19px] top-3 bottom-3 w-px bg-salmon origin-top"
          />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => (
              <TimelineStep
                key={step.title}
                step={step}
                index={i}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineStep({
  step,
  index,
  progress,
}: {
  step: (typeof steps)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const threshold = index / steps.length;
  const fadeStart = Math.max(0, threshold - 0.05);
  const fadeEnd = Math.min(1, threshold + 0.1);

  const dotOpacity = useTransform(progress, [fadeStart, fadeEnd], [0.15, 1]);
  const dotScale = useTransform(progress, [fadeStart, fadeEnd], [0.8, 1]);
  const textOpacity = useTransform(progress, [fadeStart, fadeEnd], [0.3, 1]);
  const textY = useTransform(progress, [fadeStart, fadeEnd], [12, 0]);

  return (
    <div className="relative pl-14">
      <motion.div
        style={{ opacity: dotOpacity, scale: dotScale }}
        className="absolute left-0 top-1 w-10 h-10 rounded-full bg-salmon text-cream flex items-center justify-center text-sm font-mono origin-center"
      >
        {index + 1}
      </motion.div>
      <motion.div style={{ opacity: textOpacity, y: textY }}>
        <h3 className="text-xl md:text-2xl font-serif mb-2">{step.title}</h3>
        <p className="text-ink-muted leading-relaxed">{step.description}</p>
      </motion.div>
    </div>
  );
}
