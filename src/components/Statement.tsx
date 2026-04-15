"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Statement() {
  // Desktop — subtle scroll-driven fade, existing behavior
  const desktopRef = useRef(null);
  const { scrollYProgress: desktopProgress } = useScroll({
    target: desktopRef,
    offset: ["start end", "end start"],
  });
  const line1Opacity = useTransform(desktopProgress, [0.15, 0.35], [0, 1]);
  const line1Y = useTransform(desktopProgress, [0.15, 0.35], [30, 0]);
  const line2Opacity = useTransform(desktopProgress, [0.3, 0.5], [0, 1]);
  const line2Y = useTransform(desktopProgress, [0.3, 0.5], [50, 0]);
  const line2Scale = useTransform(desktopProgress, [0.3, 0.5], [0.92, 1]);

  // Mobile — scroll-pinned dramatic sequence. The section is 180vh tall;
  // a sticky full-screen child stays pinned while the user scrolls through,
  // driving the animation beats off the section's scroll progress.
  const mobileRef = useRef(null);
  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileRef,
    offset: ["start start", "end end"],
  });

  // Act 1: setup line fades in (0 → 0.15), holds, fades down as climax builds
  const mLine1Opacity = useTransform(
    mobileProgress,
    [0, 0.12, 0.48, 0.68, 1],
    [0, 1, 1, 0.3, 0]
  );
  const mLine1Y = useTransform(mobileProgress, [0, 0.12], [24, 0]);

  // Act 2: "We" fades in
  const mWeOpacity = useTransform(
    mobileProgress,
    [0.15, 0.3, 0.88, 1],
    [0, 1, 1, 0]
  );
  const mWeY = useTransform(mobileProgress, [0.15, 0.3], [40, 0]);

  // Act 3: "don't." explodes in with an overshoot, holds, releases
  const mDontOpacity = useTransform(
    mobileProgress,
    [0.28, 0.48, 0.92, 1],
    [0, 1, 1, 0]
  );
  const mDontScale = useTransform(
    mobileProgress,
    [0.28, 0.48, 0.6, 0.92],
    [0.45, 1.12, 1.0, 1.0]
  );
  const mDontY = useTransform(mobileProgress, [0.28, 0.48], [60, 0]);

  // Emblem pulse behind the climax
  const mEmblemOpacity = useTransform(
    mobileProgress,
    [0.38, 0.58, 0.85, 1],
    [0, 0.08, 0.08, 0]
  );
  const mEmblemScale = useTransform(
    mobileProgress,
    [0.38, 0.65],
    [0.6, 1.15]
  );

  return (
    <>
      {/* Mobile — scroll-pinned sequence */}
      <section
        ref={mobileRef}
        className="md:hidden relative z-20"
        style={{ height: "180vh" }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Cream gradient wash so the climax reads clean */}
          <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-cream/95 to-cream pointer-events-none" />

          {/* Pulsing emblem behind the climax */}
          <motion.div
            style={{ opacity: mEmblemOpacity, scale: mEmblemScale }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden
          >
            <div className="w-[110vw] h-[110vw] rounded-full bg-salmon blur-3xl" />
          </motion.div>

          <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
            <motion.p
              style={{ opacity: mLine1Opacity, y: mLine1Y }}
              className="text-ink/55 text-lg leading-snug tracking-tight max-w-[280px] mb-14"
            >
              Most care waits for something to go wrong.
            </motion.p>

            <div className="relative flex flex-col items-center leading-[0.85]">
              <motion.span
                style={{ opacity: mWeOpacity, y: mWeY }}
                className="font-serif text-6xl text-ink tracking-tight block"
              >
                We
              </motion.span>
              <motion.em
                style={{
                  opacity: mDontOpacity,
                  scale: mDontScale,
                  y: mDontY,
                }}
                className="font-serif italic text-[clamp(7rem,30vw,12rem)] text-salmon origin-center block"
              >
                don&apos;t.
              </motion.em>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop — existing subtle scroll fade */}
      <section
        ref={desktopRef}
        className="hidden md:flex relative z-20 pt-16 pb-28 md:pb-40 items-center justify-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/80 to-cream pointer-events-none" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 lg:pr-[min(calc(38vw_+_5rem),38rem)] text-center">
          <motion.p
            style={{ opacity: line1Opacity, y: line1Y }}
            className="text-ink/50 text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-tight"
          >
            Most care waits for something to go wrong.
          </motion.p>
          <motion.p
            style={{ opacity: line2Opacity, y: line2Y, scale: line2Scale }}
            className="mt-4 md:mt-6 text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight"
          >
            We <em className="text-salmon">don&apos;t.</em>
          </motion.p>
        </div>
      </section>
    </>
  );
}
