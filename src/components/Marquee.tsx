"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const words = [
  "Preventive Care",
  "Your Doctor",
  "Nutrition",
  "Movement",
  "Care Navigation",
  "Telehealth",
  "Wellness",
  "Your Team",
];

export default function Marquee() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="py-8 bg-ink overflow-hidden"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {[...words, ...words].map((word, i) => (
          <span
            key={i}
            className="mx-8 text-cream/60 text-sm tracking-[0.15em] uppercase flex items-center gap-8"
          >
            {word}
            <span className="w-1.5 h-1.5 rounded-full bg-sage inline-block" />
          </span>
        ))}
      </div>
    </motion.section>
  );
}
