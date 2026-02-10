import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HackedText from "./HackedText";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const titleElement = document.querySelector("#hacked-title-container");

    if (titleElement) {
      gsap.fromTo(
        titleElement,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleElement,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
        },
      );

      ScrollTrigger.create({
        trigger: titleElement,
        start: "top 80%",
        end: "top 40%",
        onEnter: () => {
          const hackedTextElement = document.querySelector(
            "#hacked-text-About-Me",
          );
          if (hackedTextElement) {
            hackedTextElement.dispatchEvent(
              new Event("mouseover", { bubbles: true }),
            );
          }
        },
      });
    }

    // Separate animation for the about text
    const aboutTextElement = document.querySelector("#about-text");
    if (aboutTextElement) {
      gsap.fromTo(
        aboutTextElement,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: aboutTextElement,
            start: "top 85%",
            end: "top 45%",
            scrub: true,
          },
        },
      );
    }
  }, []);

  return (
    <div
      id="about"
      className="relative h-dvh w-screen overflow-x-hidden bg-black flex flex-col justify-center items-center"
    >
      <div id="hacked-title-container" className="mb-8">
        <HackedText
          className="text-center text-white drop-shadow-lg select-none hero-heading"
          playOnLoad={false}
        >
          About Me
        </HackedText>
      </div>
      <p id="about-text" className="max-w-2xl text-center text-lg text-white">
        I am a Full Stack Software Engineer with a passion for building scalable
        web applications and creating seamless user experiences. I have
        experience in various technologies and frameworks, and I love to learn
        new things.
      </p>
    </div>
  );
};

export default About;
