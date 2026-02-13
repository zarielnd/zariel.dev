import React, { useRef } from "react";
import HackedText, { HackedTextHandle } from "./HackedText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const hackedRef = useRef<HackedTextHandle>(null);

  useGSAP(() => {
    const triggerElement = document.querySelector("#footer-hacked-container");

    if (triggerElement) {
      // Animate the container (optional fade-in, etc.)
      gsap.fromTo(
        triggerElement,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: triggerElement,
            start: "top 85%",
            end: "top 50%",
            scrub: true,
          },
        },
      );

      // Trigger the "mouseover" to play the animation in HackedText
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 80%",
        onEnter: () => {
          hackedRef.current?.play();
        },
      });
    }
  }, []);
  return (
    // This is a normal component with a solid background to hide what's behind it.
    <div ref={footerRef} className="regular-footer bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div
          id="footer-hacked-container"
          className="grid grid-cols-1 md:grid-cols-4 gap-12"
        >
          {/* Column 1 - System Info */}
          <div className="space-y-4">
            <HackedText
              ref={hackedRef}
              id="footer-hacked-text"
              className="!text-gray-400 text-xs select-none font-mono space-y-2"
              playOnLoad={true}
              hoverAnimation={true}
            >
              {`// INITIALIZING 
NEW FILES IN DATABASE
KAI_S-2015.JPG
AUDIO_LIV_201816.WAV
ACTIVATE CONSOLE FOR ACCESS...`}
            </HackedText>
          </div>
          {/* Column 2 - Navigation */}
          <div className="space-y-4">
            <div className="text-white text-sm font-mono mb-6">
              ■ DISCOVER MORE
            </div>
            <div className="space-y-3">
              <a
                href="#home"
                className="block text-white hover:text-gray-300 transition-colors font-medium"
              >
                HOME
              </a>
              <a
                href="#about"
                className="block text-white hover:text-gray-300 transition-colors font-medium"
              >
                ABOUT
              </a>
              <a
                href="#work"
                className="block text-white hover:text-gray-300 transition-colors font-medium"
              >
                WORK
              </a>
              <a
                href="#contact"
                className="block text-white hover:text-gray-300 transition-colors font-medium"
              >
                CONTACT ↗
              </a>
            </div>
          </div>
          {/* Column 3 - Social */}
          <div className="space-y-4">
            <div className="text-white text-sm font-mono mb-6">
              ■ SOCIAL MEDIAS
            </div>
            <div className="space-y-3">
              <a
                href="https://www.linkedin.com/in/zarielnd/"
                target="_blank"
                className="block text-white hover:text-gray-300 transition-colors font-medium"
              >
                LINKEDIN
              </a>
              <a
                href="https://github.com/zarielnd"
                target="_blank"
                className="block text-white hover:text-gray-300 transition-colors font-medium"
              >
                GITHUB
              </a>
            </div>
          </div>
          {/* Column 4 - Contact */}
          <div className="space-y-4">
            <div className="text-white text-sm font-mono mb-6">
              ■ MORE DETAILS
            </div>
            <div className="space-y-4">
              <div className="text-gray-400 text-sm">CONTACT ME AT</div>
              <div className="text-white font-medium">ZARIEL.ND@GMAIL.COM</div>
            </div>
          </div>
        </div>
        {/* Bottom separator line */}
        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>© 2025 ZARIEL. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
