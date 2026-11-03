import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import HackedText from "./HackedText";
import { SmartVideo } from "./SmartVideo";
import { SmartGlobe } from "./SmartGlobe";
import { SmartFrameworks } from "./SmartFrameworks";
import BentoTilt from "./ui/BentoTilt";

export { BentoTilt };

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: gridRef.current,
        start: "bottom top",
        end: "+=50%",
        scrub: true,
      },
    });

    tl.to(sectionRef.current, {
      backgroundColor: "#ffffff",
      ease: "none",
    });
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="pb-52 bg-black will-change-[background-color]"
    >
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32 select-none hero-heading">
          <HackedText
            tag="h2"
            hoverAnimation={true}
            className="max-w-md text-white font-bold"
            playOnLoad={false}
          >
            About Me
          </HackedText>
        </div>

        {/*Card 1*/}
        <BentoTilt className="bento-tilt_1 border-hsla relative mb-7 h-96 max-h-[30rem] w-full overflow-hidden rounded-md md:h-[65vh]">
          <div className="relative size-full">
            <SmartVideo src="/videos/feature-1.webm" className="bento-media" />
            <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white">
              <div className="select-none">
                <h3 className="bento-title">Bonjour, I&apos;m Zariel</h3>
                <p className="bento-description">
                  Over the past two years, I&apos;ve built solid frontend and
                  backend foundations to ship dynamic software and web
                  applications.
                </p>
              </div>
            </div>
          </div>
        </BentoTilt>

        {/* start grid */}
        <div
          ref={gridRef}
          className="grid h-[135vh] max-h-[95rem] mw-full grid-cols-2 grid-rows-3 gap-7 transform-gpu [transform-style:preserve-3d]"
        >
          {/*Card2*/}
          <BentoTilt className="bento-tilt_1 col-span-2 row-span-1 md:col-span-1 md:row-span-2 max-h-[70rem]">
            <div className="relative size-full" ref={card2Ref}>
              <div className="absolute top-0 bottom-0 md:top-[50%] w-full h-full left-[50%] scale-100 md:scale-[2.5] md:left-[0%] transform-gpu will-change-transform">
                <SmartFrameworks observeRef={card2Ref} />
              </div>
              <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white pointer-events-none">
                <div className="select-none">
                  <h3 className="bento-title">Tech Stack</h3>
                  <p className="bento-description">
                    I specialize in a diverse range of modern web technologies,
                    delivering scalable and efficient solutions.
                  </p>
                </div>
              </div>
            </div>
          </BentoTilt>

          {/*Card3*/}
          <BentoTilt className="bento-tilt_1 col-span-2 row-span-1 ml-32 md:col-span-1 md:ml-0 max-h-[30rem]">
            <div className="relative size-full">
              <figure className="absolute inset-y-0 right-[-30%] flex items-center justify-end md:right-[-20%] md:scale-125">
                <SmartGlobe />
              </figure>
              <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white pointer-events-none">
                <div className="select-none">
                  <h3 className="bento-title">Time Zone</h3>
                  <p className="mt-3 max-w-64 text-xs md:text-base">
                    I&apos;m based in Jupiter, and open to remote work worldwide
                  </p>
                </div>
              </div>
            </div>
          </BentoTilt>

          {/*Card4*/}
          <BentoTilt className="bento-tilt_1 col-span-2 mr-14 md:col-span-1 md:mr-0 max-h-[30rem]">
            <div className="relative size-full select-none pointer-events-none">
              <div className="absolute right-4 bottom-4 size-14 sm:size-16 md:right-5 md:bottom-5 md:h-1/2 md:w-auto md:aspect-square xl:inset-y-5 xl:top-5 xl:h-auto xl:size-auto">
                <Image
                  src="/logos/temporal.svg"
                  alt="Temporal logo"
                  className="bento-media brightness-0 invert object-contain"
                  fill
                  sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 56px"
                />
              </div>
              <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white pointer-events-none">
                <div className="select-none">
                  <h3 className="uppercase font-black text-3xl md:text-4xl xl:text-6xl">
                    CURRENTLY
                  </h3>
                  <p className="mt-3 max-w-64 text-xs md:text-base text-str">
                    Deep in Go and Temporal at the moment; durable workflows are
                    the new obsession.
                  </p>
                </div>
              </div>
            </div>
          </BentoTilt>

          {/*Card5*/}
          <BentoTilt className="bento-tilt_2 max-h-[30rem]">
            <div className="flex size-full flex-col justify-between bg-white p-5">
              <blockquote className="special-font uppercase font-black text-black text-3xl md:text-4xl lg:text-5xl">
                &quot;Know how to learn. Then, want to learn.&quot;
              </blockquote>
              <p className="self-end text-black font-semibold text-xs md:text-sm">
                - Katherine Johnson
              </p>
            </div>
          </BentoTilt>

          {/*Card6*/}
          <BentoTilt className="bento-tilt_2 max-h-[30rem]">
            <SmartVideo
              src="/videos/feature-4.webm"
              className="bento-media border-hsla"
            />
          </BentoTilt>
        </div>
        <div className="h-[150vh]" aria-hidden="true" />
      </div>
    </section>
  );
};

export default About;
