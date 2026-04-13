"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Philosophy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-40 bg-sage text-cream overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 lg:pr-[min(calc(38vw_+_5rem),38rem)]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-cream/50 text-[13px] tracking-[0.2em] uppercase mb-8">
            Our Philosophy
          </p>
          <blockquote className="text-2xl md:text-3xl lg:text-[2.5rem] font-serif leading-[1.25] tracking-tight text-balance">
            &ldquo;Most care shows up when you&apos;re sick.{" "}
            <em>Ours</em> shows up before.&rdquo;
          </blockquote>
          <div className="mt-10 h-px w-16 bg-cream/30 mx-auto" />
          <p className="mt-6 text-cream/50 text-sm tracking-wide">
            Preventive first. Always.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
