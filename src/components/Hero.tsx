"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden pb-16 md:pb-24 pt-32">
      {/* Background emblem */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <Image
          src="/emblem.svg"
          alt=""
          width={800}
          height={800}
          className="w-[700px] h-auto animate-float"
        />
      </motion.div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-ink-muted text-[13px] tracking-[0.2em] uppercase mb-6"
            >
              Physician-led preventive care
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[clamp(3rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.03em] font-serif"
            >
              Your health,{" "}
              <em className="text-sage">finally</em>
              <br />
              in good hands.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 text-ink-muted text-lg md:text-xl leading-relaxed max-w-xl"
            >
              One dedicated doctor. A full care team. Nutrition, movement,
              reproductive health — all coordinated, all virtual, all yours.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="lg:col-span-4 flex flex-col gap-4 lg:items-end"
          >
            <a
              href="#join"
              className="group inline-flex items-center gap-3 bg-ink text-cream px-8 py-4 rounded-full text-sm tracking-wide uppercase hover:bg-sage transition-colors duration-500"
            >
              Become a member
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <p className="text-ink-muted text-xs tracking-wide lg:text-right">
              Available across the U.S. via telehealth
            </p>
          </motion.div>
        </div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="mt-12 h-px bg-ink/10 origin-left"
        />

        {/* Bottom ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-6 flex items-center gap-12 text-[13px] text-ink-muted tracking-wide"
        >
          <span>Primary Care</span>
          <span className="text-ink/20">/</span>
          <span>Nutrition</span>
          <span className="text-ink/20">/</span>
          <span>Physical Therapy</span>
          <span className="text-ink/20">/</span>
          <span>Reproductive Health</span>
        </motion.div>
      </div>
    </section>
  );
}
