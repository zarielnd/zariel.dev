"use client";
import React, { useRef, useEffect, useState, useMemo, use } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Navbar from '../components/Navbar';
import SmoothScroll from '../hooks/SmoothScroll';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';

const App = () => {
  SmoothScroll();
  return(
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      {/* <SmoothScroll /> */}
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
    </main>
  )
};

export default App;