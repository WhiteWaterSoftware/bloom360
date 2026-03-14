"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-1">
            <Image
              src="/logo-white.svg"
              alt="bloom360"
              width={140}
              height={32}
              className="h-7 w-auto mb-4"
            />
            <p className="text-sm leading-relaxed text-gray-500">
              Tech-powered, physician-led preventive care built for the way
              you actually live.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
              Care
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Primary Care
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Nutrition
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Physical Therapy
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Reproductive Health
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/telehealth-consent" className="hover:text-white transition-colors">
                  Telehealth Consent
                </a>
              </li>
              <li>
                <a href="/nondiscrimination" className="hover:text-white transition-colors">
                  Nondiscrimination
                </a>
              </li>
              <li>
                <a href="/cancellation" className="hover:text-white transition-colors">
                  Cancellation Policy
                </a>
              </li>
              <li>
                <a href="/controlled-substances" className="hover:text-white transition-colors">
                  Controlled Substances
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} bloom360. All rights reserved.
          </p>
          <p className="text-xs text-gray-700">
            bloom360 provides telehealth services and is not a substitute for
            emergency care. If you are experiencing a medical emergency, call
            911.
          </p>
        </div>
      </div>
    </footer>
  );
}
