"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";

type FAQItem = {
  question: string;
  answer: ReactNode;
};

type FAQSection = {
  title: string;
  shortTitle: string;
  questions: FAQItem[];
};

const faqSections: FAQSection[] = [
  {
    title: "About bloom360",
    shortTitle: "About",
    questions: [
      {
        question: "What is bloom360?",
        answer:
          "bloom360 is a 100% online primary care practice where prevention comes first. Led by a physician and supported by a full care team \u2014 including a dietitian and exercise coach \u2014 we give you 24/7 text access to your doctor, same-day refills, and same-week appointments.",
      },
      {
        question: "Who will be my doctor?",
        answer:
          "bloom360 is led by licensed physicians who are passionate about preventive, patient-centered care. You will always see your real doctor \u2014 not a chatbot, not a random provider. You can learn more about our care team on the About page.",
      },
      {
        question: "How is bloom360 different from traditional primary care?",
        answer:
          "Traditional primary care means insurance billing, copays, deductibles, and surprise bills. bloom360 is a flat monthly membership with no copays, ever. Traditional care has days-to-weeks wait times \u2014 we offer same day or next day. Traditional visits are rushed \u2014 yours are longer, because your doctor actually has time for you. You can message your care team directly and get a response within 24 hours. You get a dietitian-led nutrition program and physical therapist-led movement program included. And your Concierge Health Assistant handles care coordination for you.",
      },
      {
        question: "What is the difference between primary and preventive care?",
        answer:
          "Primary care is your first point of contact for health concerns \u2014 whether you\u2019re sick, managing a chronic condition, or just need a checkup. Preventive care is the proactive side of that: screenings, wellness visits, and health planning designed to catch problems early or prevent them altogether. Good news is that we do both!",
      },
      {
        question: "Is bloom360 fully virtual?",
        answer:
          "Yes \u2014 bloom360 is 100% virtual. Most primary care issues are completely manageable online. Remote care maximizes accessibility, increases efficiency, and lowers wait and turn around times. If something needs to be handled in person, we\u2019ll help you navigate where to go next.",
      },
      {
        question: "Who is bloom360 best for?",
        answer:
          "bloom360 is for people 16 and older who want more from their healthcare. Whether you\u2019re generally healthy and want to stay that way, managing a chronic condition, needing a simple prescription refill, focused on weight loss, or just tired of waiting forever to see a doctor who barely knows you \u2014 you\u2019ll fit right in here.",
      },
      {
        question: "Is bloom360 good for families?",
        answer:
          "Yes. bloom360 works well for individuals, couples, and families who want consistent care and a provider who actually knows them. Please see bundled family pricing.",
      },
      {
        question: "Where is bloom360 available?",
        answer:
          "We currently see patients in Michigan, but have plans to expand to California, Texas, Arizona, and New York within the next few months!",
      },
    ],
  },
  {
    title: "Membership & Pricing",
    shortTitle: "Pricing",
    questions: [
      {
        question: "How much does bloom360 cost?",
        answer: (
          <div>
            <table className="w-full text-sm border-collapse mb-4">
              <thead>
                <tr>
                  <th className="text-left pb-2 pr-3 text-cream/40 font-normal border-b border-cream/10">Plan</th>
                  <th className="text-left pb-2 pr-3 text-cream/40 font-normal border-b border-cream/10">Monthly</th>
                  <th className="text-left pb-2 text-cream/40 font-normal border-b border-cream/10">Annual</th>
                </tr>
              </thead>
              <tbody className="text-cream/60">
                <tr className="border-b border-cream/5"><td className="py-2 pr-3">Individual</td><td className="py-2 pr-3">$149/mo</td><td className="py-2">$1,490 (~$124/mo)</td></tr>
                <tr className="border-b border-cream/5"><td className="py-2 pr-3">Couple</td><td className="py-2 pr-3">$249/mo</td><td className="py-2">$2,490/yr (~$208/mo)</td></tr>
                <tr><td className="py-2 pr-3">Household Add-on</td><td className="py-2 pr-3">$100/mo</td><td className="py-2">$1,000/yr (~$83/mo)</td></tr>
              </tbody>
            </table>
            <p className="text-cream/60">And no copays, ever!</p>
          </div>
        ),
      },
      {
        question: "What\u2019s included in the membership?",
        answer: (
          <div>
            <p className="text-cream/60 mb-3">Your membership includes:</p>
            <ul className="list-disc list-inside space-y-1.5 text-cream/60">
              <li>Your Care Team: Your dedicated primary care physician, a dietitian-led nutrition program, a physical therapist-led movement program, and a Concierge Health Assistant to keep everything connected.</li>
              <li>Same or next day access to your provider, through video and secure messaging</li>
              <li>Chronic condition management</li>
              <li>Prescription management</li>
              <li>Discounted labs and imaging through our partner networks</li>
            </ul>
          </div>
        ),
      },
      {
        question: "What\u2019s not included?",
        answer:
          "bloom360 doesn\u2019t replace emergency care, hospital stays, in-person procedures, or specialist visits. If you\u2019re experiencing a medical emergency, always call 911 immediately. For everything else, your care team will help point you in the right direction. When those are needed, we help guide you to the right next step.",
      },
      {
        question: "Can I use my HSA or FSA?",
        answer:
          "Yes! bloom360 membership fees are HSA- and FSA-eligible. You can use your pre-tax health savings to cover your membership. We recommend confirming with your plan administrator.",
      },
      {
        question: "Can I cancel anytime?",
        answer:
          "Yes. Cancel anytime. You\u2019ll finish out your current billing period and won\u2019t be charged again after that. Note that the enrollment fee is non-refundable. No contracts, no awkward phone calls, no pressure.",
      },
      {
        question: "Can I enroll my child?",
        answer: "Yes, but only ages 16+.",
      },
      {
        question: "What if I need to add a partner or family member later?",
        answer:
          "You can upgrade your membership tier at any time. To upgrade your individual plan, visit your Account settings on www.bloom360.com.",
      },
    ],
  },
  {
    title: "Services & Care",
    shortTitle: "Services",
    questions: [
      {
        question: "What conditions can you help me with?",
        answer:
          "Almost any condition a normal PCP would see you for. From diabetes, hypertension, and weight loss, to thyroid disorders and anxiety, we are your one stop shop for all things primary care. Please see our exclusion list below.",
      },
      {
        question: "What happens if I need urgent or emergency care?",
        answer:
          "If you have a medical emergency, always call 911. For things like in-person exams, lab draws, or imaging, your bloom360 provider will guide you to the right place and follow up with you after.",
      },
      {
        question: "How quickly can I see a provider?",
        answer:
          "Same or next day! Whether through a video appointment or secure messaging, we\u2019re here for you. We don\u2019t overbook our providers, which makes this possible.",
      },
      {
        question: "Can I message anytime?",
        answer:
          "Yes \u2014 that\u2019s one of the biggest perks of membership. You can message your care team directly for quick questions, follow-ups, medication refills, or anything in between. No need to schedule a full appointment for every little thing. Your provider will respond within 24 hours.",
      },
      {
        question: "How do I message my doctor?",
        answer:
          "You can simply text your doctor at the number we provide OR you can login to the patient portal and message via the chat feature.",
      },
      {
        question: "Do you offer mental health services?",
        answer:
          "Your bloom360 physician can address mental health as part of your primary care \u2014 including screening, medication management for common conditions like anxiety and depression, and ongoing check-ins. If you need specialized therapy or psychiatric care beyond what primary care covers, we\u2019ll help coordinate a referral.",
      },
      {
        question: "How do I get a pap smear or other in-person tests?",
        answer:
          "For anything that requires a hands-on exam \u2014 like a pap smear, physical exam, or in-person procedure \u2014 your bloom360 team will help you find a trusted local clinic or specialist and coordinate the handoff. We stay in the loop and follow up with you after.",
      },
      {
        question: "Do you offer specialist referrals?",
        answer:
          "Absolutely. When your care requires a specialist, your bloom360 team will coordinate a referral and provide a warm handoff \u2014 including a summary of your history and relevant records. We stay in the loop to ensure your specialist care integrates smoothly with your overall treatment plan.",
      },
      {
        question: "Do you offer weight loss programs?",
        answer:
          "Yes and it\u2019s not a separate upsell. Weight management is built into your bloom360 membership. Your primary care physician handles the medical side, including evaluation and medication management if appropriate. Your dietitian builds a personalized nutrition plan, and your physical therapist designs a movement program that fits your life. This is not an add-on. It\u2019s just good preventive and primary care.",
      },
      {
        question:
          "Can bloom360 prescribe ADHD medication, anxiety medication, or pain medication?",
        answer:
          "bloom360 does not prescribe controlled substances, including stimulants (like Adderall), benzodiazepines (like Xanax), or opioid pain medications. This is standard for telehealth-first primary care practices. If you need these medications, your bloom360 physician can screen you, provide a clinical summary, and coordinate a referral to a psychiatrist or specialist who can prescribe and manage them. We stay in the loop to make sure your care is connected.",
      },
    ],
  },
  {
    title: "Labs, Imaging & Prescriptions",
    shortTitle: "Labs & Rx",
    questions: [
      {
        question: "What do I do if I need labs?",
        answer:
          "We handle the order and walk you through it. We work with several labs around you, which accept most major insurance plans. If you don\u2019t have insurance, these facilities offer discounted cash-pay rates for bloom360 members.",
      },
      {
        question: "What do I do if I need imaging?",
        answer:
          "We handle the order and walk you through it. We work with several imaging centers around you, which accept most major insurance plans. If you don\u2019t have insurance, these facilities offer discounted cash-pay rates for bloom360 members.",
      },
      {
        question: "Can bloom360 prescribe medications?",
        answer:
          "Yes. We handle prescriptions just like any other primary care doctor. Tell us your preferred pharmacy and we\u2019ll send it electronically. bloom360 does not prescribe controlled substances.",
      },
      {
        question: "How do I pay for my meds?",
        answer:
          "If you have insurance, we\u2019ll send prescriptions to your pharmacy just like a traditional doctor. If you don\u2019t have insurance \u2014 or your copay is high \u2014 we\u2019ll help you find discounted cash-pay options using pharmacy coupons and savings programs. The goal is always to keep costs reasonable and transparent.",
      },
      {
        question:
          "What if I need prior authorization for medication or imaging?",
        answer:
          "We handle prior authorizations. If your insurance requires approval before covering a medication or imaging study, our team will take care of that process for you.",
      },
      {
        question:
          "Will my care team help me choose the most affordable option?",
        answer:
          "Yes \u2014 and we actually take the time to do that. We\u2019ll talk through insurance versus cash-pay options, estimated costs when available, and turnaround time so you\u2019re never guessing or surprised later.",
      },
      {
        question: "Do you make money on labs, imaging, or prescriptions?",
        answer:
          "No. We\u2019re embarrassed on behalf of the medical industry to have to even answer this.",
      },
    ],
  },
  {
    title: "Getting Started",
    shortTitle: "Getting Started",
    questions: [
      {
        question: "What happens during my first visit?",
        answer:
          "Your first visit is a real conversation. Your provider gets to know your health history, current concerns, medications, lifestyle, and goals. From there, we build a personalized care plan that may include a diet program, an exercise program, preventive screenings, lab orders, and follow-up scheduling tailored to you. This isn\u2019t a rushed encounter. It\u2019s the start of an actual relationship.",
      },
      {
        question: "Can I transfer my medical records to bloom360?",
        answer:
          "Yes. Our team will work with you to gather health records from previous providers.",
      },
      {
        question: "How quickly can I get an appointment?",
        answer:
          "You can get an appointment the same or next day. Our physicians keep smaller patient panels, which means real availability when you actually need it.",
      },
    ],
  },
  {
    title: "Insurance & Billing",
    shortTitle: "Insurance",
    questions: [
      {
        question: "How do I pay to be a bloom360 patient?",
        answer:
          "Membership is billed monthly or annually to the card on file. We accept all major credit and debit cards and HSA/FSA cards. It\u2019s automatic \u2014 no invoices, no billing department, no surprises.",
      },
      {
        question: "Why don\u2019t you take insurance?",
        answer:
          "Because dropping insurance is what makes everything else possible. No insurance means we can focus on providing the care you need, not the care that gets us paid. It also means smaller patient panels, faster access, and a doctor who spends their time on you instead of paperwork. That\u2019s why you can get in the same or next day and your visits aren\u2019t rushed.",
      },
      {
        question: "Why should I pay for this on top of my family\u2019s insurance?",
        answer:
          "Insurance was never designed to keep you healthy. It was designed to cover you when something goes wrong. And even then, you\u2019re still meeting deductibles, paying copays, and waiting three weeks for a 10-minute visit with a doctor who has 2,000 other patients. bloom360 is different. Same or next-day access. Longer visits. A doctor who actually knows you. No copays, no deductibles, no wondering if this question is worth a $40 fee. You just ask. You show up. You get taken care of. Your insurance still handles what it\u2019s supposed to \u2014 hospitals, specialists, emergencies. bloom360 handles your everyday health, the way it should have always been handled.",
      },
      {
        question:
          "Why should I do this if I already have Medicaid and no copay?",
        answer:
          "No copay is a real benefit. But access is about more than cost. Many Medicaid patients still face long wait times, difficulty finding a provider who is actually accepting patients, and appointments that feel rushed the moment they start. bloom360 gives you same or next day access, longer visits, a doctor who knows you, and a full care team including a dietitian, physical therapist, and Concierge Health Assistant. If that kind of attention matters to you, it\u2019s worth it.",
      },
      {
        question: "Do I still need health insurance if I join bloom360?",
        answer:
          "We strongly recommend it. bloom360 is not meant to replace health insurance. We cover your preventive and primary care, but insurance can still be valuable for labs and prescriptions, hospital visits, surgeries, specialist care, and emergencies.",
      },
      {
        question: "Are labs and imaging included in my membership fee?",
        answer:
          "Labs and imaging are not included in your membership fee, although you can still use your insurance or take advantage of discounted cash-pay rates with our labs and imaging partners.",
      },
      {
        question: "Do you offer discounts or promotional pricing?",
        answer:
          "We offer discounted annual plans that save you roughly two months of membership fees compared to monthly billing.",
      },
    ],
  },
  {
    title: "Tech",
    shortTitle: "Tech",
    questions: [
      {
        question: "Is my information private and secure?",
        answer:
          "Yes. All bloom360 visits run on a HIPAA-compliant platform. Your conversations, records, and health information are encrypted and accessible only to your care team. We don\u2019t share your data with third parties.",
      },
      {
        question:
          "What type of technology is required? Can I use my smartphone?",
        answer:
          "All you need is a smartphone, tablet, or computer with a camera and internet connection. No special equipment or downloads required.",
      },
    ],
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeSection, setActiveSection] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [mobileOpen, setMobileOpen] = useState<number | null>(null);

  const currentQuestions = faqSections[activeSection].questions;

  return (
    <section id="faq" className="py-24 md:py-40" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 lg:pr-[min(calc(38vw_+_5rem),38rem)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10 md:mb-14"
        >
          <p className="text-ink-muted text-[13px] tracking-[0.2em] uppercase mb-6">
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-serif leading-[1.08] tracking-tight">
            The questions{" "}
            <em className="text-salmon">you&apos;re thinking.</em>
          </h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10 md:mb-14"
        >
          {faqSections.map((section, i) => (
            <button
              key={section.title}
              onClick={() => {
                setActiveSection(i);
                setActiveQuestion(0);
                setMobileOpen(null);
              }}
              className={`px-4 py-2 rounded-full text-sm tracking-wide transition-all duration-300 ${
                activeSection === i
                  ? "bg-salmon text-cream"
                  : "bg-ink/[0.05] text-ink-muted hover:text-ink hover:bg-ink/[0.08]"
              }`}
            >
              <span className="hidden sm:inline">{section.title}</span>
              <span className="sm:hidden">{section.shortTitle}</span>
            </button>
          ))}
        </motion.div>

        {/* Questions + answer panel */}
        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-6">
          {/* Left — questions list */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {currentQuestions.map((faq, i) => (
                  <div
                    key={i}
                    className="border-t border-ink/10 last:border-b"
                  >
                    {/* Desktop — hover to show answer */}
                    <div
                      onMouseEnter={() => setActiveQuestion(i)}
                      className={`hidden lg:flex items-center justify-between w-full py-5 cursor-default transition-colors duration-300 ${
                        activeQuestion === i ? "text-ink" : "text-ink/40"
                      }`}
                    >
                      <span className="text-base font-serif">
                        {faq.question}
                      </span>
                      <span
                        className={`text-xs tracking-wide uppercase transition-opacity duration-300 ${
                          activeQuestion === i
                            ? "opacity-100 text-salmon"
                            : "opacity-0"
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
                        <span className="text-base font-serif pr-6 group-hover:text-salmon transition-colors duration-300">
                          {faq.question}
                        </span>
                        <span
                          className="flex-shrink-0 mt-1 text-ink-muted text-lg leading-none transition-transform duration-300"
                          style={{
                            transform:
                              mobileOpen === i
                                ? "rotate(45deg)"
                                : "rotate(0deg)",
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
                            <div className="pb-5 text-ink-muted text-sm leading-relaxed">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — answer panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <div className="hidden lg:block relative min-h-[670px] rounded-3xl bg-ink text-cream p-8 md:p-10 overflow-hidden">
              {/* Large watermark number */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={`num-${activeSection}-${activeQuestion}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 0.05, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -right-4 -bottom-8 text-[14rem] font-serif leading-none select-none pointer-events-none"
                >
                  {String(activeQuestion + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeSection}-${activeQuestion}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="relative"
                >
                  <p className="text-cream/30 text-sm font-mono mb-4">
                    {String(activeQuestion + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-xl md:text-2xl font-serif leading-tight mb-5">
                    {currentQuestions[activeQuestion]?.question}
                  </h3>
                  <div className="h-px w-12 bg-salmon-light/40 mb-5" />
                  <div className="text-cream/60 text-sm md:text-base leading-relaxed">
                    {currentQuestions[activeQuestion]?.answer}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
