import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FloatingVideo from "@/components/FloatingVideo";
import Statement from "@/components/Statement";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Philosophy from "@/components/Philosophy";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative">
        <FloatingVideo />
        <Hero />
        <Statement />
        <Marquee />
        <About />
        <Services />
        <HowItWorks />
        <Philosophy />
        <Pricing />
        <FAQ />
      </div>
      <CTA />
      <Footer />
    </>
  );
}
