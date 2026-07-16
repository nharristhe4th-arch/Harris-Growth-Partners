import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { IntroOverlay } from "@/components/IntroOverlay";

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <Header />
      <main>
        <Hero />
        <Problem />
        <Services />
        <HowItWorks />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
