"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useWaitlist } from "./WaitlistProvider";
import { Camera } from "@phosphor-icons/react";

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
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const tickerY = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-clip pt-32 md:pt-40 pb-16 md:pb-24"
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

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 w-full">
        {/* Full-width headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ y: contentY }}
          className="mb-16 md:mb-20"
        >
          <h1 className="text-[clamp(3.5rem,10vw,9rem)] leading-[0.88] tracking-[-0.04em] font-serif">
            Your health,{" "}
            <em className="text-sage">in full</em>{" "}
            bloom.
          </h1>
        </motion.div>

        {/* Two-column area below */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left — supporting text + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{ y: contentY }}
            className="lg:col-span-4 flex flex-col gap-8"
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

          {/* Right — image */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            style={{ y: imageY }}
            className="lg:col-span-8 relative z-10 rounded-3xl bg-[#e8e4dd] overflow-hidden flex flex-col items-center justify-center min-h-[400px] md:min-h-[550px] lg:min-h-[650px] lg:-mt-32"
          >
            <Camera size={48} weight="duotone" className="text-ink/15" />
            <span className="mt-3 text-xs tracking-wide uppercase text-ink/15">
              Hero image
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
