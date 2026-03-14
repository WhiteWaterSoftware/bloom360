"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function PolicyLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="bloom360"
                width={130}
                height={30}
                className="h-6 w-auto"
              />
            </a>
            <a
              href="/"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-teal-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-6 lg:px-8 py-16 md:py-24">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            {title}
          </h1>
          <p className="mt-3 text-sm text-gray-500">{lastUpdated}</p>
        </header>

        <div className="prose prose-gray max-w-none prose-headings:tracking-tight prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900 prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline">
          {children}
        </div>
      </main>

      <footer className="border-t border-gray-100 py-8">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} bloom360. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</a>
            <a href="/nondiscrimination" className="hover:text-gray-600 transition-colors">Nondiscrimination</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
