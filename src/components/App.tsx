"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import KprFooter from "@/components/KprFooter";
import SmoothScroll from "@/hooks/SmoothScroll";

const App = () => {
  return (
    <>
      <SmoothScroll />
      <KprFooter />
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
        <div className="h-screen" aria-hidden="true" />
      </main>
    </>
  );
};

export default App;
