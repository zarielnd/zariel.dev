import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';

export default function ExperienceTimeline() {
  const component = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const [isGsapReady, setIsGsapReady] = useState(false);

  // --- Experience Data ---
  const experienceData = [
    {
      id: 1,
      company: 'Innovate Inc.',
      role: 'Lead Frontend Developer',
      period: '2022 - Present',
      description: 'Leading the development of cutting-edge web applications using React, Next.js, and modern frontend technologies.',
    },
    {
      id: 2,
      company: 'Creative Solutions',
      role: 'UI/UX Designer',
      period: '2020 - 2022',
      description: 'Designed intuitive and engaging user interfaces for various clients, focusing on user-centered design principles.',
    },
    {
      id: 3,
      company: 'Tech Startup LLC',
      role: 'Junior Developer',
      period: '2019 - 2020',
      description: 'Contributed to the development of a new SaaS platform, gaining valuable experience in full-stack development.',
    },
    {
      id: 4,
      company: 'Web Agency Co.',
      role: 'Intern',
      period: 'Summer 2018',
      description: 'Assisted the development team with various tasks, including website maintenance and content updates.',
    },
    {
      id: 5,
      company: 'Future Endeavors',
      role: 'Awaiting Next Challenge',
      period: 'Future',
      description: 'Eager to apply my skills to new and exciting projects.',
    },
    {
      id: 6,
      company: 'Another Great Company',
      role: 'Senior Software Engineer',
      period: '2025-2027',
      description: 'Building amazing things with a talented team.',
    },
  ];

  // Effect to load GSAP and ScrollTrigger from CDN
  useEffect(() => {
    const gsapScript = document.createElement('script');
    gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    gsapScript.async = true;
    gsapScript.onload = () => {
      const scrollTriggerScript = document.createElement('script');
      scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
      scrollTriggerScript.async = true;
      scrollTriggerScript.onload = () => {
        if (window.gsap) {
          window.gsap.registerPlugin(ScrollTrigger);
          setIsGsapReady(true);
        }
      };
      document.body.appendChild(scrollTriggerScript);
    };
    document.body.appendChild(gsapScript);
    
    return () => {
      const scripts = document.querySelectorAll('script[src*="gsap"]');
      scripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  useLayoutEffect(() => {
    if (!isGsapReady || !slider.current || !component.current) return;
    
    let ctx = window.gsap.context(() => {
      const timelineContainer = slider.current;
      if (!timelineContainer) return;
      
      const items = window.gsap.utils.toArray(".timeline-item") as HTMLElement[];
      
      // Main horizontal scroll animation
      const horizontalTween = window.gsap.to(timelineContainer, {
        x: () => `-${timelineContainer.scrollWidth - document.documentElement.clientWidth}px`,
        ease: "none",
        scrollTrigger: {
          trigger: component.current,
          pin: true,
          scrub: 1,
          end: () => `+=${timelineContainer.scrollWidth - document.documentElement.clientWidth}`,
        }
      });

      // Animate the progress line
      window.gsap.to(".timeline-line-progress", {
        width: "100%",
        ease: 'none',
        scrollTrigger: {
          trigger: component.current,
          scrub: 1,
          start: 'top top',
          end: () => `+=${timelineContainer.scrollWidth - document.documentElement.clientWidth}`,
        }
      });

      // Animate each timeline item
      items.forEach((item: HTMLElement) => {
        window.gsap.from(item, {
          y: 100,
          opacity: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            containerAnimation: horizontalTween,
            start: 'left 85%',
            toggleActions: 'play none none reverse',
          }
        });
      });
    }, component);

    return () => ctx.revert();
  }, [isGsapReady, experienceData]);

  return (
    <div ref={component} className="relative h-[300vh] bg-white overflow-hidden">
      <div className="h-screen w-full flex items-center relative">
        {/* The main timeline container that scrolls horizontally */}
        <div ref={slider} className="flex items-center absolute left-0 px-[25vw] min-w-max">
          {/* The background line - positioned to align with nodes */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -translate-y-1/2 z-0">
            {/* The progress line that animates */}
            <div className="h-0.5 bg-black timeline-line-progress" style={{width: '0%'}}></div>
          </div>
          
          {/* Map through data to create timeline items */}
          {experienceData.map((exp, index) => (
            <div key={exp.id} className="timeline-item relative flex flex-col items-center" style={{marginRight: index === experienceData.length - 1 ? '0' : '200px'}}>
              {/* Content Box - Positioned based on index (even/odd) */}
              <div className={`w-72 text-center bg-white border border-gray-200 rounded-lg p-6 shadow-lg ${
                index % 2 === 0 
                  ? 'order-1 mb-20' 
                  : 'order-3 mt-20'
              }`}>
                <p className="text-gray-600 font-medium text-sm uppercase tracking-wide">{exp.period}</p>
                <h3 className="text-xl font-bold text-black mt-2">{exp.company}</h3>
                <h4 className="text-base text-gray-700 font-medium">{exp.role}</h4>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">{exp.description}</p>
              </div>
              
              {/* Node - This sits on the main timeline */}
              <div className="order-2 w-4 h-4 rounded-full bg-black border-4 border-white shadow-lg relative z-10">
                {/* Vertical line connecting node to content */}
                <div className={`absolute left-1/2 -translate-x-1/2 w-0.5 bg-gray-300 ${
                  index % 2 === 0 
                    ? 'bottom-full h-16 mb-2' 
                    : 'top-full h-16 mt-2'
                }`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
