"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

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

function CountdownUnit({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[72px] h-[92px] md:w-[100px] md:h-[124px] lg:w-[120px] lg:h-[148px] rounded-2xl md:rounded-3xl bg-ink text-cream flex items-center justify-center shadow-lg shadow-ink/10 overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 h-px bg-cream/[0.06]" />
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-cream/[0.03] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-cream/[0.03] to-transparent" />
        <span className="text-[2rem] md:text-[3.25rem] lg:text-[3.75rem] font-serif tracking-tight leading-none">
          <Digit value={display[0]} />
          <Digit value={display[1]} />
        </span>
      </div>
      <span className="text-ink/35 text-[10px] md:text-[11px] tracking-[0.2em] uppercase mt-3 md:mt-4">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <div className="flex flex-col items-center justify-center gap-2.5 md:gap-3 pt-4 md:pt-6 lg:pt-8">
      <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-salmon/50" />
      <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-salmon/50" />
    </div>
  );
}

export default function Statement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.3], [40, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.96, 1]);

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units: { value: number; label: string }[] = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <section
      ref={ref}
      className="relative z-20 pt-16 pb-28 md:pb-40 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/80 to-cream pointer-events-none" />

      <motion.div
        style={{ opacity, y, scale }}
        className="relative mx-auto max-w-[1400px] px-6 lg:px-10 lg:pr-[min(calc(38vw_+_5rem),38rem)] text-center"
      >
        <p className="text-salmon text-[13px] md:text-sm tracking-[0.2em] uppercase mb-3">
          Day One
        </p>
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-tight mb-10 md:mb-14">
          June 1, 2026
        </h2>

        <div className="inline-flex items-start gap-3 md:gap-4 lg:gap-5">
          {units.map((unit, i) => (
            <div key={unit.label} className="contents">
              <CountdownUnit value={unit.value} label={unit.label} />
              {i < units.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
