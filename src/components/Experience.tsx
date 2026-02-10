import React, { useLayoutEffect, useRef, useMemo } from "react";
import HackedText from "./HackedText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ExperienceTimeline() {
  const component = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  // --- Experience Data - Memoized to prevent unnecessary re-renders ---
  const experienceData = useMemo(
    () => [
      {
        id: 1,
        company: "Thang Long Instrument.",
        role: "Software Engineer Intern",
        period: "Jan 2024 - Jun 2024",
        description:
          "Leading development of a Storage Management System using Spring Boot.",
      },
      {
        id: 2,
        company: "Lab SAP FPT University",
        role: "Software Engineer",
        period: "Jan 2025 - Jun 2025",
        description:
          "Design and develop Scientific Project Management System for university's SMIA office",
      },
      {
        id: 3,
        company: "Skydev",
        role: "Software Engineer",
        period: "Feb 2026 - Current",
        description: "Building scalable APIs",
      },
    ],
    [],
  );

  useLayoutEffect(() => {
    if (!slider.current || !component.current) return;

    const ctx = gsap.context(() => {
      const timelineContainer = slider.current;
      if (!timelineContainer) return;

      const items = gsap.utils.toArray(".timeline-item") as HTMLElement[];

      // Force a minimum width for the timeline to ensure proper scrolling
      const minWidth = window.innerWidth * 2; // At least 2x viewport width
      const actualWidth = timelineContainer.scrollWidth;
      const scrollDistance = Math.max(
        actualWidth - window.innerWidth,
        minWidth,
      );

      // Main horizontal scroll animation
      const horizontalTween = gsap.to(timelineContainer, {
        x: () => `-${scrollDistance}px`,
        ease: "none",
        scrollTrigger: {
          trigger: component.current,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollDistance}`,
          anticipatePin: 1,
        },
      });

      // Simple progress line animation
      gsap.to(".timeline-line-progress", {
        scaleX: 1,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: {
          trigger: component.current,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollDistance}`,
        },
      });

      // Animate each timeline item
      items.forEach((item: HTMLElement) => {
        gsap.from(item, {
          y: 100,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            containerAnimation: horizontalTween,
            start: "left 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Title and text animations
      const titleElement = document.querySelector("#hacked-title-container");
      const aboutTextElement = document.querySelector("#exp-text");

      if (titleElement) {
        gsap.set(titleElement, { opacity: 0, y: -30 });
        gsap.to(titleElement, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: titleElement,
            start: "top 90%",
            end: "top 50%",
            scrub: 1,
          },
        });

        ScrollTrigger.create({
          trigger: titleElement,
          start: "top 85%",
          onEnter: () => {
            setTimeout(() => {
              const hackedTextElement = document.querySelector(
                "#hacked-text-My-Professional-Journey",
              );
              if (hackedTextElement) {
                hackedTextElement.dispatchEvent(
                  new Event("mouseover", { bubbles: true }),
                );
              }
            }, 300);
          },
        });
      }

      if (aboutTextElement) {
        gsap.set(aboutTextElement, { opacity: 0, y: 30 });
        gsap.to(aboutTextElement, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: aboutTextElement,
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        });
      }
    }, component);

    return () => ctx.revert();
  }, [experienceData]);

  return (
    <div id="work" className="bg-gray-50">
      <div className="relative bg-white flex items-center justify-center mt-[80vh]">
        <div className="text-center">
          <div id="hacked-title-container">
            <HackedText
              className="hero-heading font-bold !text-black drop-shadow-lg select-none"
              playOnLoad={false}
            >
              My Professional Journey
            </HackedText>
          </div>
          <p id="exp-text" className="text-xl text-gray-600">
            Scroll down to explore my professional experience
          </p>
        </div>
      </div>

      <div
        ref={component}
        className="relative h-[150vh] bg-white overflow-hidden"
      >
        <div className="h-screen w-full flex items-center relative">
          {/* Fixed progress line that doesn't move with container */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -translate-y-1/2 z-0">
            <div
              className="h-0.5 bg-black timeline-line-progress w-full"
              style={{ transform: "scaleX(0)" }}
            ></div>
          </div>

          <div
            ref={slider}
            className="flex items-center absolute left-0 px-[25vw] min-w-max"
          >
            {experienceData.map((exp, index) => (
              <div
                key={exp.id}
                className="timeline-item relative flex flex-col items-center"
                style={{
                  marginRight:
                    index === experienceData.length - 1 ? "0" : "60vw",
                }}
              >
                <div
                  className={`w-72 text-center bg-white border border-gray-200 rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                    index % 2 === 0 ? "order-1 mb-20" : "order-3 mt-20"
                  }`}
                >
                  <p className="text-gray-600 font-medium text-sm uppercase tracking-wide">
                    {exp.period}
                  </p>
                  <h3 className="text-xl font-bold text-black mt-2">
                    {exp.company}
                  </h3>
                  <h4 className="text-base text-gray-700 font-medium">
                    {exp.role}
                  </h4>
                  <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                <div className="order-2 w-4 h-4 rounded-full bg-black border-4 border-white shadow-lg relative z-10 transition-all duration-300 hover:scale-125">
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 w-0.5 bg-gray-300 ${
                      index % 2 === 0
                        ? "bottom-full h-16 mb-2"
                        : "top-full h-16 mt-2"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
