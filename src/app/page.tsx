"use client";
import Hero from '../components/Hero';
import About from '../components/About';
import Navbar from '../components/Navbar';
import SmoothScroll from '../hooks/SmoothScroll';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer'
import KprFooter from '@/components/KprFooter';

const App = () => {
  
  SmoothScroll();
  return(
    <div>
      <KprFooter/>
      <main className='relative min-h-screen w-screen overflow-x-hidden'>
      {/* <SmoothScroll /> */}
      
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer/>
      <div className="h-screen" />
    </main>
    </div>
  )
};

export default App;