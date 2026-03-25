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
    offset: ["start start", "end end"],
  });

  return (
    <section id="how-it-works" ref={sectionRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 w-full">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mb-16 md:mb-20"
          >
            <p className="text-ink-muted text-[13px] tracking-[0.2em] uppercase mb-6">
              How It Works
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.08] tracking-tight">
              From signup to{" "}
              <em className="text-sage">feeling taken care of</em> — in days,
              not months.
            </h2>
          </motion.div>

          {/* Steps */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {steps.map((step, i) => (
              <StepItem
                key={step.title}
                step={step}
                index={i}
                scrollProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepItem({
  step,
  index,
  scrollProgress,
}: {
  step: (typeof steps)[number];
  index: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Each step gets an equal portion of scroll
  const stepStart = index * 0.25;
  const fadeInEnd = stepStart + 0.08;

  const opacity = useTransform(scrollProgress, (v) => {
    if (v < stepStart) return 0.15;
    if (v >= stepStart && v < fadeInEnd) {
      return 0.15 + ((v - stepStart) / (fadeInEnd - stepStart)) * 0.85;
    }
    return 1;
  });

  const scale = useTransform(scrollProgress, (v) => {
    if (v < stepStart) return 0.95;
    if (v >= stepStart && v < fadeInEnd) {
      return 0.95 + ((v - stepStart) / (fadeInEnd - stepStart)) * 0.05;
    }
    return 1;
  });

  const circleOpacity = useTransform(scrollProgress, (v) => {
    return v >= stepStart ? 1 : 0.3;
  });

  const lineScaleX = useTransform(scrollProgress, (v) => {
    const lineStart = stepStart + 0.1;
    const lineEnd = stepStart + 0.2;
    if (v < lineStart) return 0;
    if (v >= lineEnd) return 1;
    return (v - lineStart) / (lineEnd - lineStart);
  });

  return (
    <motion.div style={{ opacity, scale }} className="origin-top-left">
      {/* Number + line */}
      <div className="flex items-center gap-4 mb-6">
        <motion.div
          style={{ opacity: circleOpacity }}
          className="w-12 h-12 rounded-full bg-sage text-cream flex items-center justify-center text-sm font-mono shrink-0 transition-all duration-500"
        >
          {index + 1}
        </motion.div>
        {index < steps.length - 1 && (
          <motion.div
            style={{ scaleX: lineScaleX }}
            className="hidden lg:block h-px bg-sage/30 flex-1 origin-left"
          />
        )}
      </div>

      <h3 className="text-xl md:text-2xl font-serif mb-3">{step.title}</h3>
      <p className="text-ink-muted leading-relaxed">{step.description}</p>
    </motion.div>
  );
}
