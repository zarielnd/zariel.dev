import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import HackedText, { HackedTextHandle } from "./HackedText";
import { personalInfo, socialLinks } from "@/data/personal";
import { navItems } from "@/data/navigation";

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const hackedRef = useRef<HackedTextHandle>(null);

  useGSAP(
    () => {
      const triggerElement = document.querySelector("#footer-hacked-container");

      if (triggerElement) {
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

        ScrollTrigger.create({
          trigger: triggerElement,
          start: "top 80%",
          onEnter: () => {
            hackedRef.current?.play();
          },
        });
      }
    },
    { scope: footerRef },
  );

  return (
    <footer ref={footerRef} className="regular-footer bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div
          id="footer-hacked-container"
          className="grid grid-cols-1 md:grid-cols-4 gap-y-12 gap-x-6 lg:gap-12"
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
              {personalInfo.footerSystemNotice}
            </HackedText>
          </div>

          {/* Column 2 - Navigation */}
          <div className="space-y-4">
            <div className="text-white text-sm font-mono mb-6">
              ■ DISCOVER MORE
            </div>
            <nav className="space-y-3 flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white hover:text-gray-300 transition-colors font-medium"
                >
                  {item.label.toUpperCase()}
                  {item.href === "#contact" ? " ↗" : ""}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3 - Social */}
          <div className="space-y-4">
            <div className="text-white text-sm font-mono mb-6">
              ■ SOCIAL MEDIAS
            </div>
            <div className="space-y-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white hover:text-gray-300 transition-colors font-medium"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 4 - Contact */}
          <div className="space-y-4">
            <div className="text-white text-sm font-mono mb-6">
              ■ MORE DETAILS
            </div>
            <div className="space-y-4">
              <div className="text-gray-400 text-sm">CONTACT ME AT</div>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-white text-sm lg:text-base font-medium hover:underline block truncate"
                title={personalInfo.email.toUpperCase()}
              >
                {personalInfo.email.toUpperCase()}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom separator line */}
        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>{personalInfo.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
