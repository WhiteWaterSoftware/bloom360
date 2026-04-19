"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

function PopIn({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-40" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 lg:pr-[min(calc(38vw_+_5rem),38rem)]">
        {/* Bento grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Headline area */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-end p-6 md:p-8"
          >
            <p className="text-ink-muted text-[13px] tracking-[0.2em] uppercase mb-6">
              About bloom360
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-[1.05] tracking-tight">
              Care that&apos;s{" "}
              <em className="text-salmon">proactive,</em>
              <br />
              not reactive.
            </h2>
            <p className="mt-6 text-ink-muted text-base leading-relaxed">
              Bloom360 is a 100% online primary care practice where prevention
              comes first. Led by a physician and supported by a full care
              team&nbsp;&mdash; including a dietitian and exercise coach&nbsp;&mdash; we
              give you 24/7 text access to your doctor, same-day refills, and
              same-week appointments.
            </p>
          </motion.div>

          <PopIn className="rounded-3xl bg-salmon/[0.07] p-6 md:p-8 flex flex-col justify-end min-h-[220px]">
            <h3 className="text-xl md:text-2xl font-serif mb-3">
              One team. One plan.
            </h3>
            <p className="text-ink-muted leading-relaxed text-sm">
              Your doctor, dietitian, physical therapist, and Concierge
              Health Assistant work together on you. Nothing falls through the
              cracks.
            </p>
          </PopIn>

          <PopIn className="rounded-3xl bg-ink text-cream p-6 md:p-8 flex flex-col justify-end min-h-[200px]">
            <h3 className="text-xl md:text-2xl font-serif mb-3">
              Built to keep you well.
            </h3>
            <p className="text-cream/60 leading-relaxed text-sm">
              We catch the small things before they become big ones, and build
              habits that hold up between visits.
            </p>
          </PopIn>

          <PopIn className="rounded-3xl border border-ink/10 p-6 md:p-8 flex flex-col justify-end min-h-[200px]">
            <h3 className="text-xl md:text-2xl font-serif mb-3">
              No waiting rooms. No runaround.
            </h3>
            <p className="text-ink-muted leading-relaxed text-sm">
              Everything happens virtually, on your schedule. Real
              relationships, without the friction.
            </p>
          </PopIn>
        </div>
      </div>
    </section>
  );
}
