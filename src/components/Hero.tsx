import { useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Button from "./Button";
import HackedText from "./HackedText";
import FlipWord from "./FlipWord";
import { SmartVideo } from "./SmartVideo";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoSrc = "/videos/vlhlll.webm";
  const words = ["Secure", "Modern", "Scalable"];

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          duration: 1,
          ease: "power2.inOut",
        },
      });

      // Initial video frame fade-in
      tl.fromTo("#video-frame", { opacity: 0 }, { opacity: 1, duration: 1.5 });

      // Content animation with combined fade in/out
      gsap.fromTo(
        "#content",
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "power1.out",
          duration: 1,
          scrollTrigger: {
            trigger: "#content",
            start: "top 80%",
            end: "bottom center",
            scrub: false,
            toggleActions: "play none none reverse",
            onUpdate: (self) => {
              if (self.progress > 0.7) {
                const fadeProgress = (self.progress - 0.7) / 0.3;
                gsap.set("#content", { opacity: 1 - fadeProgress });
              }
            },
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      id="home"
      aria-label="Hero Introduction"
      ref={containerRef}
      className="relative h-dvh w-screen overflow-x-hidden bg-black"
    >
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-black will-change-transform transform-gpu"
      >
        <SmartVideo
          src={videoSrc}
          className="absolute left-0 top-0 size-full object-cover object-center"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
        />
        <div
          id="content"
          className="absolute top-0 left-0 h-full w-full sm:w-[80vw] md:w-[70vw] lg:w-[48vw] xl:w-[42vw] 2xl:w-[40vw] bg-black/40 backdrop-blur-md flex flex-col justify-center pl-8 sm:pl-16 pr-8 sm:pr-12 lg:pr-14 z-20"
          style={{ willChange: "transform, opacity" }}
        >
          <HackedText
            tag="h1"
            className="text-left font-bold text-white drop-shadow-lg select-none text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl"
          >
            Hi, I&apos;m Zariel
          </HackedText>
          <HackedText
            tag="p"
            className="block mb-4 select-none text-white text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl"
          >
            A Full stack Software Engineer
          </HackedText>
          <HackedText
            tag="p"
            className="block select-none text-white text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl"
          >
            I&apos;m Dedicated To Building
          </HackedText>
          <FlipWord
            words={words}
            duration={2500}
            className="font-bold text-white flip-word select-none text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl"
          />
          <HackedText
            tag="p"
            className="block mb-4 select-none text-white text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl"
          >
            Web Applications
          </HackedText>
          <Button
            id="contact-button"
            title="contact"
            leftIcon={<TiLocationArrow />}
            scrollTarget="contact"
            containerClass="bg-white/10 hover:bg-white/20 text-white flex-center gap-1"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
