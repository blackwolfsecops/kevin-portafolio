import { Footer } from "@/components/layout/Footer";
import { HudBackground } from "@/components/layout/HudBackground";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Technologies } from "@/components/sections/Technologies";

export default function Home() {
  return (
    <>
      <HudBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Technologies />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
