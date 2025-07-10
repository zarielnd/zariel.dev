"use client";
import React, { useRef, useEffect, useState, useMemo, use } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Navbar from '../components/Navbar';
import SmoothScroll from '../hooks/SmoothScroll';

const App = () => {
  SmoothScroll();
  return(
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      {/* <SmoothScroll /> */}
      <Navbar />
      <Hero />
      <About />
    </main>
  )
};

export default App;