import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FloatingVideo from "@/components/FloatingVideo";
import About from "@/components/About";
import Services from "@/components/Services";
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
        <About />
        <Services />
        <HowItWorks />
        <Pricing />
        <FAQ />
      </div>
      <CTA />
      <Footer />
    </>
  );
}
