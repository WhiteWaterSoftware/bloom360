"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Philosophy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-40 bg-sage text-cream overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-cream/50 text-[13px] tracking-[0.2em] uppercase mb-8">
            Our philosophy
          </p>
          <blockquote className="text-3xl md:text-5xl lg:text-6xl font-serif leading-[1.15] tracking-tight">
            &ldquo;We use technology to make great care{" "}
            <em>accessible</em>, and relationships to make it{" "}
            <em>stick.</em>&rdquo;
          </blockquote>
          <div className="mt-10 h-px w-16 bg-cream/30 mx-auto" />
          <p className="mt-6 text-cream/50 text-sm tracking-wide">
            Prevention first. Always.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
