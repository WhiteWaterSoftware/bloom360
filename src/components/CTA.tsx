"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useWaitlist } from "./WaitlistProvider";

export default function CTA() {
  const openWaitlist = useWaitlist();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="join" className="py-24 md:py-40 bg-cream-dark relative overflow-hidden" ref={ref}>
      {/* Background emblem */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <Image
          src="/emblem.svg"
          alt=""
          width={600}
          height={600}
          className="w-[500px] h-auto"
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="text-ink-muted text-[13px] tracking-[0.2em] uppercase mb-6">
            Get Started
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1] tracking-tight">
            Ready to have a care team that{" "}
            <em className="text-sage">actually knows you?</em>
          </h2>
          <p className="mt-8 text-ink-muted text-lg leading-relaxed max-w-xl">
            No waiting rooms. No runaround. Just excellent, accessible medicine
            built around your life. Join bloom360 today.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <button
              onClick={openWaitlist}
              className="group inline-flex items-center justify-center gap-3 bg-ink text-cream px-10 py-5 rounded-full text-sm tracking-wide uppercase hover:bg-sage transition-colors duration-500"
            >
              Join the Waitlist
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </button>
            <a
              href="mailto:care@bloom360.com"
              className="inline-flex items-center justify-center gap-2 border border-ink/15 text-ink px-10 py-5 rounded-full text-sm tracking-wide uppercase hover:border-ink/40 transition-colors duration-500"
            >
              Get in touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
