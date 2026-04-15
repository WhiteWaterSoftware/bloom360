"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useWaitlist } from "./WaitlistProvider";

export default function CTA() {
  const openWaitlist = useWaitlist();
  const ref = useRef(null);
  const contentRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const contentInView = useInView(contentRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const emblemY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const emblemScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], [30, -20]);

  return (
    <section id="join" className="relative bg-ink text-cream overflow-hidden" ref={ref}>
      {/* Background emblem — parallax */}
      <motion.div
        style={{ y: emblemY, scale: emblemScale }}
        className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none"
      >
        <Image
          src="/emblem.svg"
          alt=""
          width={900}
          height={900}
          className="w-[800px] h-auto"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        ref={contentRef}
        style={{ y: contentY }}
        className="relative pt-20 md:pt-40 pb-20 md:pb-40"
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={contentInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-cream/40 text-[12px] md:text-[13px] tracking-[0.2em] uppercase mb-5 md:mb-6">
              Get Started
            </p>
            <h2 className="text-[clamp(2.75rem,11vw,8.5rem)] md:text-7xl lg:text-8xl font-serif leading-[0.95] tracking-tight">
              Your health,
              <br />
              <em className="text-salmon-light">in full bloom.</em>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 md:mt-8 text-cream/50 text-base md:text-xl leading-relaxed max-w-xl mx-auto"
          >
            Join the waitlist and be first to access Bloom360 when we launch in
            your area. Founding member spots are limited.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <button
              onClick={openWaitlist}
              className="group inline-flex items-center justify-center gap-3 bg-cream text-ink px-8 py-4 md:px-10 md:py-5 rounded-full text-sm tracking-wide uppercase hover:bg-salmon-light hover:text-cream transition-colors duration-500"
            >
              Join the Waitlist
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </button>
            <a
              href="mailto:care@bloom360.com"
              className="inline-flex items-center justify-center gap-2 border border-cream/20 text-cream px-8 py-4 md:px-10 md:py-5 rounded-full text-sm tracking-wide uppercase hover:border-cream/50 transition-colors duration-500"
            >
              Get in touch
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
