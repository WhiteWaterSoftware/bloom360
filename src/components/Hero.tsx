"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useWaitlist } from "./WaitlistProvider";

export default function Hero() {
  const openWaitlist = useWaitlist();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const emblemY = useTransform(scrollYProgress, [0, 1], [0, 350]);
  const emblemScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-clip pt-32 md:pt-40 pb-24 md:pb-32"
    >
      {/* Background emblem */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ y: emblemY, scale: emblemScale }}
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <Image
          src="/emblem.svg"
          alt=""
          width={800}
          height={800}
          className="w-[700px] h-auto"
        />
      </motion.div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 lg:pr-[min(calc(38vw_+_5rem),38rem)] w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ y: contentY }}
          className="mb-12 md:mb-16"
        >
          <h1 className="text-[clamp(2.75rem,6.5vw,6.5rem)] leading-[0.95] tracking-[-0.03em] font-serif">
            Your health,{" "}
            <em className="text-sage">in full</em>{" "}
            bloom.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ y: contentY }}
          className="flex flex-col gap-8 max-w-xl"
        >
          <p className="text-ink-muted text-lg md:text-xl leading-relaxed">
            One membership. Your doctor, dietitian, physical therapist, and
            care navigator. All coordinated. All virtual. All yours.
          </p>
          <button
            onClick={openWaitlist}
            className="group inline-flex items-center gap-3 bg-ink text-cream px-8 py-4 rounded-full text-sm tracking-wide uppercase hover:bg-sage transition-colors duration-500 self-start"
          >
            Join the Waitlist
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
