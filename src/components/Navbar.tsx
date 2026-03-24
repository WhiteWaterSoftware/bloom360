"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useWaitlist } from "./WaitlistProvider";
import { useAccent } from "./AccentProvider";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const openWaitlist = useWaitlist();
  const accent = useAccent();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex h-20 items-center justify-between">
          <a href="#" className="flex items-center">
            <Image
              src={accent === "salmon" ? "/logo-salmon.svg" : "/logo.svg"}
              alt="bloom360"
              width={140}
              height={32}
              priority
              className="h-7 w-auto"
            />
          </a>

          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] tracking-wide uppercase text-ink-muted hover:text-ink transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={openWaitlist}
              className="text-[13px] tracking-wide uppercase bg-ink text-cream px-6 py-2.5 rounded-full hover:bg-ink-light transition-colors duration-300"
            >
              Join
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-ink"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream border-t border-cream-dark"
          >
            <div className="px-6 py-8 space-y-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm tracking-wide uppercase text-ink-muted hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setMobileOpen(false); openWaitlist(); }}
                className="block w-full text-center text-sm tracking-wide uppercase bg-ink text-cream px-6 py-3 rounded-full"
              >
                Join
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
