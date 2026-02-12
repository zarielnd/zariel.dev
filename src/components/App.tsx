"use client";
import Hero from "../components/Hero";
import About from "../components/About";
import Navbar from "../components/Navbar";
import SmoothScroll from "../hooks/SmoothScroll";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import KprFooter from "@/components/KprFooter";
import RemoveSplash from "./RemoveSplash";

const App = () => {
  return (
    <>
      <SmoothScroll />
      <RemoveSplash />
      <KprFooter />
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        {/* <SmoothScroll /> */}

        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
        <div className="h-screen" />
      </main>
    </>
  );
};

export default App;
