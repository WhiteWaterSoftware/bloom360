"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { SIGNUP_URL, trackSignupClick } from "@/lib/signup";
import MobileVideo from "./MobileVideo";

export default function Hero() {
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
      className="relative overflow-x-clip pt-28 md:pt-40 pb-20 md:pb-32"
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
          className="mb-8 md:mb-16"
        >
          <h1 className="text-[clamp(3rem,9.5vw,8.5rem)] leading-[0.92] tracking-[-0.035em] font-serif">
            Your health,{" "}
            <em className="text-salmon">in full</em>{" "}
            bloom.
          </h1>
        </motion.div>

        {/* Inline mobile/tablet video — the visual anchor on phones. Hidden
            on lg+ where FloatingVideo takes over. */}
        <div className="mb-10 lg:hidden">
          <MobileVideo />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ y: contentY }}
          className="flex flex-col gap-7 md:gap-8 max-w-xl"
        >
          <p className="text-ink-muted text-base md:text-xl leading-relaxed">
            bloom360 combines primary care, nutrition, and movement with 24/7
            access to help you stay ahead of your health &mdash; with no
            insurance needed.
          </p>
          <a
            href={SIGNUP_URL}
            onClick={() => trackSignupClick("hero")}
            className="group inline-flex items-center gap-3 bg-ink text-cream px-7 py-3.5 md:px-8 md:py-4 rounded-full text-sm tracking-wide uppercase hover:bg-salmon transition-colors duration-500 self-start"
          >
            Sign Up
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
