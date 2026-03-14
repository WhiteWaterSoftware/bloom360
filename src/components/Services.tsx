"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Stethoscope,
  Apple,
  Dumbbell,
  Baby,
} from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "Primary Care",
    description:
      "Your dedicated physician manages your overall health, coordinates care, and is available when you need them — not just when you're sick.",
    features: ["Annual wellness exams", "Chronic condition management", "Prescription management", "Specialist referrals"],
  },
  {
    icon: Apple,
    title: "Nutrition",
    description:
      "Work with a registered dietician to build sustainable eating habits that align with your health goals and lifestyle.",
    features: ["Personalized meal guidance", "Metabolic health", "Weight management", "Gut health optimization"],
  },
  {
    icon: Dumbbell,
    title: "Exercise & Physical Therapy",
    description:
      "Expert-guided movement programs designed to prevent injury, build strength, and support your body at every stage.",
    features: ["Custom exercise plans", "Injury prevention", "Rehabilitation support", "Mobility programs"],
  },
  {
    icon: Baby,
    title: "Reproductive Health",
    description:
      "Comprehensive reproductive health guidance from family planning to fertility support, all integrated with your primary care.",
    features: ["Family planning", "Fertility support", "Hormonal health", "Prenatal guidance"],
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-28 md:py-36 bg-white" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-teal-600" />
            <span className="text-teal-600 text-sm font-medium tracking-widest uppercase">
              Your Care Team
            </span>
            <div className="h-px w-12 bg-teal-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            One membership.
            <br />
            <span className="text-teal-700">Complete care.</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Every bloom360 member has access to a fully integrated care team,
            all working together around your health.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="group relative bg-sage-50 rounded-3xl p-10 hover:bg-teal-50 transition-colors duration-300 border border-transparent hover:border-teal-100"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:shadow-md transition-shadow">
                <service.icon className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
