"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
    <div className="relative rounded-3xl bg-forest-light overflow-hidden p-6 md:p-8">
      <span className="absolute -right-4 -bottom-10 text-[10rem] font-serif leading-none text-cream/[0.03] select-none pointer-events-none">
        {service.number}
      </span>
      <div className="relative">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-salmon-light/40 text-xs font-mono">
            {service.number}
          </span>
          <h3 className="text-xl md:text-2xl font-serif">
            {service.title}
          </h3>
        </div>
        <p className="text-cream/50 leading-relaxed text-sm mb-5 max-w-lg">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {service.details.map((d) => (
            <span
              key={d}
              className="text-[11px] tracking-wide text-cream/30 border border-cream/10 rounded-full px-2.5 py-1"
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
    <section id="services" className="pt-40 md:pt-64 pb-24 md:pb-40 bg-forest text-cream" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 lg:pr-[min(calc(38vw_+_5rem),38rem)]">
        <div className="grid xl:grid-cols-[5fr_7fr] gap-12 xl:gap-16">
          {/* Left — sticky headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="xl:sticky xl:top-1/2 xl:-translate-y-[40%] xl:self-start"
          >
            <p className="text-cream/40 text-[13px] tracking-[0.2em] uppercase mb-6">
              Your Care Team
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1] tracking-tight">
              Your whole health,
              <br />
              <em className="text-salmon-light">one team.</em>
            </h2>
            <p className="mt-8 text-cream/50 text-lg leading-relaxed max-w-md">
              We believe preventive care has to account for the whole person —
              not just what shows up on a lab report. That means your nutrition,
              how you move, how you feel, and someone making sure it all stays
              connected.
            </p>
          </motion.div>

          {/* Right — scrolling cards */}
          <div className="flex flex-col gap-8">
            {services.map((service, i) => (
              <ServiceCard key={service.number} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
