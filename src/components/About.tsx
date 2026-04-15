"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
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

type Stat = {
  number: string;
  suffix?: string;
  label: string;
  description: string;
  bgClass: string;
  numberClass: string;
  eyebrowClass: string;
  bodyClass: string;
};

const STATS: Stat[] = [
  {
    number: "4",
    label: "Specialists on your team",
    description:
      "Doctor, dietitian, physical therapist, and care navigator — all working on you.",
    bgClass: "bg-cream",
    numberClass: "text-salmon",
    eyebrowClass: "text-salmon",
    bodyClass: "text-ink-muted",
  },
  {
    number: "1",
    label: "Coordinated plan",
    description:
      "One team, one record, one plan built around you — not a stack of separate visits.",
    bgClass: "bg-salmon",
    numberClass: "text-cream",
    eyebrowClass: "text-cream/80",
    bodyClass: "text-cream/85",
  },
  {
    number: "24",
    suffix: "hr",
    label: "Typical response",
    description:
      "Messages answered within a day. Appointments within 2-3. No waiting weeks for a callback.",
    bgClass: "bg-ink",
    numberClass: "text-salmon-light",
    eyebrowClass: "text-salmon-light",
    bodyClass: "text-cream/60",
  },
  {
    number: "0",
    label: "Waiting rooms",
    description:
      "Everything happens virtually, on your schedule. No desks, no lobbies, no runaround.",
    bgClass: "bg-forest",
    numberClass: "text-salmon-light",
    eyebrowClass: "text-salmon-light",
    bodyClass: "text-cream/65",
  },
];

function StatPanel({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const numberScale = useTransform(scrollYProgress, [0.15, 0.5], [0.7, 1]);
  const numberOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.38, 0.78, 0.95],
    [0, 1, 1, 0.4]
  );
  const labelOpacity = useTransform(scrollYProgress, [0.32, 0.55], [0, 1]);
  const labelY = useTransform(scrollYProgress, [0.32, 0.55], [20, 0]);
  const indexOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);

  return (
    <div
      ref={ref}
      className={`h-[78vh] min-h-[520px] flex flex-col items-center justify-center px-8 relative overflow-hidden ${stat.bgClass}`}
    >
      <motion.div
        style={{ opacity: indexOpacity }}
        className={`absolute top-8 left-8 text-[10px] tracking-[0.3em] font-mono ${stat.eyebrowClass}`}
      >
        0{index + 1} / 04
      </motion.div>

      <div className="text-center">
        <motion.div
          style={{ scale: numberScale, opacity: numberOpacity }}
          className="flex items-baseline justify-center leading-[0.82] origin-center"
        >
          <span
            className={`font-serif tracking-[-0.04em] ${stat.numberClass}`}
            style={{ fontSize: "clamp(10rem, 44vw, 18rem)" }}
          >
            {stat.number}
          </span>
          {stat.suffix && (
            <span
              className={`font-serif italic ml-2 tracking-[-0.02em] ${stat.numberClass}`}
              style={{ fontSize: "clamp(2.5rem, 10vw, 4.5rem)" }}
            >
              {stat.suffix}
            </span>
          )}
        </motion.div>

        <motion.p
          style={{ opacity: labelOpacity, y: labelY }}
          className={`mt-8 text-[11px] tracking-[0.3em] uppercase ${stat.eyebrowClass}`}
        >
          {stat.label}
        </motion.p>
        <motion.p
          style={{ opacity: labelOpacity, y: labelY }}
          className={`mt-4 text-sm leading-relaxed max-w-[280px] mx-auto ${stat.bodyClass}`}
        >
          {stat.description}
        </motion.p>
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div id="about">
      {/* Mobile — kinetic stats deck */}
      <section className="md:hidden">
        <div className="px-6 pt-20 pb-14 text-center">
          <p className="text-ink-muted text-[11px] tracking-[0.25em] uppercase mb-5">
            About bloom360
          </p>
          <h2 className="text-[clamp(2.5rem,10vw,3.5rem)] font-serif leading-[1.02] tracking-tight">
            Care that{" "}
            <em className="text-salmon">keeps</em>
            <br />
            you well,
            <br />
            not just better.
          </h2>
          <p className="mt-6 text-ink-muted text-[15px] leading-relaxed max-w-sm mx-auto">
            Bloom360 is proactive, relationship-based care led by a physician
            and backed by a full team. Here&apos;s what that means in numbers.
          </p>
        </div>

        <div className="flex flex-col">
          {STATS.map((stat, i) => (
            <StatPanel key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        <div className="bg-cream px-6 py-20 text-center">
          <p className="text-ink-muted text-[11px] tracking-[0.25em] uppercase mb-4">
            And most importantly
          </p>
          <p className="text-3xl font-serif leading-tight tracking-tight">
            Everything, <em className="text-salmon">coordinated.</em>
          </p>
        </div>
      </section>

      {/* Desktop — existing bento grid, unchanged */}
      <section className="hidden md:block py-24 md:py-40" ref={ref}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 lg:pr-[min(calc(38vw_+_5rem),38rem)]">
          <div className="grid md:grid-cols-2 gap-4">
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
                Care that{" "}
                <em className="text-salmon">keeps</em>
                <br />
                you well,
                <br />
                not just better.
              </h2>
              <p className="mt-6 text-ink-muted text-base leading-relaxed">
                Bloom360 is proactive, relationship-based care led by a physician
                and backed by a full team. We&apos;re focused on where your health
                is going, not just where it&apos;s been.
              </p>
            </motion.div>

            <PopIn className="rounded-3xl bg-salmon/[0.07] p-6 md:p-8 flex flex-col justify-end min-h-[220px]">
              <h3 className="text-xl md:text-2xl font-serif mb-3">
                One team. One plan.
              </h3>
              <p className="text-ink-muted leading-relaxed text-sm">
                Your doctor, dietitian, physical therapist, and care navigator
                work together on you. Nothing falls through the cracks.
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
    </div>
  );
}
