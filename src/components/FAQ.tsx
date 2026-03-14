"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What's included in a bloom360 membership?",
    answer:
      "Every membership includes a dedicated primary care physician, a registered dietician, an exercise coach, and a reproductive health adviser. You get unlimited messaging, scheduled telehealth visits, preventive screenings coordination, and prescription management.",
  },
  {
    question: "Is bloom360 available in my state?",
    answer:
      "bloom360 is a telehealth practice designed to serve patients across the United States. Our physicians are licensed in multiple states and we're continuously expanding our coverage. Contact us to confirm availability in your area.",
  },
  {
    question: "Does bloom360 replace my health insurance?",
    answer:
      "No. bloom360 is a membership-based primary care practice, not health insurance. Many members use bloom360 alongside their insurance for a more comprehensive, accessible care experience. We handle most primary care needs, which can reduce your out-of-pocket costs significantly.",
  },
  {
    question: "How do telehealth visits work?",
    answer:
      "Visits happen over secure video or phone, scheduled at times that work for you — including evenings and weekends. Your doctor can diagnose conditions, prescribe medications, order labs, and refer to specialists, all from the comfort of your home.",
  },
  {
    question: "Can I message my doctor between visits?",
    answer:
      "Absolutely. Unlimited messaging with your care team is a core part of the membership. Whether it's a quick question or a follow-up, your team is accessible through our secure platform.",
  },
  {
    question: "How is bloom360 different from other telehealth services?",
    answer:
      "Most telehealth services connect you with a random doctor for a one-off visit. bloom360 pairs you with a dedicated physician who leads a full care team — the same people, every time. We focus on prevention and building a lasting relationship, not just treating symptoms.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-6 text-left group"
      >
        <span className="text-lg font-semibold text-gray-900 group-hover:text-teal-700 transition-colors pr-8">
          {faq.question}
        </span>
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
          {isOpen ? (
            <Minus className="w-4 h-4 text-teal-600" />
          ) : (
            <Plus className="w-4 h-4 text-teal-600" />
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 leading-relaxed max-w-3xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 md:py-36 bg-warm-50" ref={ref}>
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-teal-600" />
            <span className="text-teal-600 text-sm font-medium tracking-widest uppercase">
              FAQ
            </span>
            <div className="h-px w-12 bg-teal-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Questions? <span className="text-teal-700">Answered.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
