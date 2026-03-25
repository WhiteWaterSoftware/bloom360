"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera } from "@phosphor-icons/react";

const services = [
  {
    number: "01",
    title: "Primary Care",
    description:
      "Your dedicated physician leads everything. They know your history, manage your health holistically, and are there when you need them — not just when something breaks.",
    details: ["Annual wellness", "Chronic conditions", "Prescriptions", "Referrals"],
    imageLabel: "Doctor consultation",
  },
  {
    number: "02",
    title: "Nutrition",
    description:
      "A registered dietitian who builds a plan around your actual life. Not a generic template. Something that lasts.",
    details: ["Meal guidance", "Metabolic health", "Weight goals", "Gut health"],
    imageLabel: "Nutrition planning",
  },
  {
    number: "03",
    title: "Movement",
    description:
      "Physical therapy and movement coaching designed to keep you strong, prevent injury, and support the life you want to live.",
    details: ["Custom programs", "Injury prevention", "Rehab support", "Mobility"],
    imageLabel: "Physical therapy",
  },
  {
    number: "04",
    title: "Care Navigation",
    description:
      "Your care navigator ties everything together. They keep your team aligned, follow up between visits, and make sure nothing slips through.",
    details: ["Coordination", "Follow-through", "Member support", "Continuity"],
    imageLabel: "Care coordination",
  },
];

function ServiceCard({ service }: { service: typeof services[number] }) {
  return (
    <div className="rounded-3xl bg-[#1e1e1e] overflow-hidden">

      {/* Image placeholder */}
      <div className="relative flex flex-col items-center justify-center min-h-[240px] md:min-h-[300px] bg-cream/[0.02] text-cream/15 overflow-hidden">
        <span className="absolute -right-4 -bottom-8 text-[12rem] md:text-[16rem] font-serif leading-none text-cream/[0.03] select-none pointer-events-none">
          {service.number}
        </span>
        <Camera size={36} weight="duotone" className="relative z-10" />
        <span className="relative z-10 mt-2 text-xs tracking-wide uppercase">
          {service.imageLabel}
        </span>
      </div>

      {/* Content */}
      <div className="p-8 md:p-10">
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-sage-light/40 text-sm font-mono">
            {service.number}
          </span>
          <h3 className="text-2xl md:text-3xl font-serif">
            {service.title}
          </h3>
        </div>
        <p className="text-cream/50 leading-relaxed mb-6 max-w-lg">
          {service.description}
        </p>
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
    </div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="services" className="pt-40 md:pt-64 pb-24 md:pb-40 bg-ink text-cream" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — sticky headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 lg:sticky lg:top-1/2 lg:-translate-y-[40%] lg:self-start"
          >
            <p className="text-cream/40 text-[13px] tracking-[0.2em] uppercase mb-6">
              Your Care Team
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1] tracking-tight">
              Your whole health,
              <br />
              <em className="text-sage-light">one team.</em>
            </h2>
            <p className="mt-8 text-cream/50 text-lg leading-relaxed max-w-md">
              We believe preventive care has to account for the whole person —
              not just what shows up on a lab report. That means your nutrition,
              how you move, how you feel, and someone making sure it all stays
              connected.
            </p>
          </motion.div>

          {/* Right — scrolling cards */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {services.map((service, i) => (
              <ServiceCard key={service.number} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
