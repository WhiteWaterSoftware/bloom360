"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WaitlistModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setName("");
      setEmail("");
      setPhone("");
      setStatus("idle");
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-md bg-cream rounded-2xl p-8 md:p-10 shadow-xl"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-ink-muted hover:text-ink transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {status === "success" ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl mb-2">You&apos;re on the list</h3>
                <p className="text-ink-muted text-sm leading-relaxed">
                  We&apos;ll be in touch when bloom360 launches. Thank you for your interest.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-3xl mb-2">Join the waitlist</h3>
                <p className="text-ink-muted text-sm mb-8 leading-relaxed">
                  bloom360 is launching soon. Leave your details and be the first to know.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm text-ink-light">
                      Name <span className="text-warm">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-ink/10 bg-cream-dark px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60 outline-none transition-all focus:border-sage focus:ring-1 focus:ring-sage/30"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm text-ink-light">
                      Email <span className="text-warm">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-ink/10 bg-cream-dark px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60 outline-none transition-all focus:border-sage focus:ring-1 focus:ring-sage/30"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm text-ink-light">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border border-ink/10 bg-cream-dark px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60 outline-none transition-all focus:border-sage focus:ring-1 focus:ring-sage/30"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-600">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <p className="text-xs text-ink-muted leading-relaxed">
                    By joining, you agree to receive occasional messages from bloom360
                    about our launch and services. Message frequency varies. Reply STOP
                    to unsubscribe. Msg &amp; data rates may apply. Your mobile opt-in
                    data will not be shared with third parties. See our{" "}
                    <a href="/privacy" className="underline hover:text-ink">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="/terms" className="underline hover:text-ink">
                      Terms of Service
                    </a>
                    . For help, contact{" "}
                    <a href="mailto:care@bloom360.com" className="underline hover:text-ink">
                      care@bloom360.com
                    </a>
                    .
                  </p>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full mt-2 py-3.5 rounded-full bg-sage text-cream text-sm tracking-wide uppercase hover:bg-sage-dark transition-colors disabled:opacity-60"
                  >
                    {status === "submitting" ? "Joining..." : "Join the Waitlist"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
