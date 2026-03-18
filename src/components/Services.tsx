"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    number: "01",
    title: "Primary Care",
    description:
      "Your dedicated physician knows everything. They know your history, manage your health holistically, and are there when you need them — not just when something breaks.",
    details: ["Annual wellness", "Chronic conditions", "Prescriptions", "Referrals"],
  },
  {
    number: "02",
    title: "Nutrition",
    description:
      "A registered dietitian who builds a plan around your actual life — not a generic template. Something that lasts.",
    details: ["Meal guidance", "Metabolic health", "Weight goals", "Gut health"],
  },
  {
    number: "03",
    title: "Movement",
    description:
      "Physical therapist-led exercise and movement coaching designed to keep you strong, prevent injury, and support the life you want to live.",
    details: ["Custom programs", "Injury prevention", "Rehab support", "Mobility"],
  },
  {
    number: "04",
    title: "Care Navigation",
    description:
      "Your care navigator ties everything together. They keep your team aligned, follow up between visits, and make sure nothing slips through.",
    details: ["Member support", "Continuity", "Care coordination", "Follow-ups"],
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="services" className="py-24 md:py-40 bg-ink text-cream" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20 md:mb-28"
        >
          <p className="text-cream/40 text-[13px] tracking-[0.2em] uppercase mb-6">
            Your Care Team
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1] tracking-tight max-w-3xl">
            Four disciplines.
            <br />
            <em className="text-sage-light">One team.</em>
          </h2>
        </motion.div>

        <div className="space-y-0">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="group grid md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-14 border-t border-cream/10 hover:border-cream/20 transition-colors duration-500"
            >
              <div className="md:col-span-1">
                <span className="text-cream/20 text-sm tracking-wide font-mono">
                  {service.number}
                </span>
              </div>

              <div className="md:col-span-3">
                <h3 className="text-2xl md:text-3xl font-serif group-hover:text-sage-light transition-colors duration-500">
                  {service.title}
                </h3>
              </div>

              <div className="md:col-span-5">
                <p className="text-cream/60 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="md:col-span-3">
                <div className="flex flex-wrap gap-2">
                  {service.details.map((d) => (
                    <span
                      key={d}
                      className="text-xs tracking-wide text-cream/30 border border-cream/10 rounded-full px-3 py-1.5"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
