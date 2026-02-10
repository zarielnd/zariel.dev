import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import HackedText from "./HackedText";
import FlipWord from "./FlipWord";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const videoSrc = `videos/vlhlll.mp4`;
  const words = ["Secure", "Modern", "Scalable"];

  useGSAP(() => {
    // Set up all animations in a single context
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
            // Smooth fade-out as user scrolls past center
            if (self.progress > 0.7) {
              const fadeProgress = (self.progress - 0.7) / 0.3;
              gsap.set("#content", { opacity: 1 - fadeProgress });
            }
          },
        },
      },
    );

    // Optimized video scaling animation
    // gsap.to("#video-frame", {
    //   scale: 8,
    //   borderRadius: 0,
    //   transformOrigin: "75% 25%",
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: "#video-frame",
    //     start: "center center",
    //     end: "+=600 center",
    //     scrub: 0.5, // Reduced scrub value for smoother animation
    //     pin: true,
    //     pinSpacing: false,
    //     anticipatePin: 1, // Helps with pin performance
    //     invalidateOnRefresh: true, // Ensures proper recalculation on resize
    //   },
    // });

    // Cleanup function for ScrollTrigger
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      id="home"
      className="relative h-dvh w-screen overflow-x-hidden bg-black"
    >
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-black will-change-transform transform-gpu"
      >
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-0 top-0 size-full object-cover object-center"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
        />
        <div
          id="content"
          className="absolute top-0 left-0 h-full sm:w-[80vw] md:w-[70vw] lg:w-[40vw] bg-black/40 backdrop-blur-md flex flex-col justify-center pl-16 z-20"
          style={{ willChange: "transform, opacity" }}
        >
          <HackedText className="text-left font-bold text-white drop-shadow-lg select-none hero-heading">
            Hi, I&apos;m Zariel
          </HackedText>
          <HackedText className="block mb-4 hero-span select-none">
            A Full stack Software Engineer
          </HackedText>
          <HackedText className="block hero-span select-none">
            I&apos;m Dedicated To Building
          </HackedText>
          <FlipWord
            words={words}
            duration={2500}
            className="text-4xl font-bold text-white flip-word select-none"
          ></FlipWord>
          <HackedText className="block mb-4 hero-span select-none">
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
    </div>
  );
};

export default Hero;
