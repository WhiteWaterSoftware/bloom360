"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Statement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const line1Opacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const line1Y = useTransform(scrollYProgress, [0.15, 0.35], [30, 0]);
  const line2Opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const line2Y = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);
  const line2Scale = useTransform(scrollYProgress, [0.3, 0.5], [0.92, 1]);

  return (
    <section
      ref={ref}
      className="relative z-20 -mt-48 md:-mt-64 pt-20 pb-28 md:pb-40 flex items-center justify-center"
    >
      {/* Gradient overlay to blend onto the image */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/80 to-cream pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 text-center">
        <motion.p
          style={{ opacity: line1Opacity, y: line1Y }}
          className="text-ink/50 text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-tight"
        >
          Most care waits for something to go wrong.
        </motion.p>
        <motion.p
          style={{ opacity: line2Opacity, y: line2Y, scale: line2Scale }}
          className="mt-4 md:mt-6 text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight"
        >
          We <em className="text-sage">don&apos;t.</em>
        </motion.p>
      </div>
    </section>
  );
}
