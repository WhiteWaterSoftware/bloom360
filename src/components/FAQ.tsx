"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    question: "Do you take insurance?",
    answer:
      "We don't bill insurance — and that's intentional. It lets us keep care simple, direct, and focused on you instead of what a payer approves. You're always welcome to use your insurance for anything outside of Bloom360 when you need it.",
  },
  {
    question: "Can I use my HSA or FSA?",
    answer:
      "In most cases, yes. Bloom360 memberships are typically HSA/FSA eligible. We recommend confirming with your plan administrator to be sure.",
  },
  {
    question: "What's included in the membership?",
    answer:
      "Your membership covers access to your full care team — primary care physician, registered dietitian, physical therapist, and care navigator. That includes scheduled video visits, messaging with your team, preventive screenings, and prescription management. No visit limits. No \"is this covered?\" anxiety.",
  },
  {
    question: "What's not included?",
    answer:
      "Bloom360 doesn't replace emergency care, hospital stays, in-person procedures, or specialist visits. When those come up, we help you figure out the right next step and make sure you're not navigating it alone.",
  },
  {
    question: "Who are the Bloom360 providers?",
    answer:
      "Licensed, board-certified clinicians who actually enjoy practicing medicine — and it shows. They work with smaller patient panels so they can spend real time with each person. The goal isn't one rushed visit a year. It's a relationship. We want to know you, your history, and what matters to you.",
  },
  {
    question: "How quickly can I see a provider?",
    answer:
      "Most members get a visit same day or next day. We don't overbook our providers — that's what makes it possible.",
  },
  {
    question: "Can Bloom360 prescribe medications?",
    answer:
      "Yes, when clinically appropriate. We can prescribe many common medications. Bloom360 does not prescribe controlled substances. If you have insurance, we send prescriptions to your pharmacy like any traditional doctor would. If you don't — or your copay is high — we'll help you find discounted cash-pay options so costs stay reasonable and transparent.",
  },
  {
    question: "What about labs and imaging?",
    answer:
      "We work with national labs like Quest and Labcorp to offer discounted cash-pay rates for Bloom360 members. For imaging, we'll help you find reputable local centers with transparent pricing. If you'd rather use your insurance, that's completely fine.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Bloom360 is month-to-month. All we ask for is 30 days' notice. No long-term contracts, no awkward phone calls, no pressure.",
  },
  {
    question: "Who is Bloom360 best for?",
    answer:
      "Bloom360 is a great fit if you want easier access to a doctor, value prevention, and want care that feels personal instead of transactional. If you're tired of rushed visits and confusing bills, you'll probably feel right at home.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  // For mobile accordion
  const [mobileOpen, setMobileOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-40" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 lg:pr-[min(calc(38vw_+_5rem),38rem)]">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-6">
          {/* Left — heading + questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-12 md:mb-16">
              <p className="text-ink-muted text-[13px] tracking-[0.2em] uppercase mb-6">
                FAQ
              </p>
              <h2 className="text-4xl md:text-5xl font-serif leading-[1.08] tracking-tight">
                The questions{" "}
                <em className="text-sage">you&apos;re thinking.</em>
              </h2>
            </div>

            <div>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border-t border-ink/10 last:border-b"
                >
                  {/* Desktop — hover to show answer */}
                  <div
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`hidden lg:flex items-center justify-between w-full py-5 cursor-default transition-colors duration-300 ${
                      activeIndex === i ? "text-ink" : "text-ink/40"
                    }`}
                  >
                    <span className="text-base font-serif">
                      {faq.question}
                    </span>
                    <span
                      className={`text-xs tracking-wide uppercase transition-opacity duration-300 ${
                        activeIndex === i ? "opacity-100 text-sage" : "opacity-0"
                      }`}
                    >
                      &rarr;
                    </span>
                  </div>

                  {/* Mobile — accordion */}
                  <div className="lg:hidden">
                    <button
                      onClick={() =>
                        setMobileOpen(mobileOpen === i ? null : i)
                      }
                      className="flex items-start justify-between w-full py-5 text-left group"
                    >
                      <span className="text-base font-serif pr-6 group-hover:text-sage transition-colors duration-300">
                        {faq.question}
                      </span>
                      <span
                        className="flex-shrink-0 mt-1 text-ink-muted text-lg leading-none transition-transform duration-300"
                        style={{
                          transform:
                            mobileOpen === i ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                      >
                        +
                      </span>
                    </button>
                    <AnimatePresence>
                      {mobileOpen === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="pb-5 text-ink-muted text-sm leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — answer panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <div className="hidden lg:block relative min-h-[560px] rounded-3xl bg-ink text-cream p-8 md:p-10 overflow-hidden">
              {/* Large watermark number */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={`num-${activeIndex}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 0.05, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -right-4 -bottom-8 text-[14rem] font-serif leading-none select-none pointer-events-none"
                >
                  {String(activeIndex + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="relative"
                >
                  <p className="text-cream/30 text-sm font-mono mb-4">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-xl md:text-2xl font-serif leading-tight mb-5">
                    {faqs[activeIndex].question}
                  </h3>
                  <div className="h-px w-12 bg-sage-light/40 mb-5" />
                  <p className="text-cream/60 text-sm md:text-base leading-relaxed">
                    {faqs[activeIndex].answer}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
