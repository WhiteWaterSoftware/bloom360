"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera } from "@phosphor-icons/react";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-40" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Bento grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Headline area */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-end p-8 md:p-10"
          >
            <p className="text-ink-muted text-[13px] tracking-[0.2em] uppercase mb-6">
              About bloom360
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.05] tracking-tight">
              Care that{" "}
              <em className="text-sage">keeps</em>
              <br />
              you well,
              <br />
              not just better.
            </h2>
            <p className="mt-8 text-ink-muted text-lg leading-relaxed">
              Bloom360 is proactive, relationship-based care led by a physician
              and backed by a full team. We&apos;re focused on where your health
              is going, not just where it&apos;s been.
            </p>
          </motion.div>

          {/* Card 1 — with image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl bg-sage/[0.07] overflow-hidden flex flex-col"
          >
            <div className="flex-1 flex flex-col items-center justify-center min-h-[280px] text-ink/20">
              <Camera size={36} weight="duotone" />
              <span className="mt-2 text-xs tracking-wide uppercase">
                Team photo
              </span>
            </div>
            <div className="p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-serif mb-3">
                One team. One plan.
              </h3>
              <p className="text-ink-muted leading-relaxed">
                Your doctor, dietitian, physical therapist, and care navigator
                work together on you. Nothing falls through the cracks.
              </p>
            </div>
          </motion.div>

          {/* Card 2 — dark with image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="rounded-3xl bg-ink text-cream overflow-hidden flex flex-col"
          >
            <div className="flex-1 flex flex-col items-center justify-center min-h-[120px] text-cream/20">
              <Camera size={28} weight="duotone" />
              <span className="mt-2 text-xs tracking-wide uppercase">
                Wellness photo
              </span>
            </div>
            <div className="p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-serif mb-3">
                Built to keep you well.
              </h3>
              <p className="text-cream/60 leading-relaxed">
                We catch the small things before they become big ones, and build
                habits that hold up between visits.
              </p>
            </div>
          </motion.div>

          {/* Card 3 — bordered with image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="rounded-3xl border border-ink/10 overflow-hidden flex flex-col"
          >
            <div className="flex-1 flex flex-col items-center justify-center min-h-[120px] text-ink/20">
              <Camera size={28} weight="duotone" />
              <span className="mt-2 text-xs tracking-wide uppercase">
                Telehealth photo
              </span>
            </div>
            <div className="p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-serif mb-3">
                No waiting rooms. No runaround.
              </h3>
              <p className="text-ink-muted leading-relaxed">
                Everything happens virtually, on your schedule. Real
                relationships, without the friction.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
