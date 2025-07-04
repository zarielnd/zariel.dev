"use client";
import React, { useRef, useEffect, useState, useMemo } from 'react';
import Hero from '../components/Hero';

const App = () => {
  return(
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Hero />
    </main>
  )
};

export default App;