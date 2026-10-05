"use client";
import { LeadProvider } from "@/components/site/Lead";
import Hero, { Nav } from "@/components/site/Hero";
import Directions from "@/components/site/Directions";
import Picker from "@/components/site/Picker";
import HowItWorks from "@/components/site/HowItWorks";
import Transformation from "@/components/site/Transformation";
import Breath from "@/components/site/Breath";
import Instructor from "@/components/site/Instructor";
import Pricing from "@/components/site/Pricing";
import Location from "@/components/site/Location";
import FAQ from "@/components/site/FAQ";
import Footer, { MobileBar } from "@/components/site/Footer";
import RevealObserver from "@/components/site/RevealObserver";

export default function Home() {
  return (
    <LeadProvider>
      <Nav />
      <main className="min-h-screen">
        <Hero />
        <Directions />
        <Transformation />
        <Picker />
        <Breath />
        <Instructor />
        <Pricing />
        <HowItWorks />
        <Location />
        <FAQ />
      </main>
      <Footer />
      <MobileBar />
      <RevealObserver />
    </LeadProvider>
  );
}
