"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="join" className="py-28 md:py-36 bg-white" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2rem] bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 p-12 md:p-20 overflow-hidden"
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-teal-600/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl" />

          <div className="relative max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Ready to put your
              <br />
              health first?
            </h2>
            <p className="mt-6 text-lg text-teal-100/80 leading-relaxed max-w-xl">
              Join bloom360 and get a care team that actually knows you. No
              waiting rooms, no runaround — just excellent, accessible
              medicine built around your life.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-teal-900 shadow-xl transition-all hover:bg-teal-50 hover:scale-[1.02] group"
              >
                Get Started Today
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10"
              >
                Contact Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
