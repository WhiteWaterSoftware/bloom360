"use client";

import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { trackSignupClick } from "@/lib/signup";
import { useSignupUrl } from "@/lib/useSignupUrl";

function getTimeLeft() {
  const target = new Date("2026-06-01T00:00:00-04:00");
  const now = new Date();
  const diff = Math.max(0, target.getTime() - now.getTime());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Digit({ value }: { value: string }) {
  return (
    <span className="relative inline-flex justify-center w-[0.6em] h-[1.1em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[56px] h-[72px] md:w-[76px] md:h-[96px] lg:w-[88px] lg:h-[108px] rounded-xl md:rounded-2xl bg-cream/[0.08] border border-cream/[0.08] flex items-center justify-center overflow-hidden">
        <span className="text-2xl md:text-[2.5rem] lg:text-5xl font-serif tracking-tight leading-none text-cream">
          <Digit value={display[0]} />
          <Digit value={display[1]} />
        </span>
      </div>
      <span className="text-cream/25 text-[9px] md:text-[10px] tracking-[0.2em] uppercase mt-2 md:mt-3">
        {label}
      </span>
    </div>
  );
}

export default function CTA() {
  const signupUrl = useSignupUrl();
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

  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units: { value: number; label: string }[] = timeLeft
    ? [
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Min" },
        { value: timeLeft.seconds, label: "Sec" },
      ]
    : [];

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
            Live in Michigan June 2026. Expanding Fall 2026. Founding
            member spots are limited.
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 md:mt-12"
          >
            <p className="text-salmon-light/60 text-[11px] md:text-xs tracking-[0.2em] uppercase mb-4 md:mb-5">
              Launching June 1
            </p>
            <div className="inline-flex items-start gap-2.5 md:gap-3.5">
              {units.map((unit, i) => (
                <div key={unit.label} className="flex items-start gap-2.5 md:gap-3.5">
                  <CountdownUnit value={unit.value} label={unit.label} />
                  {i < units.length - 1 && (
                    <div className="flex flex-col items-center gap-1.5 md:gap-2 pt-5 md:pt-7 lg:pt-8">
                      <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-salmon-light/30" />
                      <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-salmon-light/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 md:mt-14 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <a
              href={signupUrl}
              onClick={() => trackSignupClick("footer_cta")}
              className="group inline-flex items-center justify-center gap-3 bg-cream text-ink px-8 py-4 md:px-10 md:py-5 rounded-full text-sm tracking-wide uppercase hover:bg-salmon-light hover:text-cream transition-colors duration-500"
            >
              Sign Up
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
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
