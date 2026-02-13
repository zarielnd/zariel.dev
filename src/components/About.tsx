import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HackedText from "./HackedText";
import Image from "next/image";
import { SmartVideo } from "./SmartVideo";
// import BentoCard from "./BentoCard";
import { useRef, useState } from "react";
import { SmartGlobe } from "./SmartGlobe";
import { Frameworks } from "./Frameworks";

gsap.registerPlugin(ScrollTrigger);

interface BentoTiltProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoTilt: React.FC<BentoTiltProps> = ({
  children,
  className = "",
}) => {
  const [transformStyle] = useState<string>("");
  const itemRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    itemRef.current.style.transform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95,.95,.95)`;
  };

  const handleMouseLeave = () => {
    const el = itemRef.current;
    if (!el) return;

    // Smooth reset
    el.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

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
      className="pb-52 bg-black will-change[background-color];"
    >
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32 select-none hero-heading">
          <HackedText
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
            <SmartVideo
              src="videos/feature-1.mp4"
              className="bento-media"
            ></SmartVideo>
            <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white">
              <div className="select-none">
                <h1 className="bento-title ">Bonjour, I&apos;m Zariel</h1>
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
            <div className="relative size-full">
              <div className=" absolute top-0 bottom-0 md:top-[50%] w-full h-full left-[50%] scale-100 md:scale-[2.5] md:left-[0%] transform-gpu will-change-transform ">
                <Frameworks />
              </div>
              <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white pointer-events-none">
                <div className="select-none">
                  <h1 className="bento-title ">Tech stack</h1>
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
                <SmartGlobe></SmartGlobe>
              </figure>
              <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white pointer-events-none">
                <div className="select-none">
                  <h1 className="bento-title ">Time Zone</h1>
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
              <Image
                src={"/imgs/feature-2.jpg"}
                alt={"Feature 2"}
                className="bento-media"
                fill
                priority
              ></Image>
              <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white pointer-events-none">
                <div className="select-none">
                  <h1 className="bento-title ">lorem ipsum</h1>
                  <p className="mt-3 max-w-64 text-xs md:text-base text-str">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris sed porttitor magna. Mauris vitae leo dui. Proin vel
                    nulla at nisl feugiat interdum
                  </p>
                </div>
              </div>
            </div>
          </BentoTilt>

          {/*Card5*/}
          <BentoTilt className="bento-tilt_2 max-h-[30rem]">
            <div className="flex size-full flex-col justify-between bg-white p-5">
              <h1 className="bento-title special-font text-black">
                &quot;Know how to learn. Then, want to learn.&quot;
              </h1>
              <p className="m-5 self-end text-black">- Katherine Johnson</p>
            </div>
          </BentoTilt>

          {/*Card6*/}
          <BentoTilt className="bento-tilt_2 max-h-[30rem]">
            <SmartVideo
              src="videos/feature-4.mp4"
              className="bento-media border-hsla"
            ></SmartVideo>
          </BentoTilt>
        </div>
        <div className="h-[150vh]" aria-hidden="true"></div>
      </div>
    </section>
  );
};

export default About;
