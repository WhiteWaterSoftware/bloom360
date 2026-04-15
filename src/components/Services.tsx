"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    number: "01",
    title: "Primary Care",
    description:
      "Your dedicated physician leads everything. They know your history, manage your health holistically, and are there when you need them — not just when something breaks.",
    details: ["Annual wellness", "Chronic conditions", "Prescriptions", "Referrals"],
  },
  {
    number: "02",
    title: "Nutrition",
    description:
      "A registered dietitian who builds a plan around your actual life. Not a generic template. Something that lasts.",
    details: ["Meal guidance", "Metabolic health", "Weight goals", "Gut health"],
  },
  {
    number: "03",
    title: "Movement",
    description:
      "Physical therapy and movement coaching designed to keep you strong, prevent injury, and support the life you want to live.",
    details: ["Custom programs", "Injury prevention", "Rehab support", "Mobility"],
  },
  {
    number: "04",
    title: "Care Navigation",
    description:
      "Your care navigator ties everything together. They keep your team aligned, follow up between visits, and make sure nothing slips through.",
    details: ["Coordination", "Follow-through", "Member support", "Continuity"],
  },
];

// Per-card accent palette — each swipe feels like a different room
type Accent = {
  bg: string;
  eyebrow: string;
  title: string;
  body: string;
  pill: string;
  divider: string;
};

const ACCENTS: Accent[] = [
  {
    bg: "bg-cream",
    eyebrow: "text-salmon",
    title: "text-ink",
    body: "text-ink-muted",
    pill: "text-ink/50 border-ink/15",
    divider: "bg-salmon/40",
  },
  {
    bg: "bg-salmon",
    eyebrow: "text-cream/80",
    title: "text-cream",
    body: "text-cream/85",
    pill: "text-cream/80 border-cream/25",
    divider: "bg-cream/40",
  },
  {
    bg: "bg-forest-light",
    eyebrow: "text-salmon-light",
    title: "text-cream",
    body: "text-cream/70",
    pill: "text-cream/60 border-cream/15",
    divider: "bg-salmon-light/40",
  },
  {
    bg: "bg-ink",
    eyebrow: "text-salmon-light",
    title: "text-cream",
    body: "text-cream/65",
    pill: "text-cream/55 border-cream/15",
    divider: "bg-salmon-light/40",
  },
];

function MobileServiceCard({
  service,
  accent,
  index,
  cardRef,
}: {
  service: (typeof services)[number];
  accent: Accent;
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={cardRef}
      data-card-index={index}
      className={`snap-center flex-shrink-0 w-[85vw] max-w-[380px] rounded-[32px] p-8 min-h-[540px] flex flex-col justify-between shadow-[0_40px_80px_-40px_rgba(0,0,0,0.55)] ${accent.bg}`}
    >
      <div>
        <p
          className={`text-[11px] tracking-[0.25em] uppercase mb-6 font-mono ${accent.eyebrow}`}
        >
          {service.number} · of 04
        </p>
        <h3
          className={`font-serif leading-[0.95] tracking-[-0.02em] mb-6 ${accent.title}`}
          style={{ fontSize: "clamp(2.4rem, 9vw, 3rem)" }}
        >
          {service.title}
        </h3>
        <p className={`text-[15px] leading-relaxed ${accent.body}`}>
          {service.description}
        </p>
      </div>
      <div>
        <div className={`h-px w-12 mb-5 ${accent.divider}`} />
        <div className="flex flex-wrap gap-2">
          {service.details.map((d) => (
            <span
              key={d}
              className={`text-[11px] tracking-wide border rounded-full px-2.5 py-1 ${accent.pill}`}
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileServicesCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.55) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.cardIndex
            );
            if (!Number.isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { root: scroller, threshold: [0.55, 0.8] }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index];
    const scroller = scrollerRef.current;
    if (!card || !scroller) return;
    const containerWidth = scroller.offsetWidth;
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    scroller.scrollTo({
      left: cardCenter - containerWidth / 2,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        ref={scrollerRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex-shrink-0 w-6" aria-hidden />
        {services.map((service, i) => (
          <MobileServiceCard
            key={service.number}
            service={service}
            accent={ACCENTS[i]}
            index={i}
            cardRef={(el) => {
              cardRefs.current[i] = el;
            }}
          />
        ))}
        <div className="flex-shrink-0 w-6" aria-hidden />
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center items-center gap-2 mt-2">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            aria-label={`Go to service ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === i ? "w-8 bg-salmon-light" : "w-1.5 bg-cream/20"
            }`}
          />
        ))}
      </div>
    </>
  );
}

function DesktopServiceCard({ service }: { service: (typeof services)[number] }) {
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
          <h3 className="text-xl md:text-2xl font-serif">{service.title}</h3>
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
    <div id="services">
      {/* Mobile — swipeable carousel */}
      <section className="md:hidden bg-forest text-cream pt-24 pb-20">
        <div className="px-6 mb-10">
          <p className="text-cream/40 text-[11px] tracking-[0.25em] uppercase mb-5">
            Your Care Team
          </p>
          <h2
            className="font-serif leading-[1.02] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 10vw, 3.5rem)" }}
          >
            Your whole health,
            <br />
            <em className="text-salmon-light">one team.</em>
          </h2>
          <p className="mt-5 text-cream/55 text-[15px] leading-relaxed max-w-sm">
            We believe preventive care has to account for the whole person —
            not just what shows up on a lab report.
          </p>
          <p className="mt-8 text-cream/40 text-[10px] tracking-[0.25em] uppercase flex items-center gap-2">
            <span>Swipe to meet your team</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </p>
        </div>

        <MobileServicesCarousel />
      </section>

      {/* Desktop — existing sticky headline + stacked cards */}
      <section
        className="hidden md:block pt-40 md:pt-64 pb-24 md:pb-40 bg-forest text-cream"
        ref={ref}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 lg:pr-[min(calc(38vw_+_5rem),38rem)]">
          <div className="grid xl:grid-cols-[5fr_7fr] gap-12 xl:gap-16">
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

            <div className="flex flex-col gap-8">
              {services.map((service) => (
                <DesktopServiceCard key={service.number} service={service} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
