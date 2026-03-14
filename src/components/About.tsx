"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Shield, Smartphone } from "lucide-react";

const pillars = [
  {
    icon: Heart,
    title: "Relationship-First",
    description:
      "Every member is paired with a dedicated primary care physician who knows your history, goals, and life — not just your symptoms.",
  },
  {
    icon: Shield,
    title: "Prevention Over Reaction",
    description:
      "We prioritize keeping you well over treating you when you're sick. Proactive screenings, lifestyle guidance, and early intervention.",
  },
  {
    icon: Smartphone,
    title: "Technology-Enabled",
    description:
      "State-of-the-art telehealth that makes great care accessible from anywhere in the U.S. No waiting rooms. No barriers.",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-28 md:py-36 bg-warm-50" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-teal-600" />
              <span className="text-teal-600 text-sm font-medium tracking-widest uppercase">
                About bloom360
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Care designed for
              <br />
              <span className="text-teal-700">how you actually live.</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              bloom360 is a comprehensive preventive and primary care
              telemedicine practice. Our monthly membership gives you real
              access to a dedicated physician and an integrated care team —
              so you spend less time managing healthcare and more time
              living well.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              We believe the best care happens through lasting relationships,
              supported by technology that removes friction — not replaces the
              human connection.
            </p>
          </motion.div>

          <div className="space-y-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                    <pillar.icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-gray-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
