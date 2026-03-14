"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { Stethoscope, UsersThree } from "@phosphor-icons/react";

function CountUp({ target, inView }: { target: number; inView: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      animate(count, target, { duration: 1.5, ease: "easeOut" });
    }
  }, [inView, count, target]);

  return <motion.span>{rounded}</motion.span>;
}
export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-40" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left column — large statement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <p className="text-ink-muted text-[13px] tracking-[0.2em] uppercase mb-6">
              About bloom360
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.05] tracking-tight">
              We built this for the people who{" "}
              <em className="text-sage">deserve better</em> than a waiting
              room.
            </h2>
          </motion.div>

          {/* Right column — details */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 lg:pt-16"
          >
            <div className="grid sm:grid-cols-2 gap-12">
              <div>
                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center mb-5">
                  <Stethoscope size={22} weight="duotone" className="text-sage" />
                </div>
                <p className="text-ink-light leading-relaxed">
                  bloom360 is a physician-led membership built for how people
                  actually live. Not episodic sick visits — ongoing,
                  relationship-based preventive care delivered entirely through
                  telehealth.
                </p>
              </div>

              <div>
                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center mb-5">
                  <UsersThree size={22} weight="duotone" className="text-sage" />
                </div>
                <p className="text-ink-light leading-relaxed">
                  Every member gets a dedicated primary care physician at the
                  center, supported by integrated programs in nutrition,
                  movement, and reproductive health. Technology makes it
                  accessible. Relationships make it stick.
                </p>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 pt-12 border-t border-ink/10">
              {[
                { number: 4, label: "Care disciplines" },
                { number: 1, label: "Dedicated physician" },
                { number: 50, label: "States via telehealth" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                >
                  <p className="text-4xl md:text-5xl font-serif text-sage">
                    <CountUp target={stat.number} inView={inView} />
                  </p>
                  <p className="mt-2 text-xs tracking-wide uppercase text-ink-muted">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
