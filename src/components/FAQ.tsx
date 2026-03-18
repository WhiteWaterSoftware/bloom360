"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    question: "What does a bloom360 membership include?",
    answer:
      "A dedicated primary care physician, registered dietitian, exercise coach, and care navigator. Unlimited messaging, scheduled video visits, preventive screenings, and prescription management — all included in your monthly fee.",
  },
  {
    question: "Is this available in my state?",
    answer:
      "bloom360 serves patients across the U.S. via telehealth. Our physicians are licensed in multiple states and we're continuously expanding. Reach out and we'll confirm availability for you.",
  },
  {
    question: "Does this replace my insurance?",
    answer:
      "No. bloom360 is a membership-based primary care practice, not insurance. Most members use it alongside their plan for a more comprehensive, accessible experience. It can meaningfully reduce your out-of-pocket primary care costs.",
  },
  {
    question: "How do telehealth visits work?",
    answer:
      "Secure video or phone, scheduled when it works for you — including evenings and weekends. Your doctor can diagnose, prescribe, order labs, and refer to specialists. No waiting rooms.",
  },
  {
    question: "Can I message my doctor between visits?",
    answer:
      "Yes, unlimited messaging with your care team is core to the membership. Quick questions, follow-ups, whatever you need — your team is there.",
  },
  {
    question: "How is this different from other telehealth?",
    answer:
      "Most telehealth is a random doctor for a one-off visit. bloom360 pairs you with a dedicated physician who leads a full care team — the same people, every time. We focus on prevention and building a lasting relationship.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-40" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
          >
            <p className="text-ink-muted text-[13px] tracking-[0.2em] uppercase mb-6">
              FAQ
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-[1.08] tracking-tight">
              The questions
              <br />
              <em className="text-sage">you&apos;re thinking.</em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 lg:col-start-6"
          >
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border-t border-ink/10 last:border-b"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                  className="flex items-start justify-between w-full py-6 text-left group"
                >
                  <span className="text-lg font-serif pr-8 group-hover:text-sage transition-colors duration-300">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 mt-1 text-ink-muted text-xl leading-none transition-transform duration-300"
                    style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-ink-muted leading-relaxed max-w-lg">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
