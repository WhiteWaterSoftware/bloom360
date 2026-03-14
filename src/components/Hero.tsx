"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-teal-950">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-950 via-teal-900 to-teal-800" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-teal-600/10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-teal-400/8 blur-3xl" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-teal-400/60" />
              <span className="text-teal-300 text-sm font-medium tracking-widest uppercase">
                Preventive Care Membership
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-white leading-[1.08] tracking-tight"
          >
            Healthcare that
            <br />
            <span className="text-teal-300">meets you</span>
            <br />
            where you are.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 text-lg md:text-xl text-teal-100/80 leading-relaxed max-w-2xl"
          >
            A physician-led membership that puts prevention first. Your
            dedicated doctor, nutritionist, exercise coach, and reproductive
            health adviser — all accessible from wherever you are.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#join"
              className="inline-flex items-center justify-center rounded-full bg-teal-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-teal-500/25 transition-all hover:bg-teal-400 hover:shadow-teal-500/40 hover:scale-[1.02]"
            >
              Become a Member
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10"
            >
              Learn More
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 flex items-center gap-8 text-teal-200/60 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-400" />
              Telehealth Nationwide
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-400" />
              Physician-Led
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-400" />
              Monthly Membership
            </div>
          </motion.div>
        </div>

        {/* Floating emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.06, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute -right-20 top-1/2 -translate-y-1/2 hidden lg:block"
        >
          <Image
            src="/emblem-white.svg"
            alt=""
            width={600}
            height={600}
            className="w-[500px] h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}
